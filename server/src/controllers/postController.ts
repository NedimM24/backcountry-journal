import type { Request, Response } from 'express';
import { getAllPosts, 
         getAllPublishedPosts,
         getAllNonPublishedPosts,
         getPostById,
         createPostQuery,
         updatePostQuery,
         deletePostQuery,
         getFeaturedPostById,
         getPublishedPostByCategoryQuery,
         getPostCountQuery,
         getDraftsCountQuery,
         getRecentPostsQuery
         } from '../queries/postQueries';
import { log } from 'console';


//CREATE
export async function createPost(req: Request, res: Response){
    let title = req.body.title;
    let bodyText = req.body.bodyText;
    let coverImage = req.body.coverImage;
    let category = req.body.category;
    let isPublished = req.body.isPublished;
    let authorId = res.locals.userId;
    const post = await createPostQuery(
        title, 
        bodyText, 
        coverImage, 
        category, 
        isPublished, 
        authorId);
    res.json(post)
}

//READ
//Function that will return an array of ALL posts
export async function getPosts(req: Request, res: Response){
    const posts = await getAllPosts();
    res.json(posts);
}

//Function that will return an array of all PUBLISHED posts
export async function getPublishedPosts(req: Request, res: Response){
    const publishedPosts = await getAllPublishedPosts();
    res.json(publishedPosts);
}

//Function that will return an array of all NON PUBLISHED posts
export async function getNonPublishedPosts(req: Request, res: Response){
    const nonPublishedPosts = await getAllNonPublishedPosts();
    res.json(nonPublishedPosts);
}

//Function that will return a post based on id
export async function getPost(req: Request, res: Response){
    const id = Number(req.params.id);
    const post = await getPostById(id);
    res.json(post);
}

//Function that will return all published posts based on the category
export async function getPublishedPostsByCategory(req: Request, res: Response){
    try {
        const category = req.params.category;

        if(typeof category !== "string"){
            return res.status(400).json({
                message: "Not a valid category."
            })
        }

        const posts = await getPublishedPostByCategoryQuery(category)
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve posts by category"
        })
    }
}

//Function that will return the featured welcome post. Had an id of 5
export async function getFeaturedPost(req: Request, res: Response){
    try {
         const post = await getFeaturedPostById(5);
        if(!post){
            res.status(404).json({ message: "Featured post not found" });
            return;
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve featured post" });
    }
}

//Function that will return the post count. Used in  admin front
export async function getPostCount(req: Request, res: Response){
    try {
        const postCount = await getPostCountQuery();
        res.status(200).json({
            totalPosts: postCount,
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve post count" });
    }
}

//Function that will return the drafts count. Used in  admin front
export async function getDraftsCount(req: Request, res: Response){
    try {
        const draftCount = await getDraftsCountQuery();
        res.status(200).json({
            totalDrafts: draftCount,
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve draft count" });
    }
}

//Function that will return 6 most recent posts. Used in  admin front
export async function getRecentPosts(req: Request, res: Response){
    try {
        const recentPosts = await getRecentPostsQuery();
        res.json(recentPosts);
    } catch (error) {
        console.error("Failed to retrieve posts:", error)
        res.status(500).json({ message: "Failed to retrieve recent posts" });
    }
}

//UPDATE
export async function updatePost(req: Request, res: Response){
    let title = req.body.title;
    let bodyText = req.body.bodyText;
    let coverImage = req.body.coverImage;
    let category = req.body.category;
    let isPublished = req.body.isPublished;
    let postId = Number(req.params.id)
    const post = await updatePostQuery(
        postId,
        title, 
        bodyText, 
        coverImage, 
        category, 
        isPublished, 
        );
    res.json(post)
}

//DELETE
export async function deletePost(req: Request, res: Response){
    console.log("REACHED DELETE CONTROLLER");
    const id = Number(req.params.id)
    await deletePostQuery(id);
    res.sendStatus(204)
}