/// <reference types="vite/client" />

interface Window {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
  clarity?: (...args: unknown[]) => void;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GOOGLE_ADS_LEAD_SEND_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
