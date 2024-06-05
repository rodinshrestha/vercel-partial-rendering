import Register from "@/auth/components/Register";

export async function generateMetadata() {
  return {
    title: "Register",
    description: "Jackson Register Page",
  };
}

const RegisterPage = async () => {
  return <Register />;
};
export default RegisterPage;
