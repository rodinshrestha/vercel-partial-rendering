export {};
declare global {
  interface Window {
    _wq: any;
    UnifaunCheckout: any;
    dataLayer: Array<{
      event?: string;
      ecommerce: { [key: string]: any } | null;
    }>;
    lipscore: {
      initWidgets(): void;
    };
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_GOGGLE_GA4: string;
      NEXT_PUBLIC_DOMAIN_URL: 'https://dogmancare.se';
      NEXT_PUBLIC_IMAGES_REMOTE_PATTERNS: Array<string>;
      NEXT_PUBLIC_FEEDBUCKET: string;
      NEXT_PUBLIC_GOOGLE_MAPS_KEY: string;
      NEXT_PUBLIC_MAPBOXGL_GL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_GOGGLE_GA4: string;
      NEXT_PUBLIC_APP_MODE: 'dev' | 'uat' | 'production';
    }
  }
}
