import { AuthForm } from "../../components/Auth/AuthForm";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <div className={styles.authForm}>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}

export default Login;
