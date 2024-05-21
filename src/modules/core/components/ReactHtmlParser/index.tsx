import React from 'react';

import DefaultReactHtmlParser, {
  Transform,
  convertNodeToElement,
} from 'react-html-parser';

import { H1, H2, H3, H4, H5, H6, Paragraph, Span } from './style';

type ElementProps = {
  as: string;
  variant: string;
  children: React.ReactNode;
  style: { [key: string]: string };
};
const resolver: Transform = (node, index) => {
  if (node.type === 'tag') {
    const { attribs } = node;
    const elementProps: { [key: string]: any } = { key: index };

    if (
      node.name &&
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].includes(
        node.name
      )
    ) {
      if (attribs && attribs.style) {
        // Parse inline styles
        const inlineStyles = parseInlineStyles(attribs.style);

        if (Object.keys(inlineStyles).length > 0) {
          // Merge inline styles with existing props
          elementProps.style = { ...elementProps.style, ...inlineStyles };
        }
      }

      //todo parser typography check it
      return (
        <RenderElement
          as={node.name}
          variant={node.name}
          key={index}
          style={elementProps.style}
        >
          {node.children &&
            node.children.map((item, subIndex: number) => {
              return convertNodeToElement(item, subIndex, resolver);
            })}
        </RenderElement>
      );
    }
  } else if (node.type === 'text') return node.data;
};

const ReactHtmlParser = (content: string) =>
  DefaultReactHtmlParser(content, {
    transform: resolver,
  });

export default ReactHtmlParser;

const RenderElement = ({ as, variant, children, style }: ElementProps) => {
  let Element;
  if (as === 'h1') Element = H1;
  else if (as === 'h2') Element = H2;
  else if (as === 'h3') Element = H3;
  else if (as === 'h4') Element = H4;
  else if (as === 'h5') Element = H5;
  else if (as === 'h6') Element = H6;
  else if (as === 'span') Element = Span;
  else Element = Paragraph;

  if (!children) return null;

  return (
    <Element className={variant} style={style}>
      {children}
    </Element>
  );
};

const parseInlineStyles = (styleString: string): { [key: string]: string } => {
  if (styleString) {
    //Note: filter(Boolean) will remove falsy values like "", true, false , undefined etc..
    const stylePairs = styleString.split(';').filter(Boolean);

    const styles = stylePairs.reduce((acc, pair) => {
      const [key, value] = pair.split(':').map((s) => s.trim());
      if (key && value) {
        const data = {
          [key]: `${value};`,
        };
        return { ...acc, ...data };
      }
      return acc;
    }, {});

    return styles;
  }
  return {};
};
