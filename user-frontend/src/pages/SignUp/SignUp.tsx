import { AuthForm } from "../../components/Auth/AuthForm";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";
function SignUp() {
  return (
    <div>
      <AuthHeader />
      <AuthForm mode="signup" />
    </div>
  );
}

export default SignUp;
