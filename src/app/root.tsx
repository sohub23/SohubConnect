import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useAsyncError,
  useLocation,
  useRouteError,
} from 'react-router';

import { useButton } from '@react-aria/button';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FC,
  Component,
} from 'react';
import globalStylesHref from './global.css?url';

import { toPng } from 'html-to-image';
import fetch from '@/__create/fetch';
// @ts-ignore
import { useNavigate } from 'react-router';
import { serializeError } from 'serialize-error';
import { Toaster } from 'sonner';
// @ts-ignore
import { LoadFonts } from 'virtual:load-fonts.jsx';
import { HotReloadIndicator } from '../__create/HotReload';
import { useSandboxStore } from '../__create/hmr-sandbox-store';
import type { Route } from './+types/root';
import { useDevServerHeartbeat } from '../__create/useDevServerHeartbeat';
import { SeoMeta } from '../components/sohub/SeoMeta';

export const links = () => [
  { rel: 'stylesheet', href: globalStylesHref },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' },
  { rel: 'icon', href: '/images/fav_icon_update.png' },
];

export const meta = () => {
  return [
    { title: "SOHUB Connect - Borderless PBX for Bangladesh" },
    { name: "description", content: "Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." },
    { property: "og:title", content: "SOHUB Connect - Borderless PBX for Bangladesh" },
    { property: "og:description", content: "Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." },
    { property: "og:image", content: "https://connect.sohub.com.bd/images/connect_new_img.png" },
    { property: "og:url", content: "https://connect.sohub.com.bd" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "SOHUB Connect" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "SOHUB Connect - Borderless PBX for Bangladesh" },
    { name: "twitter:description", content: "Modern PBX without phone numbers. Click-to-call buttons and QR-based calling for Bangladeshi businesses. Free forever plan." },
    { name: "twitter:image", content: "https://connect.sohub.com.bd/images/connect_new_img.png" },
    { link: { rel: "canonical", href: "https://connect.sohub.com.bd/" } },
  ];
};

// Rest of the file remains the same - copy from original
export default function App() {
  const location = useLocation();
  const [connected, setConnected] = useState(() => !!import.meta.hot);

  useEffect(() => {
    if (!import.meta.hot) return;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onFullReload = () => setConnected(false);

    import.meta.hot.on('vite:ws:disconnect', onDisconnect);
    import.meta.hot.on('vite:ws:connect', onConnect);
    import.meta.hot.on('vite:beforeFullReload', onFullReload);

    return () => {
      import.meta.hot?.off('vite:ws:disconnect', onDisconnect);
      import.meta.hot?.off('vite:ws:connect', onConnect);
      import.meta.hot?.off('vite:beforeFullReload', onFullReload);
    };
  }, []);

  useEffect(() => {
    // Always load fonts, not just in HMR mode
    LoadFonts();
    
    if (!import.meta.hot) return;

    const onFontLinksUpdate = () => {
      const existing = document.querySelectorAll('link[rel="stylesheet"][data-fonts]');
      existing.forEach((link) => link.remove());
      LoadFonts();
    };

    import.meta.hot.on('update-font-links', onFontLinksUpdate);

    return () => {
      import.meta.hot?.off('update-font-links', onFontLinksUpdate);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <SeoMeta 
          url={`https://connect.sohub.com.bd${location.pathname}`}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Toaster />
        <HotReloadIndicator connected={connected} />
      </body>
    </html>
  );
}
