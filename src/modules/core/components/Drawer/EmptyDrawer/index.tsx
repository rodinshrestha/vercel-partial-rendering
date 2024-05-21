import { useRouter } from "next/navigation";

import useTranslations from "@/core/hooks/useTranslations";
import useCart from "@/cart/hooks/useCart";

import { StyledDiv } from "./style";

interface EmptyProps {
  title?: string;
  description?: string;
}

const EmptyDrawer = ({ title, description }: EmptyProps) => {
  const { _t } = useTranslations();
  const router = useRouter();
  const { setIsCartDrawerOpen } = useCart();

  return (
    <StyledDiv>
      <div className="title">
        <h6>{title}</h6>
      </div>
      {description && (
        <div className="description">
          <p>
            <span
              className="link-btn"
              onClick={() => {
                setIsCartDrawerOpen(false);
                router.push("/");
              }}
            >
              {_t("click_here", "Click Here")}
            </span>{" "}
            {description}
          </p>
        </div>
      )}
    </StyledDiv>
  );
};

export default EmptyDrawer;
