'use client';
import { FooterMetaTypes, NavigationType } from '@/core/types/navigation-type';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import useResolver from '@/core/hooks/useResolver';
import useTranslations from '@/core/hooks/useTranslations';

import Link from '../Link';

import { SocialMedia, StyleFooter, StyleWrapper } from './style';
import FooterMenu from './FooterMenu';

type Props = {
  data?: NavigationType | null;
  footerMeta: FooterMetaTypes;
};

const Footer = ({ data, footerMeta }: Props) => {
  const { _t } = useTranslations();
  const { items = [] } = data?.footer_menu || {};
  const resolver = useResolver();
  const { social_media } = resolver;

  return (
    <StyleFooter className="pt-75">
      <Container>
        <Row>
          <Col md={3}>
            <div className="footer-img">
              <Link href="/">
                <ImageWithFallback
                  src={footerMeta?.footer_logo || '/images/light-jacson.svg'}
                  width={201.79}
                  height={31.08}
                  alt="footer-logo"
                />
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="align-items-start">
          <Col lg={9}>
            {items.length ? (
              <Row>
                {items.map((el, index) => {
                  return <FooterMenu data={el} key={index} />;
                })}
              </Row>
            ) : null}
          </Col>
          <Col lg={3}>
            <SocialMedia>
              <div className="media-title">
                <h6>
                  {_t('follow_us_on_social_media', 'Follow us on social media')}
                </h6>
              </div>
              <div className="media-icons">
                {!!social_media &&
                  Object.entries(social_media).map(
                    ([_, value], i) =>
                      !!value?.url &&
                      !!value?.icon && (
                        <Link href={value.url} newTab key={i} asSelfLink>
                          <ImageWithFallback
                            src={value?.icon}
                            className="object-contain"
                            alt="Card Image"
                            priority
                            quality={100}
                            width={30}
                            height={30}
                          />
                        </Link>
                      )
                  )}
              </div>
            </SocialMedia>
          </Col>
        </Row>

        {footerMeta?.copyright_text && (
          <Row>
            <Col>
              <StyleWrapper>
                {ReactHtmlParser(footerMeta.copyright_text)}
              </StyleWrapper>
            </Col>
          </Row>
        )}
      </Container>
    </StyleFooter>
  );
};

export default Footer;
