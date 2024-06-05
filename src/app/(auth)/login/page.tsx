import Login from "@/auth/components/Login";

export async function generateMetadata() {
  return {
    title: "Login",
    description: "jackson Login Page",
  };
}

const LoginPage = async () => {
  return <Login />;
};
export default LoginPage;
