import { AuthForm } from "../../components/Auth/AuthForm";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";
import styles from "./SignUp.module.css";
function SignUp() {
  return (
    <div className={styles.container}>
      <AuthHeader />
      <div className={styles.authForm}>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}

export default SignUp;
