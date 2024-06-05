import ForgotPassword from "@/auth/components/ForgetPassword";

export async function generateMetadata() {
  return {
    title: "Forgot Password",
    description: "jackson Password Forget Page",
  };
}

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
