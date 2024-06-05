import ResetPassword from '@/auth/components/ResetPassword';

export async function generateMetadata() {
  return {
    title: 'Reset Password',
  };
}

type ParamsType = {
  channel: string;
  store: string;
  token: string;
};

const ResetPage = ({ params }: { params: ParamsType }) => {
  const { token } = params;
  return <ResetPassword token={token} />;
};

export default ResetPage;
