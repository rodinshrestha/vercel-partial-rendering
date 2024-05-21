"use client";
import { NavigationItem } from "@/core/types/navigation-type";
import { Col } from "@/core/components/Grid/Col";
import FooterMenuList from "@/core/components/Footer/FooterMenu/FooterMenuList";

import NavigationLinkChecker from "../../NavigationLinkChecker";

import { StyleDiv } from "./style";

type Props = {
  data: NavigationItem;
};

const FooterMenu = ({ data }: Props) => {
  const { children = [] } = data;

  return (
    <Col md={4}>
      <StyleDiv>
        <NavigationLinkChecker data={data}>
          <h6>{data.title}</h6>
        </NavigationLinkChecker>
        <ul>
          {children.map((el, i: number) => (
            <FooterMenuList item={el} key={i} />
          ))}
        </ul>
      </StyleDiv>
    </Col>
  );
};

export default FooterMenu;
