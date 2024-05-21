type Posiibilities = 'dev' | 'uat' | 'production';

type ResolverFactorytype = {
  [key in Posiibilities]: Record<
    string,
    { channel: string; store: string; gtm?: string; hotjar?: string }
  >;
};

/**
 * it contains all mappers of environtment
 */
export const b2cResolverFactory: ResolverFactorytype = {
  dev: {
    'dev-storefront-jacson-se.hdlcommerce.cloud': {
      channel: 'se',
      store: 'sv',
    },
    'dev-storefront-jacson-eu.hdlcommerce.cloud': {
      channel: 'eu',
      store: 'en',
    },
  },
  uat: {
    'uat-storefront-jacson-se.hdlcommerce.cloud': {
      channel: 'se',
      store: 'sv',
    },
    'uat-storefront-jacson-eu.hdlcommerce.cloud': {
      channel: 'eu',
      store: 'en',
    },
  },
  production: {
    'jacson.se': {
      channel: 'se',
      store: 'sv',
      gtm: '',
      hotjar: ``,
    },
    'jacson.com': {
      channel: 'eu',
      store: 'en',
      gtm: '',
      hotjar: ``,
    },
  },
};
