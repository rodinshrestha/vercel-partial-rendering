import { Suspense } from "react";

import Account from "@/account/index";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Account>
      <Suspense fallback={<p>test</p>}>{children}</Suspense>
    </Account>
  );
};
export default AccountLayout;
