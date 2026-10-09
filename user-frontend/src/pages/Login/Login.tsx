import { AuthForm } from "../../components/Auth/AuthForm";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";

function Login() {
  return (
    <div>
      <AuthHeader />
      <AuthForm mode="login" />
    </div>
  );
}

export default Login;
