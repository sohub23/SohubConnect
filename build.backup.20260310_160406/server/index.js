import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withErrorBoundaryProps, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useButton } from "@react-aria/button";
import * as React from "react";
import { useEffect, useState, Component, useCallback, useRef, createContext, useContext } from "react";
import { toPng } from "html-to-image";
import { serializeError } from "serialize-error";
import { toast, Toaster } from "sonner";
import { create } from "zustand";
import { useIdleTimer } from "react-idle-timer";
import { ChevronUp, ChevronDown, Moon, Sun, X, Menu, Zap, AlertCircle, XCircle, Globe as Globe$1, Cloud, Wifi, MousePointerClick, Scan, Check, Phone, Mail, Facebook, Linkedin, Users, RefreshCw, Send, CircleCheckBig, Search, Monitor, Headset, Router, Volume2, Settings, MousePointer, BarChart3, Ticket, Wallet, Download, ChevronRight, PhoneCall, Code, Route, FileText } from "lucide-react";
import createGlobe from "cobe";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import fg from "fast-glob";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const globalStylesHref = "/assets/global-E_2eMaE6.css";
const __vite_import_meta_env__ = {};
const originalFetch = fetch;
const isBackend = () => typeof window === "undefined";
const env = typeof process !== "undefined" && process?.env ? process.env : __vite_import_meta_env__ ?? {};
const safeStringify = (value) => JSON.stringify(value, (_k, v) => {
  if (v instanceof Date) return { __t: "Date", v: v.toISOString() };
  if (v instanceof Error)
    return { __t: "Error", v: { name: v.name, message: v.message, stack: v.stack } };
  return v;
});
const postToParent = (level, text, extra) => {
  try {
    if (isBackend() || !window.parent || window.parent === window) {
      ("level" in console ? console[level] : console.log)(text, extra);
      return;
    }
    window.parent.postMessage(
      {
        type: "sandbox:web:console-write",
        __viteConsole: true,
        level,
        text,
        args: [safeStringify(extra)]
      },
      "*"
    );
  } catch {
  }
};
const getUrlFromArgs = (...args) => {
  const [input] = args;
  if (typeof input === "string") return input;
  if (input instanceof Request) return input.url;
  return `${input.protocol}//${input.host}${input.pathname}`;
};
const isFirstPartyURL = (url) => {
  return url.startsWith("/integrations") || url.startsWith("/_create");
};
const isSecondPartyUrl = (url) => {
  return env.NEXT_PUBLIC_CREATE_API_BASE_URL && url.startsWith(env.NEXT_PUBLIC_CREATE_API_BASE_URL) || env.NEXT_PUBLIC_CREATE_BASE_URL && url.startsWith(env.NEXT_PUBLIC_CREATE_BASE_URL) || url.startsWith("https://www.create.xyz") || url.startsWith("https://api.create.xyz/") || url.startsWith("https://www.createanything.com") || url.startsWith("https://api.createanything.com");
};
const fetchWithHeaders = async (input, init) => {
  const url = getUrlFromArgs(input, init);
  const additionalHeaders = {
    "x-createxyz-project-group-id": env.NEXT_PUBLIC_PROJECT_GROUP_ID
  };
  const isExternalFetch = !isFirstPartyURL(url) && !isSecondPartyUrl(url);
  if (isExternalFetch || url.startsWith("/api")) {
    return originalFetch(input, init);
  }
  let finalInit;
  if (input instanceof Request) {
    const hasBody = !!input.body;
    finalInit = {
      method: input.method,
      headers: new Headers(input.headers),
      body: input.body,
      mode: input.mode,
      credentials: input.credentials,
      cache: input.cache,
      redirect: input.redirect,
      referrer: input.referrer,
      referrerPolicy: input.referrerPolicy,
      integrity: input.integrity,
      keepalive: input.keepalive,
      signal: input.signal,
      ...hasBody ? { duplex: "half" } : {},
      ...init
    };
  } else {
    finalInit = { ...init, headers: new Headers(init?.headers ?? {}) };
  }
  const finalHeaders = new Headers(finalInit.headers);
  for (const [key, value] of Object.entries(additionalHeaders)) {
    if (value) finalHeaders.set(key, value);
  }
  finalInit.headers = finalHeaders;
  const prefix = !isSecondPartyUrl(url) ? isBackend() ? env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz" : "" : "";
  try {
    const result = await originalFetch(`${prefix}${url}`, finalInit);
    if (!result.ok) {
      postToParent(
        "error",
        `Failed to load resource: the server responded with a status of ${result.status} (${result.statusText ?? ""})`,
        {
          url,
          status: result.status,
          statusText: result.statusText
        }
      );
    }
    return result;
  } catch (error) {
    postToParent("error", "Fetch error", {
      url,
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error
    });
    throw error;
  }
};
function LoadFonts() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=block" }),
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=block" })
  ] });
}
const useSandboxStore = create((set, get) => ({
  status: "idle",
  isGenerating: false,
  hasError: false,
  setStatus: (status) => set({
    status,
    isGenerating: status === "codegen-started" || status === "codegen-generating",
    hasError: status === "codegen-error"
  }),
  startCodeGen: () => get().setStatus("codegen-started"),
  setCodeGenGenerating: () => get().setStatus("codegen-generating"),
  completeCodeGen: () => get().setStatus("codegen-complete"),
  errorCodeGen: () => get().setStatus("codegen-error"),
  stopCodeGen: () => get().setStatus("codegen-stopped"),
  resetToIdle: () => get().setStatus("idle")
}));
function HotReloadIndicator() {
  const { status: sandboxStatus } = useSandboxStore();
  useEffect(() => {
    return;
  }, []);
  useEffect(() => {
    const toastStyle = {
      padding: "16px",
      background: "#18191B",
      border: "1px solid #2C2D2F",
      color: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "var(--width)",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };
    switch (sandboxStatus) {
      case "codegen-started":
      case "codegen-generating":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: { ...toastStyle, padding: "10px" }, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://www.createanything.com/images/anything-logo-loading-state-white.gif",
                alt: "loading",
                className: "w-8 h-8"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Updating" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 3e3
          }
        );
        break;
      case "codegen-complete":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: toastStyle, children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                height: "20",
                width: "20",
                children: [
                  /* @__PURE__ */ jsx("title", { children: "Success" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
                      clipRule: "evenodd"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Updated successfully" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 3e3
          }
        );
        break;
      case "codegen-error":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: toastStyle, children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                height: "20",
                width: "20",
                children: [
                  /* @__PURE__ */ jsx("title", { children: "Error" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                      clipRule: "evenodd"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Update failed" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 5e3
          }
        );
        break;
    }
    return () => {
    };
  }, [sandboxStatus]);
  return null;
}
function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}
const links = () => [{
  rel: "stylesheet",
  href: globalStylesHref
}, {
  rel: "icon",
  href: "/images/fav_icon_update.png"
}];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
function SharedErrorBoundary({
  isOpen,
  children
}) {
  return /* @__PURE__ */ jsx("div", {
    className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
    children: /* @__PURE__ */ jsx("div", {
      className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-start gap-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex-shrink-0",
          children: /* @__PURE__ */ jsx("div", {
            className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-black text-[1.125rem] leading-none",
              children: "!"
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-2 flex-1",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-light text-[#F2F2F2] text-sm",
              children: "App Error Detected"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-[#959697] text-sm font-light",
              children: "It looks like an error occurred while trying to use your app."
            })]
          }), children]
        })]
      })
    })
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen: true
  });
});
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: showLogsButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:show-logs"
      }, "*");
    }, [])
  }, useRef(null));
  const {
    buttonProps: fixButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:fix",
        error: serializeError(error)
      }, "*");
      setIsOpen(false);
    }, [error]),
    isDisabled: !error
  }, useRef(null));
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
    }, [error])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen,
    children: isInIframe() ? /* @__PURE__ */ jsxs("div", {
      className: "flex gap-2",
      children: [!!error && /* @__PURE__ */ jsx("button", {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#f9f9f9] hover:bg-[#dbdbdb] active:bg-[#c4c4c4] border-[#c4c4c4] text-[#18191B] text-sm px-[8px] py-[4px] cursor-pointer",
        type: "button",
        ...fixButtonProps,
        children: "Try to fix"
      }), /* @__PURE__ */ jsx("button", {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px]",
        type: "button",
        ...showLogsButtonProps,
        children: "Show logs"
      })]
    }) : /* @__PURE__ */ jsx("button", {
      className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px] w-fit",
      type: "button",
      ...copyButtonProps,
      children: "Copy error"
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader: loader2
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader2()
  });
}
const ClientOnly = ({
  loader: loader2
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader: loader2
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const useCodeGen = () => {
  const {
    startCodeGen,
    setCodeGenGenerating,
    completeCodeGen,
    errorCodeGen,
    stopCodeGen
  } = useSandboxStore();
  useEffect(() => {
    const handleMessage = (event) => {
      const {
        type
      } = event.data;
      switch (type) {
        case "sandbox:web:codegen:started":
          startCodeGen();
          break;
        case "sandbox:web:codegen:generating":
          setCodeGenGenerating();
          break;
        case "sandbox:web:codegen:complete":
          completeCodeGen();
          break;
        case "sandbox:web:codegen:error":
          errorCodeGen();
          break;
        case "sandbox:web:codegen:stopped":
          stopCodeGen();
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen]);
};
const useRefresh = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:refresh:request") {
        setTimeout(() => {
          window.location.reload();
        }, 1e3);
        window.parent.postMessage({
          type: "sandbox:web:refresh:complete"
        }, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useCodeGen();
  useRefresh();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  useEffect(() => {
    return;
  }, []);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    suppressHydrationWarning: true,
    children: [/* @__PURE__ */ jsxs("head", {
      suppressHydrationWarning: true,
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx(LoadFonts, {})]
    }), /* @__PURE__ */ jsxs("body", {
      suppressHydrationWarning: true,
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(HotReloadIndicator, {}), /* @__PURE__ */ jsx(Toaster, {
        position: "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClientOnly,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext();
const LEGACY_THEME_KEY = "headerBgColor";
const THEME_KEY = "themeMode";
function normalizeTheme(value) {
  if (value === "light" || value === "white") return "light";
  if (value === "dark" || value === "default") return "dark";
  return "light";
}
function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const [mounted, setMounted] = useState(false);
  const applyTheme = (mode) => {
    const isLight = mode === "light";
    document.documentElement.classList.toggle("light-mode", isLight);
    document.documentElement.classList.toggle("dark", !isLight);
    document.documentElement.style.colorScheme = isLight ? "light" : "dark";
  };
  const toggleBgColor = () => {
    const nextMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(nextMode);
    localStorage.setItem(THEME_KEY, nextMode);
    localStorage.setItem(LEGACY_THEME_KEY, nextMode === "light" ? "white" : "default");
    applyTheme(nextMode);
  };
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_KEY);
    const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);
    const resolvedTheme = normalizeTheme(savedTheme || legacyTheme);
    setThemeMode(resolvedTheme);
    applyTheme(resolvedTheme);
  }, []);
  const bgColor = themeMode === "light" ? "white" : "default";
  const isLightMode = themeMode === "light";
  if (!mounted) {
    return /* @__PURE__ */ jsx(
      ThemeContext.Provider,
      {
        value: { bgColor: "white", themeMode: "light", isLightMode: true, toggleBgColor: () => {
        } },
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { bgColor, themeMode, isLightMode, toggleBgColor }, children });
}
const useTheme = () => useContext(ThemeContext);
const HOME_PATHS$1 = ["/", "/sohub"];
const SECTION_SCROLL_OFFSET = 108;
const INITIATIVES_API_URL = "https://sohub.netlify.app/api/initiatives.json";
const INITIATIVES_BASE_URL = "https://sohub.netlify.app";
const DEFAULT_CONNECT_BASE_URL = "https://connect-client.sohub.com.bd";
function resolveInitiativeLogo(logoPath, baseUrl) {
  if (!logoPath || typeof logoPath !== "string") {
    return "";
  }
  if (/^https?:\/\//i.test(logoPath)) {
    return logoPath;
  }
  if (logoPath.startsWith("/images/")) {
    return logoPath;
  }
  if (logoPath.startsWith("/")) {
    return `${baseUrl}${logoPath}`;
  }
  return `${baseUrl}/${logoPath}`;
}
function parseInitiativesResponse(data) {
  const items = Array.isArray(data) ? data : data?.initiatives || [];
  const baseUrl = typeof data?.baseUrl === "string" ? data.baseUrl : INITIATIVES_BASE_URL;
  return items.map((item, index) => {
    const name = typeof item?.name === "string" ? item.name : "";
    const hrefValue = typeof item?.href === "string" ? item.href.trim() : "";
    const href = hrefValue && hrefValue !== "#" ? hrefValue : null;
    return {
      id: item?.id || `${name || "initiative"}-${index}`,
      name,
      description: typeof item?.description === "string" ? item.description : "",
      href,
      logo: resolveInitiativeLogo(item?.logo, baseUrl),
      order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index + 1,
      isActive: item?.isActive !== false
    };
  }).filter((item) => item.isActive && item.name && item.logo).sort((a, b) => a.order - b.order);
}
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const [initiatives, setInitiatives] = useState([]);
  const [initiativesLoading, setInitiativesLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef(null);
  const initiativesContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const registerUrl = `${DEFAULT_CONNECT_BASE_URL}/authentication/register`;
  const { isLightMode, toggleBgColor } = useTheme();
  const ownedByLogoSrc = isLightMode ? "/images/sohub.png" : "/images/sohub_white.png";
  useEffect(() => {
    if (typeof window === "undefined") return;
    let isActive = true;
    const fetchInitiatives = async () => {
      try {
        const response = await fetch(INITIATIVES_API_URL, {
          mode: "cors",
          headers: { Accept: "application/json" },
          cache: "no-store"
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch initiatives: ${response.status}`);
        }
        const data = await response.json();
        if (isActive) {
          setInitiatives(parseInitiativesResponse(data));
        }
      } catch (error) {
        if (isActive) {
          console.error("Initiatives API fetch failed", error);
          setInitiatives([]);
        }
      } finally {
        if (isActive) {
          setInitiativesLoading(false);
        }
      }
    };
    fetchInitiatives();
    return () => {
      isActive = false;
    };
  }, []);
  const toggleInitiativesDrawer = () => {
    setMobileMenuOpen(false);
    setInitiativesOpen((prev) => !prev);
  };
  const getScrollOffset = () => {
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 96;
    return Math.ceil(headerHeight) + 12;
  };
  const scrollToSectionWithOffset = (sectionId, behavior = "smooth", offsetOverride) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return false;
    }
    const offset = offsetOverride;
    const targetY = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior
    });
    return true;
  };
  useEffect(() => {
    if (!HOME_PATHS$1.includes(location.pathname)) return;
    const sectionId = location.hash?.replace("#", "");
    if (sectionId) {
      setActiveSection(sectionId);
      requestAnimationFrame(() => {
        scrollToSectionWithOffset(sectionId, "smooth", SECTION_SCROLL_OFFSET);
      });
    }
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
  useEffect(() => {
    if (!initiativesOpen) return;
    const handleEscape = (e) => e.key === "Escape" && setInitiativesOpen(false);
    const handleOutside = (e) => {
      if (initiativesContainerRef.current && !initiativesContainerRef.current.contains(e.target)) {
        setInitiativesOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [initiativesOpen]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!HOME_PATHS$1.includes(location.pathname)) {
      setActiveSection("");
      return;
    }
    const handleScroll = () => {
      const sections = ["pbx", "pricing"];
      let currentSection = "";
      const markerY = getScrollOffset() - 8;
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= markerY && rect.bottom >= markerY) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  const handleScrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    const isHomePage = HOME_PATHS$1.includes(location.pathname);
    if (!isHomePage) {
      navigate({ pathname: "/", hash: `#${sectionId}` });
      return;
    }
    if (scrollToSectionWithOffset(sectionId, "smooth", SECTION_SCROLL_OFFSET)) {
      navigate({ pathname: location.pathname, hash: `#${sectionId}` }, { replace: true });
    }
  };
  return /* @__PURE__ */ jsxs("header", { ref: headerRef, className: `w-full border-b sticky top-0 z-50 backdrop-blur-sm ${isLightMode ? "bg-white/95 border-gray-200" : "bg-white dark:bg-[#121212] border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#121212]/95"}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `transition-all duration-300 border-b ${isScrolled ? "max-h-0 opacity-0 overflow-hidden" : "max-h-20 opacity-100 overflow-visible"} ${isLightMode ? "bg-[#f3f4f6] border-gray-200" : "bg-[#1a1a1a] border-gray-800"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between py-0.5", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://sohub.com.bd/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: ownedByLogoSrc,
                    alt: "Solution Hub Technologies",
                    className: "h-6"
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: `text-[10px] md:text-xs ${isLightMode ? "text-[#6b7280]" : "text-[#9ca3af]"}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Solution Hub Technologies(SOHUB) Owned & Operated" }),
                  /* @__PURE__ */ jsx("span", { className: "md:hidden", children: "SOHUB owned & operated" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { ref: initiativesContainerRef, className: "relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: toggleInitiativesDrawer,
                className: `text-xs gap-1 md:mr-0 -mr-4 px-2 py-1 rounded hover:bg-transparent transition-colors ${isLightMode ? "text-[#6b7280]" : "text-[#9ca3af]"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Our Initiatives" }),
                  /* @__PURE__ */ jsx("span", { className: "md:hidden", children: "Our Initiatives" }),
                  initiativesOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-3 h-3 inline ml-1" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 inline ml-1" })
                ]
              }
            ),
            initiativesOpen && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full z-[70] w-[320px] p-3", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-gray-300 bg-white p-3 shadow-2xl", children: initiativesLoading ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-xs text-gray-500", children: "Loading initiatives..." }) : initiatives.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-xs text-gray-500", children: "No initiatives found" }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: initiatives.map((initiative) => {
              const isCurrentSite = initiative.id === "connect" || initiative.name.toLowerCase().includes("connect");
              return initiative.href ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: initiative.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: () => setInitiativesOpen(false),
                  style: { WebkitTapHighlightColor: "transparent", outline: "none" },
                  className: `flex items-center justify-center p-4 rounded-lg border ${isCurrentSite ? "border-[#22C55E] bg-[#22C55E]/10 ring-2 ring-[#22C55E]/30" : "border-gray-300"}`,
                  children: /* @__PURE__ */ jsx("img", { src: initiative.logo, alt: initiative.name, className: "w-full h-full object-contain" })
                },
                initiative.id
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex items-center justify-center rounded-lg border border-gray-300 p-4 opacity-50 cursor-not-allowed",
                  children: /* @__PURE__ */ jsx("img", { src: initiative.logo, alt: initiative.name, className: "w-full h-full object-contain" })
                },
                initiative.id
              );
            }) }) }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-12 sm:h-14", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "block", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/connect_new_img.png",
          alt: "SOHUB Connect Logo",
          className: "w-28 sm:w-32 h-auto object-contain cursor-pointer"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              handleScrollToSection("pbx");
            },
            className: `font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${activeSection === "pbx" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
            children: "PBX"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/click-to-connect",
            className: `font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/click-to-connect" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
            children: "Click to Connect"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/hotscan",
            className: `font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/hotscan" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
            children: "HotScan"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/features",
            className: `font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/features" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              handleScrollToSection("pricing");
            },
            className: `font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${activeSection === "pricing" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
            children: "Pricing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleBgColor,
            className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            title: "Toggle theme",
            "aria-label": "Toggle theme",
            children: isLightMode ? /* @__PURE__ */ jsx(Moon, { size: 20, className: "text-gray-600 dark:text-gray-400" }) : /* @__PURE__ */ jsx(Sun, { size: 20, className: "text-gray-600 dark:text-gray-400" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: registerUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center px-6 py-2.5 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-sm hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50",
            children: "Start Free Forever"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleBgColor,
            className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            title: "Toggle theme",
            "aria-label": "Toggle theme",
            children: isLightMode ? /* @__PURE__ */ jsx(Moon, { size: 18, className: "text-gray-600 dark:text-gray-400" }) : /* @__PURE__ */ jsx(Sun, { size: 18, className: "text-gray-600 dark:text-gray-400" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: registerUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center px-4 py-2 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-xs hover:bg-[#16A34A] transition-all duration-200",
            children: "Start Free Forever"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "p-2 text-[#525252] dark:text-gray-400 hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors",
            "aria-label": "Toggle menu",
            "aria-expanded": mobileMenuOpen,
            "aria-controls": "mobile-main-menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        )
      ] })
    ] }) }),
    mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden absolute top-full left-0 right-0", style: { zIndex: 51 }, children: /* @__PURE__ */ jsx(
      "div",
      {
        id: "mobile-main-menu",
        className: "bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-lg rounded-b-[1.75rem] overflow-hidden",
        children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col items-start space-y-4 px-6 py-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                handleScrollToSection("pbx");
              },
              className: `w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${activeSection === "pbx" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
              children: "PBX"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/click-to-connect",
              onClick: () => {
                setMobileMenuOpen(false);
              },
              className: `block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/click-to-connect" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
              children: "Click to Connect"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/hotscan",
              onClick: () => {
                setMobileMenuOpen(false);
              },
              className: `block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/hotscan" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
              children: "HotScan"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/features",
              onClick: () => {
                setMobileMenuOpen(false);
              },
              className: `block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${currentPath === "/features" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
              children: "Features"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                handleScrollToSection("pricing");
              },
              className: `w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${activeSection === "pricing" ? "font-bold text-[#22C55E]" : "text-[#525252] dark:text-white"}`,
              children: "Pricing"
            }
          )
        ] })
      }
    ) })
  ] });
}
const FEATURES_SCROLL_FALLBACK_OFFSET = 124;
const FEATURES_SCROLL_EXTRA_GAP = 20;
function Hero() {
  const getFeaturesScrollOffset = () => {
    const header = document.querySelector("header");
    if (!(header instanceof HTMLElement)) {
      return FEATURES_SCROLL_FALLBACK_OFFSET;
    }
    return Math.ceil(header.getBoundingClientRect().height) + FEATURES_SCROLL_EXTRA_GAP;
  };
  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    if (!element) {
      return;
    }
    const targetY = window.scrollY + element.getBoundingClientRect().top - getFeaturesScrollOffset();
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white dark:bg-[#121212] pt-6 sm:pt-10 md:pt-8 lg:pt-10 pb-10 sm:pb-12 md:pb-14 lg:pb-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsx("div", { className: "md:min-h-[calc(100vh-112px)] md:flex md:items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-[#22C55E] border border-[#22C55E] rounded-full px-4 py-2", children: [
        /* @__PURE__ */ jsx(Zap, { size: 14, className: "text-[#FFFFFF]" }),
        /* @__PURE__ */ jsx("span", { className: "font-inter font-semibold text-xs text-[#FFFFFF]", children: "Revolutionary PBX System" })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-[1.15] text-[32px] sm:text-4xl md:text-5xl lg:text-6xl px-2", children: [
        "PBX, ",
        /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Without Boundaries." }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { className: "text-[#22C55E]", children: [
          "Without ",
          /* @__PURE__ */ jsx("span", { className: "text-[#111111] dark:text-white", children: "Phone" }),
          " Numbers."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2", children: "A borderless, cloud-native PBX built for real customer conversations in Bangladesh. One click. Instant conversation. No numbers. No waiting." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://connect-client.sohub.com.bd/authentication/register",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 min-h-[48px] sm:min-h-[52px] shadow-lg shadow-[#22C55E]/30",
            children: /* @__PURE__ */ jsx("span", { children: "Start Now" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#features",
            onClick: (e) => {
              e.preventDefault();
              scrollToFeatures();
            },
            className: "w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-[#1E1E1E] text-[#111111] dark:text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 min-h-[48px] sm:min-h-[52px] cursor-pointer",
            children: /* @__PURE__ */ jsx("span", { children: "See How It Works" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 sm:pt-6 md:pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "No credit card required" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "Built for Bangladesh" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "Free forever plan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mt-10 md:mt-14 lg:mt-16 relative max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E5E7EB] dark:border-gray-700 shadow-2xl overflow-hidden browser-mockup", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-3 bg-[#F9FAFB] dark:bg-[#262626] border-b border-[#E5E7EB] dark:border-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#EF4444]" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#F59E0B]" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-[#22C55E]" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 flex justify-center px-2", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-[#1E1E1E] rounded-md px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-[#737373] dark:text-white dark:text-opacity-60 border border-[#E5E7EB] dark:border-gray-600 truncate max-w-[180px] sm:max-w-none", children: "https://connect-client.sohub.com.bd/authentication" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "aspect-[1901/912] bg-[#F3F4F6] dark:bg-[#0A0A0A] dashboard-preview", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/Dashboard_new.png",
          alt: "Dashboard Preview",
          className: "w-full h-full object-contain"
        }
      ) })
    ] }) })
  ] }) });
}
function ProblemSection$1() {
  const problems = [
    {
      title: "Trust breaks",
      description: "Personal numbers feel risky",
      icon: "🔐"
    },
    {
      title: "Privacy breaks",
      description: "Business and personal life mix",
      icon: "👤"
    },
    {
      title: "Sales break",
      description: "Slow response means lost customers",
      icon: "📉"
    }
  ];
  const oldWay = [
    "Personal mobile numbers",
    "Missed calls",
    "WhatsApp voice calls",
    "Late responses"
  ];
  return /* @__PURE__ */ jsx("section", { id: "pbx", className: "scroll-mt-28 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "problem-badge inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-6", children: [
      /* @__PURE__ */ jsx(AlertCircle, { size: 14 }),
      /* @__PURE__ */ jsx("span", { className: "font-inter font-semibold text-xs", children: "The Problem" })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-4 sm:mb-6 max-w-3xl", children: "PBX Was Never Meant to Be This Small" }),
    /* @__PURE__ */ jsxs("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-3xl mb-8 sm:mb-12", children: [
      "For decades, PBX systems were designed for one building, sometimes two. They lived behind walls, cables, and local operators. But businesses changed. Customers changed. The internet changed.",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#111111] dark:text-white", children: "PBX didn't." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-inter font-bold text-lg sm:text-xl text-[#111111] dark:text-white mb-4", children: "In Bangladesh, most SOHO and e-commerce businesses still depend on:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: oldWay.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(XCircle, { size: 20, className: "text-red-500 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "font-inter text-base text-[#525252] dark:text-white dark:text-opacity-87", children: item })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-inter font-bold text-lg sm:text-xl text-[#111111] dark:text-white mb-4 sm:mb-6", children: "This creates three silent killers:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: problems.map((problem, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-white dark:bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl", children: problem.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-inter font-semibold text-base sm:text-lg text-[#111111] dark:text-white mb-1", children: problem.title }),
                /* @__PURE__ */ jsx("p", { className: "font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-70", children: problem.description })
              ] })
            ] })
          },
          index
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mt-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold", children: "Businesses deserve better." }) })
  ] }) });
}
const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {
  },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16e3,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [34 / 255, 197 / 255, 94 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [23.8103, 90.4125], size: 0.1 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [51.5074, -0.1278], size: 0.08 }
  ]
};
function Globe({ className = "" }) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };
  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };
  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi += 5e-3;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );
  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender
    });
    setTimeout(() => canvasRef.current.style.opacity = "1");
    return () => globe.destroy();
  }, [onRender]);
  return /* @__PURE__ */ jsx("div", { className: `absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] ${className}`, children: /* @__PURE__ */ jsx(
    "canvas",
    {
      className: "size-full opacity-0 transition-opacity duration-500",
      ref: canvasRef,
      onPointerDown: (e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current),
      onPointerUp: () => updatePointerInteraction(null),
      onPointerOut: () => updatePointerInteraction(null),
      onMouseMove: (e) => updateMovement(e.clientX),
      onTouchMove: (e) => e.touches[0] && updateMovement(e.touches[0].clientX)
    }
  ) });
}
const EYEBROW_BADGE_CLASS$1 = "inline-flex items-center space-x-2 bg-[#22C55E] border border-[#22C55E] rounded-full px-4 py-2";
const EYEBROW_ICON_CLASS$1 = "text-[#FFFFFF]";
const EYEBROW_TEXT_CLASS$1 = "font-inter font-semibold text-xs text-[#FFFFFF]";
function SolutionSection$1() {
  const features = [
    {
      icon: Globe$1,
      title: "Borderless",
      description: "One system. One identity. Across cities, countries, continents."
    },
    {
      icon: Cloud,
      title: "Cloud-native",
      description: "No buildings. No physical limits. Your PBX lives where your customers are."
    },
    {
      icon: Wifi,
      title: "Internet-first",
      description: "Built for the modern web. No PSTN. No telecom operator dependency."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white dark:bg-[#121212]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left space-y-4 sm:space-y-6 lg:space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: EYEBROW_BADGE_CLASS$1, children: [
          /* @__PURE__ */ jsx(Globe$1, { size: 14, className: EYEBROW_ICON_CLASS$1 }),
          /* @__PURE__ */ jsx("span", { className: EYEBROW_TEXT_CLASS$1, children: "Our Breakthrough" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[28px] sm:text-[32px] md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight", children: [
          "What If PBX Was ",
          /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Global?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: "Not inside a building. Not tied to a location. But available anywhere on the globe." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4 md:space-y-6 pt-2 sm:pt-4", children: features.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3 sm:space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#22C55E] rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(feature.icon, { size: 20, className: "sm:w-6 sm:h-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-inter font-bold text-base sm:text-lg md:text-xl text-[#111111] dark:text-white mb-1", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: feature.description })
          ] })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden", children: /* @__PURE__ */ jsx(Globe, { className: "scale-100" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12 md:mt-16 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-[#111111] dark:text-white font-semibold px-4", children: "A PBX that lives where your customers already are." }) })
  ] }) });
}
const EYEBROW_BADGE_CLASS = "inline-flex items-center space-x-2 bg-[#22C55E] border border-[#22C55E] rounded-full px-4 py-2";
const EYEBROW_ICON_CLASS = "text-[#FFFFFF]";
const EYEBROW_TEXT_CLASS = "font-inter font-semibold text-xs text-[#FFFFFF]";
function FeaturesSection() {
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "features",
      className: "scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 md:px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 md:mb-16", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-4 md:mb-6", children: [
            "We Removed ",
            /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Phone Numbers" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-inter text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-3xl mx-auto", children: [
            "Traditional PBX systems route calls through phone numbers and human operators. We asked a simple question:",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#111111] dark:text-white", children: "Why should customers dial a number at all?" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-16 md:mb-24", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: EYEBROW_BADGE_CLASS, children: [
              /* @__PURE__ */ jsx(
                MousePointerClick,
                {
                  size: 14,
                  className: EYEBROW_ICON_CLASS
                }
              ),
              /* @__PURE__ */ jsx("span", { className: EYEBROW_TEXT_CLASS, children: "Click-to-Call" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#111111] dark:text-white leading-tight", children: "Click to Connect" }),
            /* @__PURE__ */ jsxs("p", { className: "font-inter text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: [
              "Instead of calling a number: Customers click a button on your website or app. That's it. No dial pad. No SIM. No waiting.",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#111111] dark:text-white", children: "A real human voice — instantly." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-inter text-sm font-semibold text-[#111111] dark:text-white", children: "This button can live on:" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                "Websites",
                "Web apps",
                "Landing pages",
                "Any online platform"
              ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#22C55E] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "font-inter text-sm text-[#525252] dark:text-white dark:text-opacity-87", children: item })
              ] }, index)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 md:pt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-inter text-lg md:text-xl text-[#111111] dark:text-white font-semibold mb-4 md:mb-6", children: "One click turns interest into conversation." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap gap-3", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/click-to-connect",
                    className: "px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] !text-white font-inter font-semibold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-center",
                    children: "Learn More"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/features",
                    className: "px-6 py-3 bg-[#111111] dark:bg-[#2a2a2a] hover:opacity-70 !text-white font-inter font-semibold text-sm rounded-lg transition-all duration-200 border border-[#111111] dark:border-gray-700 shadow-sm text-center",
                    children: "Features"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative mt-8 lg:mt-0", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("div", { className: "font-inter font-bold text-lg text-[#111111] dark:text-white", children: "Click to Connect Demo" }) }),
            /* @__PURE__ */ jsx("div", { className: "relative aspect-video bg-gray-100 dark:bg-[#262626] rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs(
              "video",
              {
                className: "w-full h-full object-cover",
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                children: [
                  /* @__PURE__ */ jsx("source", { src: "/videos/click_to_connect.mp4", type: "video/mp4" }),
                  "Your browser does not support the video tag."
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "text-center font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-60", children: "See how customers connect instantly without dialing numbers" })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "relative lg:order-1 order-2 mt-8 lg:mt-0", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-inter font-bold text-lg text-[#111111] dark:text-white mb-4 text-right", children: "HotScan Demo" }),
            /* @__PURE__ */ jsx("div", { className: "relative aspect-video bg-gray-100 dark:bg-[#262626] rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs(
              "video",
              {
                className: "w-full h-full object-cover",
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                children: [
                  /* @__PURE__ */ jsx("source", { src: "/videos/hotscan.mp4", type: "video/mp4" }),
                  "Your browser does not support the video tag."
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 font-inter text-sm font-semibold text-[#111111] dark:text-white text-center", children: "Scan to Connect" }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-60 text-center", children: "Instant voice support" })
          ] }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-6 lg:order-2 order-1", children: [
            /* @__PURE__ */ jsxs("div", { className: EYEBROW_BADGE_CLASS, children: [
              /* @__PURE__ */ jsx(
                Scan,
                {
                  size: 14,
                  className: EYEBROW_ICON_CLASS
                }
              ),
              /* @__PURE__ */ jsx("span", { className: EYEBROW_TEXT_CLASS, children: "QR-Based Calling" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#111111] dark:text-white leading-tight", children: "HotScan" }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: "Hotlines are outdated. So we replaced them. Meet HotScan. A printable, static QR code that customers scan and the call starts instantly." }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-inter text-sm font-semibold text-[#111111] dark:text-white", children: "Works on:" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                "Brochures",
                "Packaging",
                "Billboards",
                "Delivery slips"
              ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#22C55E] rounded-full" }),
                /* @__PURE__ */ jsx("span", { className: "font-inter text-sm text-[#525252] dark:text-white dark:text-opacity-87", children: item })
              ] }, index)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 md:pt-4 space-y-3 md:space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-inter text-base text-[#525252] dark:text-white dark:text-opacity-80", children: "No saving numbers. No dialing mistakes." }),
              /* @__PURE__ */ jsx("p", { className: "font-inter text-lg md:text-xl text-[#111111] dark:text-white font-semibold mb-4 md:mb-6", children: "Just scan and speak." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap gap-3", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/hotscan",
                    className: "px-6 py-3 bg-[#22C55E] hover:bg-[#16A34A] !text-white font-inter font-semibold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-center",
                    children: "Learn More"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/features",
                    className: "px-6 py-3 bg-[#111111] dark:bg-[#2a2a2a] hover:opacity-70 !text-white font-inter font-semibold text-sm rounded-lg transition-all duration-200 border border-[#111111] dark:border-gray-700 shadow-sm text-center",
                    children: "Features"
                  }
                )
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 md:mt-20 text-center bg-gradient-to-r from-[#22C55E]/10 to-[#16A34A]/10 dark:from-[#22C55E]/20 dark:to-[#16A34A]/20 rounded-2xl p-6 md:p-12 border border-[#22C55E]/30 feature-bottom", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-3xl text-[#111111] dark:text-white mb-4", children: "This Is Not a Phone System" }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 max-w-2xl mx-auto", children: "Phones are about numbers. SOHUB Connect is about intent. When a customer wants to talk — we remove every obstacle in between." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center space-x-2 md:space-x-4 text-xl md:text-2xl font-bold text-[#22C55E]", children: [
            /* @__PURE__ */ jsx("span", { children: "Click." }),
            /* @__PURE__ */ jsx("span", { children: "Scan." }),
            /* @__PURE__ */ jsx("span", { children: "Talk." })
          ] })
        ] })
      ] })
    }
  );
}
function PricingSection() {
  const freeFeatures = [
    "Up to 5 users / Phones",
    "Click to Connect call button",
    "HotScan QR calls",
    "Team-based call handling",
    "Call history & analytics",
    "Email support"
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "pricing",
      className: "scroll-mt-28 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white dark:bg-[#121212]",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-12 md:mb-16", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center space-x-2 bg-[#22C55E] border border-[#22C55E] rounded-full px-4 py-2 mb-6", children: /* @__PURE__ */ jsx("span", { className: "font-inter font-semibold text-xs text-[#FFFFFF]", children: "Simple. Honest. Predictable" }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-4 sm:mb-6", children: "Pricing That Just Makes Sense" }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-2xl mx-auto px-4", children: "We keep it honest and simple. No bundles. No confusion." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#F0FDF4] to-white dark:from-[#1E1E1E] dark:to-[#1A1A1A] rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-[#22C55E] shadow-2xl shadow-[#22C55E]/20 pricing-card", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center bg-[#22C55E] text-white rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8", children: /* @__PURE__ */ jsx("span", { className: "font-inter font-bold text-sm", children: "FREE FOREVER" }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: freeFeatures.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-inter text-sm sm:text-base text-[#111111] dark:text-white", children: feature })
          ] }, index)) }) }),
          /* @__PURE__ */ jsx("div", { className: "border-t-2 border-dashed border-[#22C55E]/30 my-6 sm:my-8" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-70 mb-2", children: "Then:" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline space-x-2", children: [
                /* @__PURE__ */ jsx("span", { className: "font-plus-jakarta-sans font-bold text-4xl sm:text-5xl text-[#111111] dark:text-white", children: "৳50" }),
                /* @__PURE__ */ jsx("span", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70", children: "per additional user / month" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800", children: /* @__PURE__ */ jsxs("p", { className: "font-inter text-sm text-blue-900 dark:text-blue-200", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Note:" }),
              " 1 Button = 1 User | 1 HotScan = 1 User"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-10", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://connect-client.sohub.com.bd/authentication/register",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-full bg-[#22C55E] text-white font-inter font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 text-center shadow-xl shadow-[#22C55E]/30",
                children: "Start Free — Up to 5 Users"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-center mt-4 font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60", children: "No credit card. No commitment." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-base text-[#525252] dark:text-white dark:text-opacity-70", children: "That's it. Really." }) })
      ] })
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
});
Button.displayName = "Button";
cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
function FAQSection() {
  const faqs = [
    {
      question: "What is SOHUB Connect?",
      answer: "SOHUB Connect is a borderless, cloud-native PBX that lets businesses talk to customers instantly — without phone numbers or dialing.",
      category: "Getting Started"
    },
    {
      question: "How is this different from traditional PBX or phone systems?",
      answer: "Traditional PBX is tied to buildings and phone numbers. SOHUB Connect is internet-first and works wherever your customers are — online or offline.",
      category: "Technical"
    },
    {
      question: "Do customers need an app or a phone number?",
      answer: "No. Customers connect instantly through a click or QR scan — directly from their browser.",
      category: "Availability"
    },
    {
      question: "Is SOHUB Connect built for Bangladesh?",
      answer: "Yes. It is designed specifically for Bangladeshi businesses, customer behavior, and local infrastructure.",
      category: "Billing"
    },
    {
      question: "How fast can I get started?",
      answer: "Most businesses can start receiving calls within minutes. No hardware. No setup.",
      category: "Features"
    },
    {
      question: "Is there a free plan?",
      answer: "Yes. SOHUB Connect includes a FREE FOREVER plan for up to five users.",
      category: "Support"
    },
    {
      question: "Is this secure and reliable?",
      answer: "Yes. SOHUB Connect uses secure, cloud-based infrastructure to ensure stable and private conversations.",
      category: "Support"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-14 md:py-16 w-full bg-white dark:bg-[#121212]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white px-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white/70 px-4", children: "Find answers to common questions about SOHUB Connect" })
    ] }),
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3 sm:space-y-4", children: faqs.map((item, index) => /* @__PURE__ */ jsxs(
      AccordionItem,
      {
        value: `item-${index}`,
        className: cn(
          "mb-3 sm:mb-4 rounded-xl",
          "bg-white dark:bg-[#1E1E1E]",
          "border border-gray-200 dark:border-gray-700",
          "shadow-sm"
        ),
        children: [
          /* @__PURE__ */ jsx(
            AccordionTrigger,
            {
              className: "px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline",
              children: /* @__PURE__ */ jsx("h3", { className: "font-inter text-base sm:text-lg font-medium text-[#111111] dark:text-white pr-2", children: item.question })
            }
          ),
          /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base text-[#525252] dark:text-white/70 leading-relaxed", children: item.answer }) })
        ]
      },
      index
    )) })
  ] }) }) });
}
function CTASection$1() {
  return /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 py-10 sm:py-12 bg-white dark:bg-[#121212] cta-section", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] p-8 sm:p-10 md:p-12 lg:p-16", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight px-2", children: "Experience the Future of Business Communication" }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-2", children: "People don't buy from websites. They buy from people. SOHUB Connect lets your customers hear you at the exact moment they decide." }),
    /* @__PURE__ */ jsxs("div", { className: "pt-2 sm:pt-4", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://connect-client.sohub.com.bd/authentication/register",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center justify-center space-x-2 bg-white text-[#22C55E] font-inter font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-2xl w-full sm:w-auto whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsx(Phone, { size: 18, className: "flex-shrink-0 sm:w-5 sm:h-5" }),
            /* @__PURE__ */ jsx("span", { children: "FREE FOREVER — Up to 5 Users" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-center mt-4 font-inter text-sm text-white/80", children: "No credit card. No commitment." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base text-white font-semibold pt-2 sm:pt-4 px-2", children: "Because Bangladeshi businesses — and customers — deserve better." })
  ] }) }) }) });
}
const HOME_PATHS = ["/", "/sohub"];
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const handleScrollToSection = (e, sectionId) => {
    const isHomePage = HOME_PATHS.includes(window.location.pathname);
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return /* @__PURE__ */ jsx("footer", { className: "footer-shell w-full border-t border-slate-200/80", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1240px] px-6 pt-16 pb-10 md:pt-20 md:pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-14", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/connect_new_img.png",
            alt: "SOHUB Connect Logo",
            className: "h-20 w-32 object-contain"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "footer-muted font-inter max-w-md text-sm leading-relaxed", children: "The first borderless, cloud-native PBX built for Bangladesh. Redefining business communication for SOHO and e-commerce." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "mailto:connect@sohub.com.bd",
            className: "footer-link inline-flex items-center gap-2 font-inter text-sm font-medium transition-colors duration-200",
            children: [
              /* @__PURE__ */ jsx(Mail, { size: 16 }),
              /* @__PURE__ */ jsx("span", { children: "connect@sohub.com.bd" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em] mb-3", children: "Follow Us" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.facebook.com/sohubconnect",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "SOHUB Connect Facebook Page",
                title: "Facebook",
                className: "footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200",
                children: /* @__PURE__ */ jsx(Facebook, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/company/sohub-connect/",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "SOHUB Connect LinkedIn Page",
                title: "LinkedIn",
                className: "footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200",
                children: /* @__PURE__ */ jsx(Linkedin, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.facebook.com/groups/sohubconnect",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "SOHUB Connect Facebook Community",
                title: "Community",
                className: "footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200",
                children: /* @__PURE__ */ jsx(Users, { size: 18 })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em]", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#pbx",
              onClick: (e) => handleScrollToSection(e, "pbx"),
              className: "footer-link block cursor-pointer font-inter text-sm transition-colors duration-200",
              children: "PBX"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/click-to-connect",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "Click to Connect"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/hotscan",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "HotScan"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/features",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "Features"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#pricing",
              onClick: (e) => handleScrollToSection(e, "pricing"),
              className: "footer-link block cursor-pointer font-inter text-sm transition-colors duration-200",
              children: "Pricing"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em]", children: "Company" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/about",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "About"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contact",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "Contact"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/documentation",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "User Manual"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/terms",
              className: "footer-link block font-inter text-sm transition-colors duration-200",
              children: "Terms & Conditions"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "footer-border border-t pt-6", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("p", { className: "footer-muted font-inter text-xs text-center", children: [
      "© ",
      year,
      " SOHUB Connect. Built for Bangladesh. All rights reserved."
    ] }) }) })
  ] }) });
}
const page$8 = UNSAFE_withComponentProps(function Page() {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("main", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(ProblemSection$1, {}), /* @__PURE__ */ jsx(SolutionSection$1, {}), /* @__PURE__ */ jsx(FeaturesSection, {}), /* @__PURE__ */ jsx(PricingSection, {}), /* @__PURE__ */ jsx(FAQSection, {}), /* @__PURE__ */ jsx(CTASection$1, {}), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: "Module" }));
const page$7 = UNSAFE_withComponentProps(function AboutPage() {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("section", {
        className: "w-full py-20 md:py-24 px-6",
        children: /* @__PURE__ */ jsx("div", {
          className: "max-w-6xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center space-y-8",
            children: [/* @__PURE__ */ jsx("h1", {
              className: "font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight",
              children: "Our Introduction"
            }), /* @__PURE__ */ jsx("p", {
              className: "font-inter text-xl md:text-2xl text-[#111111] dark:text-white font-semibold leading-relaxed max-w-4xl mx-auto",
              children: "We're rethinking how people and businesses talk in Bangladesh."
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6 pt-4 max-w-4xl mx-auto",
              children: [/* @__PURE__ */ jsx("p", {
                className: "font-inter text-base md:text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify",
                children: "SOHUB Connect is built to make communication simple, secure, and internet-first — so conversations can start the moment intent appears. Instead of relying on buildings, hardware, or phone numbers, we use the cloud to help anyone connect instantly, from anywhere."
              }), /* @__PURE__ */ jsx("p", {
                className: "font-inter text-base md:text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify",
                children: "Whether you're running a business, managing a team, serving customers, or collaborating across locations, SOHUB Connect keeps communication natural, fast, and reliable."
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "w-full py-20 md:py-24 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]",
        children: /* @__PURE__ */ jsx("div", {
          className: "max-w-6xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight",
              children: "Who We Are"
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6 max-w-3xl",
              children: [/* @__PURE__ */ jsx("p", {
                className: "font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify",
                children: "SOHUB Connect is a cloud-native communication platform from Bangladesh, designed to modernize how voice conversations happen online."
              }), /* @__PURE__ */ jsx("p", {
                className: "font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify",
                children: "We help individuals, teams, startups, growing companies, and large organizations move beyond personal numbers, missed calls, and slow responses — and into instant, organized, and secure conversations."
              }), /* @__PURE__ */ jsx("p", {
                className: "font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify",
                children: "Expanding your team, opening new branches, supporting customers, or working remotely? SOHUB Connect adapts quietly in the background, giving you one simple system to talk, manage, and scale without friction."
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsxs("p", {
                className: "font-inter text-2xl text-[#111111] dark:text-white font-semibold max-w-2xl",
                children: ["We're not just building telephony.", /* @__PURE__ */ jsx("br", {}), "We're building a better way to start conversations."]
              })
            })]
          })
        })
      }), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: "Module" }));
const HOW_IT_WORKS_SCROLL_FALLBACK_OFFSET$1 = 124;
const HOW_IT_WORKS_SCROLL_EXTRA_GAP$1 = 20;
function HeroSection$1() {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (!element) {
      return;
    }
    const header = document.querySelector("header");
    const headerOffset = header instanceof HTMLElement ? Math.ceil(header.getBoundingClientRect().height) + HOW_IT_WORKS_SCROLL_EXTRA_GAP$1 : HOW_IT_WORKS_SCROLL_FALLBACK_OFFSET$1;
    const targetY = window.scrollY + element.getBoundingClientRect().top - headerOffset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white dark:bg-[#121212] py-8 sm:py-10 md:py-12 lg:py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 border border-[#22C55E]/30 dark:border-[#22C55E]/40 rounded-full px-4 py-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-[#22C55E]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" }) }),
      /* @__PURE__ */ jsx("span", { className: "font-inter font-semibold text-xs text-[#22C55E]", children: "Start talking instantly" })
    ] }),
    /* @__PURE__ */ jsxs("h1", { className: "font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-tight text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl px-2", children: [
      "Click to ",
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Connect" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2", children: "Start the conversation the moment intent appears" }),
    /* @__PURE__ */ jsxs("p", { className: "font-inter text-[#111111] dark:text-white text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2", children: [
      "One click connects your customer to a real human voice.",
      /* @__PURE__ */ jsx("br", {}),
      "No phone numbers. No dialing. No waiting."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://connect-client.sohub.com.bd/authentication/register",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 shadow-lg shadow-[#22C55E]/30",
          children: /* @__PURE__ */ jsx("span", { children: "Get started" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#how-it-works",
          onClick: (event) => {
            event.preventDefault();
            scrollToHowItWorks();
          },
          className: "w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-[#1E1E1E] text-[#111111] dark:text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 cursor-pointer",
          children: /* @__PURE__ */ jsx("span", { children: "See how it works" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-xs sm:text-sm text-[#22C55E] font-semibold", children: "FREE FOREVER for up to 5 users" }),
    /* @__PURE__ */ jsxs("div", { className: "pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("span", { children: "Ready in minutes" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("span", { children: "No setup. No hardware." })
      ] })
    ] })
  ] }) }) });
}
function PauseProblem() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8 sm:space-y-10 md:space-y-12", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-tight px-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[#111111] dark:text-white", children: "When customers want to talk," }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "every second matters" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg lg:text-xl text-[#525252] dark:text-white dark:text-opacity-70", children: "Most businesses still ask customers to:" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white", children: "Find a phone number" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white", children: "Dial manually" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white", children: "Wait, retry, or give up" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] dark:text-white dark:text-opacity-60", children: "Every extra step creates friction." }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] dark:text-white dark:text-opacity-60", children: "Every second of delay loses trust." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-6 sm:pt-8", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-[#111111] dark:text-white font-semibold px-2", children: "Click to Connect removes everything between intent and conversation." }) })
  ] }) }) });
}
function WhatItIs() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#121212]", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white text-center leading-tight px-2", children: [
      "What is ",
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Click to Connect?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: "Click to Connect is a simple call button you place on your website." }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: "When a customer clicks it, a voice conversation starts instantly — directly inside the browser." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 pt-4", children: /* @__PURE__ */ jsxs("p", { className: "font-inter text-base sm:text-lg text-[#111111] dark:text-white", children: [
      "No SIM cards.",
      /* @__PURE__ */ jsx("br", {}),
      "No telecom operators.",
      /* @__PURE__ */ jsx("br", {}),
      "No phone numbers."
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold text-center pt-6", children: "Just real human conversation, right when it matters." })
  ] }) }) });
}
function HowItWorks$1() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const slideImages = [
    "/images/website/add_click_to_connect.png",
    "/images/website/Click_to_connecct_2.png",
    "/images/website/c2c3.png"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 2e3);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!activeImage) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeImage]);
  const steps2 = [
    {
      number: "1",
      title: "Create",
      description: "Create a Click to Connect button from your dashboard.\nChoose who should receive calls.",
      hasSlider: true
    },
    {
      number: "2",
      title: "Add",
      description: "Copy the embed code and place it on your website.\nNo configuration required.",
      image: "/images/website/script.png"
    },
    {
      number: "3",
      title: "Talk",
      description: "Customers click the button.\nYour team answers instantly.",
      video: "/images/click_to_connect/c2c-video.mp4"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "how-it-works", className: "scroll-mt-28 py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white mb-3 sm:mb-4 leading-tight px-2", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 px-2", children: "Getting started takes less than a minute." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20", children: steps2.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: `space-y-4 sm:space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#22C55E]/10 dark:bg-[#22C55E]/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-inter text-lg font-semibold text-[#22C55E]", children: step.number }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-3xl text-[#111111] dark:text-white", children: step.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed whitespace-pre-line", children: step.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `${index % 2 === 1 ? "lg:order-1" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xl", children: step.hasSlider ? /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden relative", children: slideImages.map((img, i) => /* @__PURE__ */ jsx(
          "img",
          {
            src: img,
            alt: `Step ${step.number} - ${i + 1}`,
            className: `c2c-hiw-zoomable absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentSlide ? "opacity-100" : "opacity-0"}`,
            onClick: () => {
              if (i !== currentSlide) return;
              setActiveImage({
                src: img,
                alt: `Step ${step.number}`
              });
            }
          },
          i
        )) }) : step.image ? /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: step.image,
            alt: step.title,
            className: "c2c-hiw-zoomable w-full h-full object-contain",
            onClick: () => setActiveImage({
              src: step.image,
              alt: step.title
            })
          }
        ) }) : step.video ? /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx("video", { src: step.video, autoPlay: true, loop: true, muted: true, playsInline: true, className: "w-full h-full object-contain" }) }) : /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#0A0A0A] dark:to-[#1A1A1A] rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "font-inter text-3xl font-bold text-white", children: step.number }) }),
          /* @__PURE__ */ jsxs("p", { className: "font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60", children: [
            step.title,
            " Preview"
          ] })
        ] }) }) }) })
      ] }, step.number)) }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold text-center mt-12 sm:mt-16", children: "That's it." })
    ] }),
    activeImage && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center",
        onClick: () => setActiveImage(null),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-white absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none",
              onClick: () => setActiveImage(null),
              "aria-label": "Close image preview",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: activeImage.src,
              alt: activeImage.alt,
              className: "max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl",
              onClick: (event) => event.stopPropagation()
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @media (hover: hover) and (pointer: fine) {
          .c2c-hiw-zoomable {
            transition: transform 220ms ease, box-shadow 220ms ease;
            transform-origin: center;
            cursor: zoom-in;
            will-change: transform;
          }
          .c2c-hiw-zoomable:hover {
            transform: scale(1.04);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
          }
        }
      ` })
  ] });
}
function CalmCTA() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 cta-section", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight px-2", children: "Start talking, instantly" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto px-2", children: "When customers are ready, real conversations begin." }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto px-2", children: "Click to Connect lets your team respond the moment intent appears." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://connect-client.sohub.com.bd/authentication/register",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center justify-center bg-white text-[#22C55E] font-inter font-semibold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-lg",
        children: "Get started"
      }
    ) })
  ] }) });
}
const SWIPER_SCRIPT_SRC$1 = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
const SWIPER_STYLE_HREF$1 = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
const SWIPER_STYLE_ID$1 = "sohub-swiper-style";
const SWIPER_SCRIPT_ID$1 = "sohub-swiper-script";
let swiperLoaderPromise$1 = null;
function ensureSwiperAssets$1() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (window.Swiper) {
    return Promise.resolve(window.Swiper);
  }
  if (swiperLoaderPromise$1) {
    return swiperLoaderPromise$1;
  }
  swiperLoaderPromise$1 = new Promise((resolve, reject) => {
    let styleEl = document.getElementById(SWIPER_STYLE_ID$1);
    if (!styleEl) {
      styleEl = document.createElement("link");
      styleEl.id = SWIPER_STYLE_ID$1;
      styleEl.rel = "stylesheet";
      styleEl.href = SWIPER_STYLE_HREF$1;
      document.head.appendChild(styleEl);
    }
    const existingScript = document.getElementById(SWIPER_SCRIPT_ID$1);
    if (existingScript) {
      if (window.Swiper) {
        resolve(window.Swiper);
      } else {
        existingScript.addEventListener("load", () => resolve(window.Swiper), {
          once: true
        });
        existingScript.addEventListener("error", reject, { once: true });
      }
      return;
    }
    const script = document.createElement("script");
    script.id = SWIPER_SCRIPT_ID$1;
    script.src = SWIPER_SCRIPT_SRC$1;
    script.async = true;
    script.onload = () => resolve(window.Swiper);
    script.onerror = reject;
    document.body.appendChild(script);
  }).catch((error) => {
    swiperLoaderPromise$1 = null;
    throw error;
  });
  return swiperLoaderPromise$1;
}
function initializeSwipers$1() {
  if (typeof window === "undefined" || !window.Swiper) {
    return;
  }
  document.querySelectorAll(".swiper-container").forEach((container) => {
    if (container.swiper) {
      container.swiper.update();
      return;
    }
    const slideCount = container.querySelectorAll(".swiper-slide").length;
    new window.Swiper(container, {
      loop: slideCount > 1,
      autoplay: slideCount > 1 ? { delay: 3e3, disableOnInteraction: false } : false
    });
  });
}
function ExploreFunctionalitiesSection() {
  const [activeTab, setActiveTab] = useState("call-efficiency");
  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    let cancelled = false;
    ensureSwiperAssets$1().then(() => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        initializeSwipers$1();
      }, 120);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [activeTab]);
  useEffect(() => {
    if (!activeImage) {
      return void 0;
    }
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeImage]);
  const openImagePreview = (src, alt) => {
    setActiveImage({ src, alt });
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-6 md:py-10 px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[920px] mx-auto my-6 md:my-10 text-center p-4 md:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-plus-jakarta-sans font-bold text-base md:text-lg mb-4 md:mb-5 text-[#111111] dark:text-white", children: [
        "Explore ",
        /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "SOHUB Connect" }),
        " ",
        "Functionalities"
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          id: "business-tabs",
          className: "bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-3 md:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex justify-start md:justify-center gap-1 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          children: [
            { id: "call-efficiency", label: "Call Flow" },
            { id: "work-anywhere", label: "Phones" },
            { id: "unified-communications", label: "Ring Groups" },
            { id: "sound-file", label: "Custom Audio" }
          ].map((tab) => /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => setActiveTab(tab.id),
              className: `px-3 md:px-4 py-2 md:py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${activeTab === tab.id ? "bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm" : "text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50"}`,
              children: tab.label
            },
            tab.id
          ))
        }
      ),
      activeTab === "call-efficiency" && /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white", children: "Deliver a professional calling experience with SOHUB Connect's smart IVR — no hardware or setup hassle." }),
          /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Custom Welcome Messages – Set your own audio recordings or personalized greetings to welcome callers" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Interactive Voice Menus – Guide callers to the right team with clear menu options" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Smart Call Transfers – Automatically route callers to the right team or destination based on their needs" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Playback Audio Messages – Announce updates, business hours, or other important information through audio" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Ring Group Integration – Forward calls using smart ring strategies for the right team" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5", children: "Ensure fast, accurate, and professional responses—right from the first ring." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "swiper-container",
            style: { width: "100%", borderRadius: "16px", overflow: "hidden" },
            children: /* @__PURE__ */ jsx("div", { className: "swiper-wrapper", children: /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/website/call_flow.png",
                alt: "Call Flow",
                className: "cursor-zoom-in",
                onClick: () => openImagePreview("/images/website/call_flow.png", "Call Flow"),
                style: { width: "100%", display: "block" }
              }
            ) }) })
          }
        ) })
      ] }) }),
      activeTab === "work-anywhere" && /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white", children: "Easily Create and Manage User Phones Without Any Hassle" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Instant Setup – New phones are created quickly and ready to use" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Personalized Phone Naming – Organize phones by employee name, team, or department" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "One-Click Activation – Just save, and your new phone is instantly activated!" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "swiper-container",
            style: { width: "100%", borderRadius: "16px", overflow: "hidden" },
            children: /* @__PURE__ */ jsx("div", { className: "swiper-wrapper", children: /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/features/phones_new.png",
                alt: "Phones",
                className: "cursor-zoom-in",
                onClick: () => openImagePreview("/images/features/phones_new.png", "Phones"),
                style: { width: "100%", display: "block" }
              }
            ) }) })
          }
        ) })
      ] }) }),
      activeTab === "unified-communications" && /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white", children: "Easily forward incoming calls to one or multiple agents using smart ring strategies tailored to your business." }),
          /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Multiple Ring Strategies – Choose from Ring All, Sequential, or Random ring patterns based on your team structure" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Add Multiple Phones – Group multiple team members or departments under one ring group" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Flexible Call Distribution – Ensure no call goes unanswered by distributing calls intelligently across your team" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "swiper-container",
            style: { width: "100%", borderRadius: "16px", overflow: "hidden" },
            children: /* @__PURE__ */ jsx("div", { className: "swiper-wrapper", children: /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/features/ring_group_new.png",
                alt: "Ring Groups",
                className: "cursor-zoom-in",
                onClick: () => openImagePreview("/images/features/ring_group_new.png", "Ring Groups"),
                style: { width: "100%", display: "block" }
              }
            ) }) })
          }
        ) })
      ] }) }),
      activeTab === "sound-file" && /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white", children: "Record Your Own Voice for Call Flows to Boost Customer Satisfaction" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Record Your Own Voice – Create and upload custom welcome messages, menu prompts, or announcements for your callers" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 text-[#22C55E] font-bold", children: "✔" }),
              /* @__PURE__ */ jsx("span", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80", children: "Use Immediately After Upload – Your voice recording becomes instantly available in the call flow as soon as it's uploaded" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "swiper-container",
            style: { width: "100%", borderRadius: "16px", overflow: "hidden" },
            children: /* @__PURE__ */ jsx("div", { className: "swiper-wrapper", children: /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/website/sound_file.png",
                alt: "Custom Audio",
                className: "cursor-zoom-in",
                onClick: () => openImagePreview("/images/website/sound_file.png", "Custom Audio"),
                style: { width: "100%", display: "block" }
              }
            ) }) })
          }
        ) })
      ] }) })
    ] }),
    activeImage && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center",
        onClick: () => setActiveImage(null),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close image preview",
              className: "absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none",
              onClick: () => setActiveImage(null),
              children: "×"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: activeImage.src,
              alt: activeImage.alt,
              className: "max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl",
              onClick: (event) => event.stopPropagation()
            }
          )
        ]
      }
    )
  ] });
}
const page$6 = UNSAFE_withComponentProps(function ClickToConnectPage() {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(HeroSection$1, {}), /* @__PURE__ */ jsx(PauseProblem, {}), /* @__PURE__ */ jsx(WhatItIs, {}), /* @__PURE__ */ jsx(HowItWorks$1, {}), /* @__PURE__ */ jsx(ExploreFunctionalitiesSection, {}), /* @__PURE__ */ jsx(CalmCTA, {}), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: "Module" }));
const generateCaptchaCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
const page$5 = UNSAFE_withComponentProps(function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: ""
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [captchaCode, setCaptchaCode] = useState(generateCaptchaCode);
  const [captchaInput, setCaptchaInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useEffect(() => {
    if (!showSuccessModal) return void 0;
    const timer = setTimeout(() => {
      setShowSuccessModal(false);
      setSubmitStatus({
        loading: false,
        success: false,
        error: null
      });
    }, 3200);
    return () => clearTimeout(timer);
  }, [showSuccessModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z0-9 ]+$/;
    const phoneRegex = /^[0-9]{6,15}$/;
    const messageRegex = /^[A-Za-z0-9\s]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Name cannot contain special characters."
      });
      return;
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Phone must contain digits only (6-15 digits)."
      });
      return;
    }
    if (formData.message.trim() !== "" && !messageRegex.test(formData.message)) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Message cannot contain special characters."
      });
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Security verification failed. Please enter the captcha correctly."
      });
      setCaptchaCode(generateCaptchaCode());
      setCaptchaInput("");
      return;
    }
    setSubmitStatus({
      loading: true,
      success: false,
      error: null
    });
    try {
      const response = await fetch("/contact-submit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {
          message: "Invalid server response"
        };
      }
      if (response.ok && result.success) {
        setSubmitStatus({
          loading: false,
          success: true,
          error: null
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          website: ""
        });
        setCaptchaInput("");
        setCaptchaCode(generateCaptchaCode());
        setShowSuccessModal(true);
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          error: result.message || "Failed to send message"
        });
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Please try again."
      });
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const captchaDisplay = captchaCode.split("").join(" ");
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("section", {
        className: "w-full py-20 md:py-24 px-6",
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-6xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-center space-y-6 mb-16",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center space-x-2 bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] rounded-full px-4 py-2",
              children: [/* @__PURE__ */ jsx(Mail, {
                size: 14,
                className: "text-[#16A34A] dark:text-[#22C55E]"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-inter font-semibold text-xs text-[#16A34A] dark:text-[#22C55E]",
                children: "Get in Touch"
              })]
            }), /* @__PURE__ */ jsx("h1", {
              className: "font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight",
              children: "Contact Us"
            }), /* @__PURE__ */ jsx("p", {
              className: "font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed max-w-2xl mx-auto",
              children: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "max-w-3xl mx-auto",
            children: [submitStatus.error && /* @__PURE__ */ jsxs("div", {
              className: "mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-600 dark:text-red-400 font-inter text-sm",
              children: ["✗ ", submitStatus.error]
            }), /* @__PURE__ */ jsx("div", {
              className: "bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsxs("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "hidden",
                  "aria-hidden": "true",
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "website",
                    children: "Website"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    id: "website",
                    name: "website",
                    tabIndex: "-1",
                    autoComplete: "off",
                    value: formData.website,
                    onChange: handleChange
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsxs("label", {
                    htmlFor: "name",
                    className: "block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2",
                    children: ["Name ", /* @__PURE__ */ jsx("span", {
                      className: "text-red-500",
                      children: "*"
                    })]
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    id: "name",
                    name: "name",
                    required: true,
                    pattern: "[A-Za-z0-9 ]{2,100}",
                    title: "Use letters, numbers, and spaces only",
                    value: formData.name,
                    onChange: handleChange,
                    placeholder: "Enter Your Name",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsxs("label", {
                    htmlFor: "email",
                    className: "block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2",
                    children: ["Email ", /* @__PURE__ */ jsx("span", {
                      className: "text-red-500",
                      children: "*"
                    })]
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    id: "email",
                    name: "email",
                    required: true,
                    value: formData.email,
                    onChange: handleChange,
                    placeholder: "Your Email",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsxs("label", {
                    htmlFor: "phone",
                    className: "block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2",
                    children: ["Phone Number ", /* @__PURE__ */ jsx("span", {
                      className: "text-red-500",
                      children: "*"
                    })]
                  }), /* @__PURE__ */ jsx("input", {
                    type: "tel",
                    id: "phone",
                    name: "phone",
                    required: true,
                    pattern: "[0-9]{6,15}",
                    title: "Use digits only (6-15)",
                    value: formData.phone,
                    onChange: handleChange,
                    placeholder: "Your Phone Number",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "message",
                    className: "block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2",
                    children: "Your Message"
                  }), /* @__PURE__ */ jsx("textarea", {
                    id: "message",
                    name: "message",
                    rows: "6",
                    value: formData.message,
                    onChange: handleChange,
                    placeholder: "Tell us how we can help you...",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all resize-none"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "rounded-xl border border-[#86efac] dark:border-[#86efac] bg-[#f7fff9] dark:bg-[#f7fff9] p-4",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "font-inter text-sm font-semibold text-[#166534] dark:text-[#166534]",
                    children: "Security Verification"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "mt-1 font-inter text-xs text-[#15803d] dark:text-[#15803d]",
                    children: "Please type the verification code to submit this form."
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "mt-3 flex items-center gap-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "min-w-[190px] rounded-lg border border-[#4ade80] dark:border-[#4ade80] bg-white dark:bg-white px-4 py-3 text-center font-mono text-base sm:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#14532d] dark:text-[#14532d] select-none shadow-sm",
                      children: captchaDisplay
                    }), /* @__PURE__ */ jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setCaptchaCode(generateCaptchaCode());
                        setCaptchaInput("");
                      },
                      className: "inline-flex items-center gap-2 rounded-lg border border-[#22C55E] bg-white dark:bg-white px-3 py-2 font-inter text-sm font-semibold text-[#15803d] dark:text-[#15803d] hover:bg-[#dcfce7] dark:hover:bg-[#dcfce7] transition-colors",
                      children: [/* @__PURE__ */ jsx(RefreshCw, {
                        size: 14
                      }), "Refresh"]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "mt-3",
                    children: [/* @__PURE__ */ jsxs("label", {
                      htmlFor: "captchaInput",
                      className: "block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2",
                      children: ["Enter Verification Code ", /* @__PURE__ */ jsx("span", {
                        className: "text-red-500",
                        children: "*"
                      })]
                    }), /* @__PURE__ */ jsx("input", {
                      type: "text",
                      id: "captchaInput",
                      required: true,
                      autoComplete: "off",
                      value: captchaInput,
                      onChange: (e) => setCaptchaInput(e.target.value.toUpperCase()),
                      placeholder: "Type the code shown above",
                      className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  disabled: submitStatus.loading,
                  className: "w-full inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-base hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 dark:focus:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#22C55E]",
                  children: submitStatus.loading ? /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsxs("svg", {
                      className: "animate-spin h-5 w-5",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      children: [/* @__PURE__ */ jsx("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                      }), /* @__PURE__ */ jsx("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      })]
                    }), /* @__PURE__ */ jsx("span", {
                      children: "Sending..."
                    })]
                  }) : /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx(Send, {
                      size: 20
                    }), /* @__PURE__ */ jsx("span", {
                      children: "Send Message"
                    })]
                  })
                })]
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(Footer, {}), showSuccessModal && /* @__PURE__ */ jsx("div", {
        className: "fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "w-full max-w-md rounded-2xl bg-white dark:bg-[#1E1E1E] p-6 border border-[#22C55E]/40 shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-center mb-4",
            children: /* @__PURE__ */ jsx("div", {
              className: "rounded-full bg-[#DCFCE7] dark:bg-[#14532d] p-3",
              children: /* @__PURE__ */ jsx(CircleCheckBig, {
                size: 30,
                className: "text-[#16A34A] dark:text-[#86efac]"
              })
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-center font-plus-jakarta-sans text-2xl font-bold text-[#111111] dark:text-white",
            children: "Message Sent Successfully"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-3 text-center font-inter text-sm text-[#525252] dark:text-white/70 leading-relaxed",
            children: "Thank you for contacting SOHUB Connect. Our team will review your message and get back to you shortly."
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => {
              setShowSuccessModal(false);
              setSubmitStatus({
                loading: false,
                success: false,
                error: null
              });
            },
            className: "mt-6 w-full rounded-full bg-[#22C55E] px-6 py-3 font-inter font-semibold text-white hover:bg-[#16A34A] transition-colors",
            children: "Close"
          })]
        })
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: "Module" }));
const page$4 = UNSAFE_withComponentProps(function Documentation() {
  const [bgColor, setBgColor] = useState("white");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    voice: true,
    pbx: true
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [hotScanCallTrigger, setHotScanCallTrigger] = useState(0);
  const [hotScanCallActive, setHotScanCallActive] = useState(false);
  const isLightMode = bgColor === "white";
  const THEME_KEY2 = "themeMode";
  const LEGACY_THEME_KEY2 = "headerBgColor";
  const normalizeTheme2 = (value) => {
    if (value === "light" || value === "white") return "white";
    if (value === "dark" || value === "default") return "default";
    return "white";
  };
  const applyTheme = (color) => {
    const light = color === "white";
    document.documentElement.classList.toggle("light-mode", light);
    document.documentElement.classList.toggle("dark", !light);
    document.documentElement.style.colorScheme = light ? "light" : "dark";
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY2);
    const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY2);
    const resolved = normalizeTheme2(savedTheme || legacyTheme);
    setBgColor(resolved);
    applyTheme(resolved);
  }, []);
  useEffect(() => {
    if (!activeImage) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeImage]);
  useEffect(() => {
    if (hotScanCallTrigger === 0) return;
    setHotScanCallActive(true);
    const timer = window.setTimeout(() => {
      setHotScanCallActive(false);
    }, 5200);
    return () => {
      window.clearTimeout(timer);
    };
  }, [hotScanCallTrigger]);
  const allSections = [{
    id: "dashboard",
    title: "Dashboard"
  }, {
    id: "operator-panel",
    title: "Operator Panel"
  }, {
    id: "Phones",
    title: "Phone"
  }, {
    id: "ring-group",
    title: "Ring Group"
  }, {
    id: "sound-files",
    title: "Sound Files"
  }, {
    id: "call-flow",
    title: "Call Flow"
  }, {
    id: "click-to-connect",
    title: "Click to Connect"
  }, {
    id: "hotscan",
    title: "HotScan"
  }, {
    id: "call-reports",
    title: "Call Reports"
  }, {
    id: "tickets",
    title: "Tickets"
  }, {
    id: "wallet",
    title: "Wallet"
  }, {
    id: "softphone",
    title: "Get SoftPhone"
  }];
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = allSections.filter((section) => section.title.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(filtered);
  };
  const sections = [{
    id: "dashboard",
    title: "Dashboard",
    icon: Monitor
  }, {
    id: "voice",
    title: "Voice",
    icon: Phone,
    children: [{
      id: "pbx",
      title: "PBX",
      icon: Router,
      children: [{
        id: "operator-panel",
        title: "Operator Panel",
        icon: Headset
      }, {
        id: "Phones",
        title: "Phone",
        icon: Users
      }, {
        id: "ring-group",
        title: "Ring Group",
        icon: Users
      }]
    }, {
      id: "sound-files",
      title: "Sound Files",
      icon: Volume2
    }, {
      id: "call-flow",
      title: "Call Flow",
      icon: Settings
    }]
  }, {
    id: "click-to-connect",
    title: "Click To Connect",
    icon: MousePointer
  }, {
    id: "hotscan",
    title: "Hotscan",
    icon: Zap
  }, {
    id: "call-reports",
    title: "Call Reports",
    icon: BarChart3
  }, {
    id: "tickets",
    title: "Tickets",
    icon: Ticket
  }, {
    id: "wallet",
    title: "Wallet",
    icon: Wallet
  }, {
    id: "softphone",
    title: "Get SoftPhone",
    icon: Download
  }];
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const toggleBgColor = () => {
    const newColor = bgColor === "default" ? "white" : "default";
    setBgColor(newColor);
    localStorage.setItem(LEGACY_THEME_KEY2, newColor);
    localStorage.setItem(THEME_KEY2, newColor === "white" ? "light" : "dark");
    applyTheme(newColor);
  };
  const handleDocContentClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    setActiveImage({
      src: target.currentSrc || target.src,
      alt: target.alt || "Documentation image"
    });
  };
  const renderTreeItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isActive = activeSection === item.id;
    const paddingLeft = level * 12 + 8;
    return /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("div", {
        className: `flex items-center py-2 px-3 rounded cursor-pointer transition-colors text-sm font-semibold ${isActive ? isLightMode ? "bg-[#e5e7eb] text-[#1f2937] ring-1 ring-[#d1d5db]" : "bg-[#2d334a] text-[#e8eaed] ring-1 ring-[#4b5563]" : isLightMode ? "text-[#334155] hover:bg-[#f1f5f9]" : "text-[#e5e7eb] hover:bg-[#2d334a]"}`,
        style: {
          paddingLeft: `${paddingLeft}px`
        },
        onClick: () => {
          if (hasChildren) {
            toggleSection(item.id);
          } else {
            selectSection(item.id);
          }
        },
        children: [Icon && /* @__PURE__ */ jsx(Icon, {
          className: "w-4 h-4 mr-2 flex-shrink-0"
        }), /* @__PURE__ */ jsx("span", {
          className: "flex-1",
          children: item.title
        }), hasChildren && /* @__PURE__ */ jsx("div", {
          className: "p-1",
          children: isExpanded ? /* @__PURE__ */ jsx(ChevronDown, {
            className: "w-3.5 h-3.5"
          }) : /* @__PURE__ */ jsx(ChevronRight, {
            className: "w-3.5 h-3.5"
          })
        })]
      }), hasChildren && isExpanded && /* @__PURE__ */ jsx("div", {
        className: "mt-1 space-y-0.5",
        children: item.children.map((child) => renderTreeItem(child, level + 1))
      })]
    }, item.id);
  };
  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Dashboard"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-[#5f6368] dark:text-[#9aa0a6] mb-12 leading-relaxed",
            children: "The Dashboard is where everything in SOHUB Connect comes together."
          }), /* @__PURE__ */ jsx("div", {
            className: "prose prose-lg max-w-none",
            children: /* @__PURE__ */ jsxs("div", {
              className: "space-y-10",
              children: [/* @__PURE__ */ jsx("section", {
                children: /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-0",
                  children: "It gives you a live snapshot of your communication setup — what's active, what's available, and what you can do next."
                })
              }), /* @__PURE__ */ jsxs("section", {
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4",
                  children: "Top Summary Cards"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4",
                  children: "At the top of the Dashboard, you'll see a quick system summary."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-disc pl-6 mb-4 space-y-2",
                  children: [/* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Click to Connect — active widgets and calling entry points"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "HotScan — active QR-based calling profiles"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Phone Accounts — configured Phones available for calling"
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-0",
                  children: 'This section answers one question instantly: "Is my system ready to receive calls right now?"'
                })]
              }), /* @__PURE__ */ jsx("section", {
                children: /* @__PURE__ */ jsx("img", {
                  src: "/images/user_manual/dashboard.png",
                  alt: "Dashboard Overview",
                  className: "w-full rounded-lg shadow-md mb-0"
                })
              }), /* @__PURE__ */ jsxs("section", {
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4",
                  children: "Click to Connect"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4",
                  children: "Click to Connect enables instant voice conversations from the internet."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-disc pl-6 mb-0 space-y-2",
                  children: [/* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Create new Click to Connect buttons"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Assign call flows"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Generate embed scripts for websites or apps"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Manage who receives calls"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("section", {
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4",
                  children: "HotScan"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4",
                  children: "HotScan enables QR-based calling — no phone numbers required."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-disc pl-6 mb-0 space-y-2",
                  children: [/* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Product packaging"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Business cards"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Flyers and brochures"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Physical locations"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("section", {
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-2xl font-normal text-[#202124] dark:text-[#e8eaed] mt-0 mb-4",
                  children: "Phone"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7 mb-4",
                  children: "Phone is where you manage call-ready Phone accounts."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-disc pl-6 mb-0 space-y-2",
                  children: [/* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Add new Phone accounts"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Manage existing Phone accounts"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Control active/inactive Phone status"
                  }), /* @__PURE__ */ jsx("li", {
                    className: "text-[#202124] dark:text-[#e8eaed] text-base leading-7",
                    children: "Prepare users to receive calls"
                  })]
                })]
              }), /* @__PURE__ */ jsx("section", {
                children: /* @__PURE__ */ jsx("div", {
                  className: "bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg p-6",
                  children: /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6] text-base text-center m-0",
                    children: "Start simple. Expand when ready. Conversations come first."
                  })
                })
              })]
            })
          })]
        });
      case "operator-panel":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Operator Panel"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-[#3c4043] dark:text-[#bdc1c6] mb-8 leading-7",
            children: "Manage live calls with Operator Panel"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "What you're trying to do"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#3c4043] dark:text-[#bdc1c6] mb-2",
                children: "See who is available to receive calls and monitor live calling status in real time."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6]",
                children: "The Operator Panel shows all your extensions and their current state."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "When to use Operator Panel"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#3c4043] dark:text-[#bdc1c6] mb-2",
                children: "Use the Operator Panel when you want to:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-[#3c4043] dark:text-[#bdc1c6]",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Check who is online or idle"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Know who is unavailable"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Monitor call readiness before routing calls"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mt-3 italic",
                children: "You don't configure anything here. This page is for visibility only."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "What you'll see on the screen"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/operator_panel.png",
                alt: "Operator Panel",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-[#202124] dark:text-[#e8eaed] mb-2",
                    children: "Search bar"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6]",
                    children: "Use the search field to quickly find extensions or users."
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-[#202124] dark:text-[#e8eaed] mb-2",
                    children: "Status tabs"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6] mb-2",
                    children: "The panel provides these tabs:"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: "• Available"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Unavailable"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• All Phones"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-[#202124] dark:text-[#e8eaed] mb-2",
                    children: "Auto Refresh"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6]",
                    children: "Auto Refresh keeps statuses updated in real time without manually reloading the page."
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-[#202124] dark:text-[#e8eaed] mb-2",
                    children: "Phone cards"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6] mb-2",
                    children: "Each card displays:"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: "• Extension or destination number"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Status badge (for example: UNAVAILABLE)"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• User name"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Channel type tag (Phone / Click to Connect / Hotscan)"
                    })]
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-[#5f6368] dark:text-[#9aa0a6] mt-2",
                    children: "Use these details to understand who can receive calls and through which channel."
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "What you don't do here"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mb-2",
                children: "The Operator Panel is not used to:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-[#3c4043] dark:text-[#bdc1c6]",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Create extensions"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assign call flows"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Change routing rules"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] text-sm mt-2",
                children: "Those actions are done in other Voice sections."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "Quick checklist"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mb-2",
                children: "If calls aren't connecting as expected:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-[#3c4043] dark:text-[#bdc1c6]",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Open Operator Panel"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Check Available and Unavailable counts"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Verify status badges on Phone cards"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Make sure users are online and SoftPhone is running"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• If extensions are unavailable, calls cannot be received"
                })]
              })]
            })]
          })]
        });
      case "Phones":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Phone"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-[#3c4043] dark:text-[#bdc1c6] mb-8 leading-7",
            children: "Create users who can make and receive calls"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "Open Phone"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-[#3c4043] dark:text-[#bdc1c6] mb-2",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Voice → PBX → Phone"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mb-2",
                children: "You will see two tabs:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-[#3c4043] dark:text-[#bdc1c6] ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phones"
                  }), " – View and manage existing Phones"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Add Phone"
                  }), " – Create a new Phone"]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "View all Phones"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mb-3",
                children: ["In the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Phones"
                }), " tab, you can search, manage, renew, activate, or delete Phones."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/phone_list.png",
                alt: "Phone List",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-sm text-[#5f6368] dark:text-[#9aa0a6]",
                children: ["If a Phone is suspended, the action changes from ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Renew"
                }), " to ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Activate"
                }), " so you can re-enable it from the list."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "Add a new Phone"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6] mb-4",
                children: ["To create a new Phone, go to the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Add Phone"
                }), " tab."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/add_phone.png",
                alt: "Add Phone",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("div", {
                className: "p-3 rounded-lg bg-[#f1f3f4] dark:bg-[#3c4043]",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-[#202124] dark:text-[#e8eaed] mb-1 font-medium",
                  children: "Billing note"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#5f6368] dark:text-[#9aa0a6] text-sm m-0",
                  children: "Up to 5 Phone creations are free for lifetime. After the first 5, additional Phones require a billing term (Monthly or Yearly)."
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 sm:p-4 mb-4",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-slate-900 dark:text-white mb-3",
                  children: "Video Guide: Create Phone"
                }), /* @__PURE__ */ jsx("video", {
                  controls: true,
                  playsInline: true,
                  preload: "metadata",
                  className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black",
                  children: /* @__PURE__ */ jsx("source", {
                    src: "/images/user_manual/videos/add_phones.mp4",
                    type: "video/mp4"
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-4 p-3 bg-[#f1f3f4] dark:bg-[#3c4043] rounded-lg",
                children: [/* @__PURE__ */ jsxs("p", {
                  className: "text-[#202124] dark:text-[#e8eaed]",
                  children: ["Fill in the required fields, then click ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Create Phone"
                  }), "."]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[#5f6368] dark:text-[#9aa0a6] text-sm",
                  children: "The Phone will be created and activated immediately."
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#202124] dark:text-[#e8eaed] mb-3",
                children: "Manage, Renew, Activate"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-[#5f6368] dark:text-[#9aa0a6]",
                children: ["Use ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Manage"
                }), " to open details. Use ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Renew"
                }), " to select Monthly/Yearly. If suspended, use ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Activate"
                }), " from the same row."]
              })]
            })]
          })]
        });
      case "sound-files":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Sounds"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Upload and manage audio for IVR, announcements, and prompts"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Open Sounds"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Voice → Sound Files"
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-0",
                children: ["You will see two tabs: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Sound Files"
                }), " and ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Add Sound File"
                }), "."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Add a Sound File"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Add Sound File"
                }), " tab, enter the name, upload the audio file, then click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Save"
                }), "."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/add_sound_file.png",
                alt: "Add Sound File",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Fields shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Sound Name"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Audio File"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Supported formats: MP3, WAV (auto-converts to 8kHz 16-bit Mono WAV)"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Sound Files List"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Sound Files"
                }), " tab, you can search and manage uploaded sound files."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/sound_file_list.png",
                alt: "Sound Files List",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Created Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Sound Name"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Sound File (player)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assigned User"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Status"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Verify"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Action (Delete)"
                })]
              })]
            })]
          })]
        });
      case "call-flow":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Call Flow"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Create and manage call routing flows"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Open Call Flow"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Voice → Call Flow"
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-0",
                children: ["Tabs: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Call Flow List"
                }), ", ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create Call Flow"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Call Flow List"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: "The list shows all created call flows. You can search and manage them."
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/call_flow_list.png",
                alt: "Call Flow List",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Sl"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Date Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Name"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Flow Code"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assigned To"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Action (Edit, Delete)"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Create Call Flow"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create Call Flow"
                }), ", enter a ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Flow Name"
                }), ", click", " ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Insert step here"
                }), ", select a step, then click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Save"
                }), "."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/add_call_flow.png",
                alt: "Create Call Flow",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("div", {
                className: "rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 sm:p-4 mt-4",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-slate-900 dark:text-white mb-3",
                  children: "Video Guide: Create Call Flow"
                }), /* @__PURE__ */ jsx("video", {
                  controls: true,
                  playsInline: true,
                  preload: "metadata",
                  className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black",
                  children: /* @__PURE__ */ jsx("source", {
                    src: "/images/user_manual/videos/call_flow.mp4",
                    type: "video/mp4"
                  })
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Steps shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Start Call Flow: Input Flow Name"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Insert step here"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Choose a step: Playback, Dial, Menu, Hangup"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Save"
                })]
              })]
            })]
          })]
        });
      case "click-to-connect":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Click to Connect"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Turn website intent into real conversation."
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsx("section", {
              children: /* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-4",
                children: "Click to Connect lets visitors start a voice call instantly from your website. One click triggers your configured call flow and routes the call to the right team."
              })
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Animated Demo Flow"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-4",
                children: ["Demo sequence: cursor moves to call button, opens confirmation popup, clicks ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Yes"
                }), ", then call state changes to ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Calling..."
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "docs-c2c-demo-shell bg-gradient-doc-modal",
                children: /* @__PURE__ */ jsxs("article", {
                  className: "docs-c2c-demo-browser bg-gradient-doc-modal",
                  children: [/* @__PURE__ */ jsxs("header", {
                    className: "docs-c2c-demo-topbar bg-gradient-doc-modal",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "docs-c2c-dot bg-[#f87171]"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "docs-c2c-dot bg-[#fbbf24]"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "docs-c2c-dot bg-[#34d399]"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "flex-1 min-w-0 truncate text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 ml-2 mb-0",
                      children: "https://your-site.example"
                    })]
                  }), /* @__PURE__ */ jsxs("main", {
                    className: "docs-c2c-demo-page bg-gradient-doc-modal",
                    children: [/* @__PURE__ */ jsx("h4", {
                      className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1",
                      children: "Website Home Page"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-0",
                      children: "Visitors browse the page and can start a call instantly."
                    })]
                  }), /* @__PURE__ */ jsxs("button", {
                    type: "button",
                    className: "docs-c2c-call-btn keep-white-text",
                    "aria-label": "Call button demo",
                    children: [/* @__PURE__ */ jsx(Phone, {
                      className: "docs-c2c-call-icon docs-c2c-call-icon-idle w-5 h-5"
                    }), /* @__PURE__ */ jsx(PhoneCall, {
                      className: "docs-c2c-call-icon docs-c2c-call-icon-calling w-5 h-5"
                    })]
                  }), /* @__PURE__ */ jsx("span", {
                    className: "docs-c2c-ripple docs-c2c-ripple-a"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "docs-c2c-ripple docs-c2c-ripple-b"
                  }), /* @__PURE__ */ jsxs("aside", {
                    className: "docs-c2c-confirm-popup bg-gradient-doc-modal",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-xs sm:text-sm font-medium text-slate-900 dark:text-white mb-3",
                      children: "Do you want to call?"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center justify-end gap-2",
                      children: [/* @__PURE__ */ jsx("button", {
                        type: "button",
                        className: "docs-c2c-popup-btn docs-c2c-popup-no",
                        children: "No"
                      }), /* @__PURE__ */ jsx("button", {
                        type: "button",
                        className: "docs-c2c-popup-btn docs-c2c-popup-yes keep-white-text",
                        children: "Yes"
                      })]
                    })]
                  }), /* @__PURE__ */ jsx("span", {
                    className: "docs-c2c-cursor"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "docs-c2c-click-pulse"
                  })]
                })
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Before You Begin"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: "Configure these first:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phones"
                  }), " for users/devices who receive calls"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Ring Group"
                  }), " to define call distribution strategy"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Call Flow"
                  }), " to route calls (Ring Group/IVR/Queue/Phone/Voicemail)"]
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-600 dark:text-gray-400 mt-3",
                children: "Example: Support Team -> Phones 101, 102, 103"
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "How This Connects to Click to Connect"
              }), /* @__PURE__ */ jsxs("div", {
                className: "docs-c2c-flow-card relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-5 sm:p-6 shadow-[0_12px_34px_rgba(15,23,42,0.10)]",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "docs-c2c-glow pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-200/35 dark:bg-blue-500/20 blur-2xl"
                }), /* @__PURE__ */ jsx("div", {
                  className: "docs-c2c-glow pointer-events-none absolute -bottom-14 -left-16 w-40 h-40 rounded-full bg-indigo-200/35 dark:bg-indigo-500/20 blur-2xl"
                }), /* @__PURE__ */ jsxs("p", {
                  className: "relative text-sm text-slate-600 dark:text-slate-300 mb-5",
                  children: ["When a visitor clicks, the request follows this exact routing path:", /* @__PURE__ */ jsx("span", {
                    className: "block mt-1 font-medium text-slate-800 dark:text-slate-100",
                    children: "Visitor Click -> Widget -> Call Flow -> Ring Group -> Phones"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "relative flex flex-col xl:flex-row items-stretch xl:items-center gap-3",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5",
                        children: "01"
                      }), /* @__PURE__ */ jsx(MousePointer, {
                        className: "w-4 h-4 text-blue-600 dark:text-blue-300"
                      })]
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm font-semibold text-slate-900 dark:text-white",
                      children: "Visitor Click"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                      children: "Customer taps the call button"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-connector flex justify-center xl:justify-start",
                    children: [/* @__PURE__ */ jsx(ChevronDown, {
                      className: "w-4 h-4 text-slate-400 xl:hidden"
                    }), /* @__PURE__ */ jsx(ChevronRight, {
                      className: "w-4 h-4 text-slate-400 hidden xl:block"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5",
                        children: "02"
                      }), /* @__PURE__ */ jsx(Code, {
                        className: "w-4 h-4 text-blue-600 dark:text-blue-300"
                      })]
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm font-semibold text-slate-900 dark:text-white",
                      children: "Click to Connect Widget"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                      children: "The widget forwards the request to routing"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-connector flex justify-center xl:justify-start",
                    children: [/* @__PURE__ */ jsx(ChevronDown, {
                      className: "w-4 h-4 text-slate-400 xl:hidden"
                    }), /* @__PURE__ */ jsx(ChevronRight, {
                      className: "w-4 h-4 text-slate-400 hidden xl:block"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5",
                        children: "03"
                      }), /* @__PURE__ */ jsx(Settings, {
                        className: "w-4 h-4 text-blue-600 dark:text-blue-300"
                      })]
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm font-semibold text-slate-900 dark:text-white",
                      children: "Call Flow"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                      children: "Routing logic determines the destination"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-connector flex justify-center xl:justify-start",
                    children: [/* @__PURE__ */ jsx(ChevronDown, {
                      className: "w-4 h-4 text-slate-400 xl:hidden"
                    }), /* @__PURE__ */ jsx(ChevronRight, {
                      className: "w-4 h-4 text-slate-400 hidden xl:block"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-step flex-1 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white/90 dark:bg-slate-800/80 backdrop-blur p-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold px-1.5",
                        children: "04"
                      }), /* @__PURE__ */ jsx(Route, {
                        className: "w-4 h-4 text-blue-600 dark:text-blue-300"
                      })]
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm font-semibold text-slate-900 dark:text-white",
                      children: "Ring Group"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                      children: "Team members are selected by strategy"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-connector flex justify-center xl:justify-start",
                    children: [/* @__PURE__ */ jsx(ChevronDown, {
                      className: "w-4 h-4 text-slate-400 xl:hidden"
                    }), /* @__PURE__ */ jsx(ChevronRight, {
                      className: "w-4 h-4 text-slate-400 hidden xl:block"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "docs-c2c-flow-step docs-c2c-flow-step-final flex-1 rounded-xl border border-emerald-200/80 dark:border-emerald-700 bg-emerald-50/70 dark:bg-emerald-900/20 p-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "keep-white-text inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-semibold px-1.5",
                        children: "05"
                      }), /* @__PURE__ */ jsx(Users, {
                        className: "w-4 h-4 text-emerald-600 dark:text-emerald-300"
                      })]
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm font-semibold text-slate-900 dark:text-white",
                      children: "Phones"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                      children: "Agents receive and answer the call"
                    })]
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Create a Widget (3 Steps)"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Dashboard → Click to Connect → Create Click to Connect"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-8",
                children: [/* @__PURE__ */ jsxs("section", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-gray-900 dark:text-white mb-2",
                    children: "Connect List"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-2",
                    children: "The main list shows all created Click to Connect widgets."
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-2",
                    children: "Columns shown:"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: "• Created Time"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Due Date"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Status"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Connect Name"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Phone"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Call Flow"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Assigned User"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Embed Code (View Script)"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Renew / Activate"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Action (Edit, Delete)"
                    })]
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400 mt-3",
                    children: "Up to 5 widget creations are free for lifetime. After the first 5, additional widgets require a billing term (Monthly or Yearly)."
                  })]
                }), /* @__PURE__ */ jsxs("section", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-gray-900 dark:text-white mb-2",
                    children: "Step 1: Basic Info"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-3",
                    children: ["Enter ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Widget Name"
                    }), " and select ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Hotline"
                    }), ", then click ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Next"
                    }), "."]
                  }), /* @__PURE__ */ jsx("img", {
                    src: "/images/user_manual/add_click_to_connect_step_1.png",
                    alt: "Click to Connect Step 1",
                    className: "w-full rounded-lg shadow-md"
                  })]
                }), /* @__PURE__ */ jsxs("section", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-gray-900 dark:text-white mb-2",
                    children: "Step 2: Styling & Preview"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-3",
                    children: ["Customize the widget states (", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Initial"
                    }), ", ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Dialing"
                    }), ", ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Calling"
                    }), ", ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "End Call"
                    }), ") and check the preview, then click ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Next"
                    }), "."]
                  }), /* @__PURE__ */ jsx("img", {
                    src: "/images/user_manual/add_c2c_step_2.png",
                    alt: "Click to Connect Step 2",
                    className: "w-full rounded-lg shadow-md"
                  })]
                }), /* @__PURE__ */ jsxs("section", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-medium text-gray-900 dark:text-white mb-2",
                    children: "Step 3: Preview & Submit"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600 dark:text-gray-400 mb-3",
                    children: ["Review the live preview, then click ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Submit"
                    }), "."]
                  }), /* @__PURE__ */ jsx("img", {
                    src: "/images/user_manual/add_c2c_step_3.png",
                    alt: "Click to Connect Step 3",
                    className: "w-full rounded-lg shadow-md"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-slate-900 dark:text-white mb-3",
                  children: "Video Guide: Create Click to Connect"
                }), /* @__PURE__ */ jsxs("video", {
                  controls: true,
                  playsInline: true,
                  preload: "metadata",
                  className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black",
                  children: [/* @__PURE__ */ jsx("source", {
                    src: "/images/user_manual/videos/click_to_connect.mp4",
                    type: "video/mp4"
                  }), "Your browser does not support the video tag."]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "View Script (Embed Code)"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In the list, click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "View Script"
                }), " to open the embed code modal."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/website/script.png",
                alt: "Widget Embed Code Modal",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["• Copy the script and paste it into your website HTML, just before the closing ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "</body>"
                  }), " tag"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• This widget only works on ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "HTTPS"
                  }), " websites (WebRTC security requirement)"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• Use ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Copy Code"
                  }), " to copy the script"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• The modal also shows the ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Widget ID"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Important Notes"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-gray-700 dark:text-gray-300",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Select a Hotline and Call Flow before creating a widget"
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• If a widget is suspended, the row shows ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Activate"
                  }), " instead of Renew"]
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 text-center italic",
                children: "When interest appears, conversation should already be waiting."
              })
            })]
          })]
        });
      case "hotscan":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "HotScan"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Turn scans into conversations."
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-4",
                children: "HotScan lets customers connect with your business instantly by scanning a QR code."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: "No phone numbers. No typing. Just Scan -> Connect -> Talk."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Perfect for offline and physical touchpoints:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Posters"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Product packaging"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Storefronts"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Invoices"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Delivery slips"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Print materials"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-3 italic",
                children: "If Click to Connect is for websites, HotScan is for the real world."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Before You Create HotScan"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Make sure these are set up first:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phones"
                  }), " (users/devices who will receive calls)"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Ring Group"
                  }), " (optional, recommended for teams)"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Call Flow"
                  }), " (routes HotScan calls to Ring Group/Phone)"]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "HotScan Profiles"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: "HotScan Profiles are the QR widgets you create and manage."
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/hotscan_list.png",
                alt: "HotScan Profiles List",
                className: "w-full max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: ["Tabs: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "HotScan Profiles"
                }), ", ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create QR"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Logo"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Created On"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Due Date"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Widget Name"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Call Flow"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Phone"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Status"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assigned To"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Renew / Activate"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Action (View QR, Edit, Delete)"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-3",
                children: "Free up to 5 profile creations, lifetime. After the first 5, additional profiles require a billing term (Monthly or Yearly)."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Create QR (Add Profile)"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: ["Use ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create QR"
                }), " to create a new HotScan profile."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/add_hotscan.png",
                alt: "HotScan Add Profile",
                className: "w-full max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-4 cursor-zoom-in"
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-slate-900 dark:text-white mb-3",
                  children: "Video Guide: Create HotScan"
                }), /* @__PURE__ */ jsx("video", {
                  controls: true,
                  playsInline: true,
                  preload: "metadata",
                  className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-black",
                  children: /* @__PURE__ */ jsx("source", {
                    src: "/images/user_manual/videos/hotscan.mp4",
                    type: "video/mp4"
                  })
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Widget Information (Required):"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Logo *"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Display Name *"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Sub Heading"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Call Flow *"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Optional sections:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Company Information (Optional)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Social Media (Optional)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• QR Reference (Optional): Generate New QR Reference (reuse for already printed posters)"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Billing:"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-0",
                children: "Free up to 5 creations, lifetime."
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-0",
                children: ["Live Preview (right side) shows your logo, business name, sub heading, and the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Start Call"
                }), " button."]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 text-center italic",
                children: "When intent is physical, connection should be instant."
              })
            })]
          })]
        });
      case "call-reports":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Call Detail Record"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Search and review call history"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Open Call Detail Record"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Reports → Call Reports"
                })]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/call_report.png?v=2",
                alt: "Call Detail Record",
                className: "w-full rounded-lg shadow-md mb-4"
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Filter by Date Range"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: ["Select the date range from the picker, then click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Filter"
                }), "."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "CDR Summary"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Date Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Calls"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Answer"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Busy"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Congestion"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• No Answer"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "CDR Details"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Filters shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["• Disposition dropdown (example: ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "All"
                  }), ")"]
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Search box"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Date Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Caller"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Destination"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Duration"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Disposition"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Recording"
                })]
              })]
            })]
          })]
        });
      case "tickets":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Tickets"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Create and track support requests"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Open Tickets"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-0",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Dashboard → Tickets"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Tickets List"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["Tabs: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Tickets"
                }), ", ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create Ticket"
                })]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/ticket_list.png",
                alt: "Tickets List",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Filters shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Ticket ID"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Date range (From, To)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Search button"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Reset button"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Table controls:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Rows per page"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Search box (top-right)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Pagination"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Created Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Ticket Id"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Ticket Type"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Description"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Comment"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assigned User"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Status (Open, Closed)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Action (View)"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Create a Ticket"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["Open ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create Ticket"
                }), ", fill the form, then click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Save"
                }), "."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/create_ticket.png",
                alt: "Create Ticket",
                className: "w-full max-w-3xl rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Support Commitment: support resolves tickets within 24 hours."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Fields shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Ticket Type *"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Description *"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Save"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-4 mb-2",
                children: "Ticket Type options:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Bug Report"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Feature Request"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Technical Support"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Account Issue"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Billing Inquiry"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 text-center italic",
                children: "Good support feels quiet — because it works."
              })
            })]
          })]
        });
      case "ring-group":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Ring Group"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Route calls to teams, not just individuals."
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Open Ring Group"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Voice → PBX → Ring Group"
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-0",
                children: ["You will see two tabs: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Ring Groups"
                }), " and ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Add Ring Group"
                }), "."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Ring Groups List"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Ring Groups"
                }), " tab, you can view, search, edit, or delete ring groups."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/ring_group_list.png",
                alt: "Ring Groups List",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Columns shown:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Created Time"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Group Number"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Group Description"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Assigned To"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Status"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Action (Edit / Delete)"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Create a Ring Group"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["In the ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Add Ring Group"
                }), " tab, fill in the form and click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Create Ring Group"
                }), "."]
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/add_ring_group.png",
                alt: "Add Ring Group",
                className: "w-full rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3 sm:p-4",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-slate-900 dark:text-white mb-3",
                  children: "Video Guide: Create Ring Group"
                }), /* @__PURE__ */ jsx("video", {
                  src: "/images/user_manual/videos/ring_group.mp4",
                  controls: true,
                  playsInline: true,
                  preload: "metadata",
                  className: "w-full rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm",
                  children: "Your browser does not support the video tag."
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-2",
                children: "Fields shown:"
              }), /* @__PURE__ */ jsxs("ol", {
                className: "space-y-2 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["1. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Group Description"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["2. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phone List"
                  }), " (or ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Select Phones"
                  }), ")"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["3. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Ring Strategy"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["4. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Ring Time"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["5. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Music On Hold"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["6. ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Ring Group Status"
                  })]
                })]
              })]
            })]
          })]
        });
      case "wallet":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Wallet"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Top up your balance and track payments."
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsx("section", {
              children: /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-4",
                children: ["Wallet shows your ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Remaining Balance"
                }), " and lets you ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Topup Now"
                }), "."]
              })
            }), /* @__PURE__ */ jsx("section", {
              children: /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/wallet.png",
                alt: "Wallet page",
                className: "w-full rounded-lg shadow-md"
              })
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Top Up Balance"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Dashboard → Wallet"
                })]
              }), /* @__PURE__ */ jsxs("ol", {
                className: "space-y-2 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["1. Click ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Topup Now"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["2. In ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Make Payment"
                  }), ", select a payment method:"]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "bKash Mobile Banking"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "SSL Commerce"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["3. Enter the ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Amount"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["4. Click ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Proceed To Payment"
                  }), " and complete the checkout"]
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Payment Logs"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-2",
                children: ["Click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "View Logs"
                }), " to check your payment history."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Important Notes"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-gray-700 dark:text-gray-300",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Balance updates after a successful payment."
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["• Use ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Payment Logs"
                  }), " if a top up is not reflected yet."]
                })]
              })]
            })]
          })]
        });
      case "softphone":
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-[2.75rem] font-normal text-[#202124] dark:text-[#e8eaed] mb-4 leading-tight",
            children: "Get SoftPhone"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 dark:text-gray-400 mb-8",
            children: "Download. Register. Start calling."
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8",
            children: [/* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-4",
                children: "The SoftPhone application lets you make and receive calls directly from your device using your Sohub Connect Phone."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 italic",
                children: "No desk phone needed. Just install, register, and talk."
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "What You Need"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• A created Phone (from Voice → PBX → Phones)"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Phone number and password"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Internet connection"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Download SoftPhone"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: ["Navigate to: ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Dashboard → Get SoftPhone"
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: ["Click ", /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Download"
                }), " to get the Windows application or use your IP phone."]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Register Your Phone"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/softphone1.png",
                alt: "SoftPhone Registration",
                className: "w-full max-w-xs sm:max-w-none sm:w-[30%] mx-auto rounded-lg shadow-md mb-4"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-700 dark:text-gray-300 mb-3",
                children: "After installing the SoftPhone:"
              }), /* @__PURE__ */ jsxs("ol", {
                className: "space-y-2 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "1. Open the application"
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["2. Enter your ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phone Number"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["3. Enter your ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Phone Password"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["4. Click ", /* @__PURE__ */ jsx("span", {
                    className: "font-medium",
                    children: "Register"
                  })]
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mt-3",
                children: `Once registered, your Phone status will show as "Online" and you're ready to make and receive calls.`
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/user_manual/softphone2.png",
                alt: "SoftPhone Online Status",
                className: "w-full max-w-xs sm:max-w-none sm:w-[25%] mx-auto rounded-lg shadow-md mb-4"
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "What You Can Do"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-1 text-gray-700 dark:text-gray-300 ml-4",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Make outbound calls"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Receive inbound calls"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Transfer calls"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Hold and resume calls"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• View call history"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Manage contacts"
                })]
              })]
            }), /* @__PURE__ */ jsxs("section", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-3",
                children: "Important Notes"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2 text-gray-700 dark:text-gray-300",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Phone must be active to register"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• One Phone can be registered on multiple devices"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Stable internet connection is required for call quality"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 text-center italic",
                children: "Your Phone. Your device. Anywhere."
              })
            })]
          })]
        });
      default:
        return /* @__PURE__ */ jsxs("div", {
          className: "text-center py-12",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
            children: "Section Coming Soon"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400",
            children: "This section is under development. Please check back later."
          })]
        });
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `docs-page relative min-h-screen transition-colors ${isLightMode ? "docs-light bg-[#f8fafc]" : "docs-dark bg-[#242839] dark:bg-[#242839]"}`,
    children: [/* @__PURE__ */ jsx("nav", {
      className: `fixed top-0 left-0 right-0 z-50 border-b h-16 transition-colors ${isLightMode ? "bg-white/95 border-[#e2e8f0]" : "bg-[#1a1928] dark:bg-[#1a1928] border-[#5f6368]"}`,
      children: /* @__PURE__ */ jsxs("div", {
        className: "h-full px-4 flex items-center justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2 sm:gap-4 flex-1 min-w-0",
          children: [/* @__PURE__ */ jsx("button", {
            onClick: () => setSidebarOpen(!sidebarOpen),
            className: `lg:hidden shrink-0 p-2 rounded-lg transition-colors ${isLightMode ? "hover:bg-[#e5e7eb]" : "hover:bg-[#3c4043]"}`,
            children: /* @__PURE__ */ jsx(Menu, {
              className: `w-5 h-5 ${isLightMode ? "text-[#334155]" : "text-[#9aa0a6]"}`
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: `docs-nav-title text-sm sm:text-lg font-bold truncate ${isLightMode ? "text-[#0f172a]" : "text-white dark:text-white"}`,
            children: "SOHUB Connect Docs"
          }), /* @__PURE__ */ jsx("div", {
            className: "docs-nav-search-wrap flex-1 min-w-0 max-w-[10.5rem] sm:max-w-xs ml-2 sm:ml-8",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative cursor-pointer",
              onClick: () => setSearchModalOpen(true),
              children: [/* @__PURE__ */ jsx(Search, {
                className: `absolute left-3 top-1/2 -translate-y-1/2 z-10 w-4 h-4 pointer-events-none ${isLightMode ? "text-[#334155]" : "text-[#9aa0a6]"}`
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                placeholder: "Search documentation...",
                readOnly: true,
                className: `docs-nav-search-input w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${isLightMode ? "bg-[#f8fafc] border border-[#cbd5e1] text-[#0f172a] placeholder-[#64748b] shadow-[0_1px_2px_rgba(15,23,42,0.06)]" : "bg-[#242839] dark:bg-[#242839] border border-[#3f465f] text-white dark:text-white placeholder-[#9aa0a6] dark:placeholder-[#9aa0a6]"}`
              })]
            })
          })]
        }), /* @__PURE__ */ jsx("button", {
          onClick: toggleBgColor,
          className: `p-2 rounded-full transition-colors ${isLightMode ? "hover:bg-[#e2e8f0]" : "hover:bg-[#3c4043]"}`,
          title: "Toggle theme",
          "aria-label": "Toggle theme",
          children: isLightMode ? /* @__PURE__ */ jsx(Moon, {
            className: "w-5 h-5 text-[#475569]"
          }) : /* @__PURE__ */ jsx(Sun, {
            className: "w-5 h-5 text-[#f8fafc]"
          })
        })]
      })
    }), searchModalOpen && /* @__PURE__ */ jsxs("div", {
      className: "bg-gradient-doc-modal fixed inset-0 z-[60] flex items-center justify-center px-4",
      children: [/* @__PURE__ */ jsx("button", {
        type: "button",
        "aria-label": "Close search modal",
        className: "docs-search-modal-backdrop bg-gradient-doc-modal absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm",
        onClick: () => {
          setSearchModalOpen(false);
          setSearchQuery("");
          setSearchResults([]);
        }
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-gradient-doc-modal relative w-full max-w-md mx-4",
        children: /* @__PURE__ */ jsxs("article", {
          className: `docs-search-modal-panel bg-gradient-doc-modal rounded-xl shadow-2xl border transition-colors ${isLightMode ? "bg-white/80 backdrop-blur-md border-[#cbd5e1]" : "bg-[#1a1928]/80 backdrop-blur-md border-[#5f6368]"}`,
          children: [/* @__PURE__ */ jsx("div", {
            className: "bg-gradient-doc-modal p-4",
            children: /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-doc-modal relative",
              children: [/* @__PURE__ */ jsx(Search, {
                className: `absolute left-4 top-1/2 -translate-y-1/2 z-10 w-5 h-5 pointer-events-none ${isLightMode ? "text-[#334155]" : "text-[#9aa0a6]"}`
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                placeholder: "Search documentation...",
                value: searchQuery,
                onChange: (e) => handleSearch(e.target.value),
                autoFocus: true,
                className: `docs-modal-search-input w-full pl-12 pr-4 py-3 border-0 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${isLightMode ? "bg-[#f1f5f9] text-[#0f172a] placeholder-[#64748b]" : "bg-[#242839] text-white placeholder-[#9aa0a6]"}`
              })]
            })
          }), searchResults.length > 0 && /* @__PURE__ */ jsx("div", {
            className: `bg-gradient-doc-modal max-h-96 overflow-y-auto border-t ${isLightMode ? "border-[#cbd5e1]" : "border-[#5f6368]"}`,
            children: searchResults.map((result) => /* @__PURE__ */ jsx("div", {
              onClick: () => {
                selectSection(result.id);
                setSearchQuery("");
                setSearchResults([]);
                setSearchModalOpen(false);
              },
              className: `bg-gradient-doc-modal px-6 py-4 cursor-pointer border-b last:border-0 transition-colors ${isLightMode ? "hover:bg-[#f1f5f9] border-[#e2e8f0]" : "hover:bg-[#242839] border-[#5f6368]"}`,
              children: /* @__PURE__ */ jsx("p", {
                className: `text-base font-medium ${isLightMode ? "text-[#0f172a]" : "text-white"}`,
                children: result.title
              })
            }, result.id))
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("button", {
      onClick: () => setSidebarOpen(!sidebarOpen),
      className: "hidden",
      children: /* @__PURE__ */ jsx(Menu, {
        className: `w-5 h-5 ${isLightMode ? "text-[#334155]" : "text-[#9aa0a6]"}`
      })
    }), /* @__PURE__ */ jsx("div", {
      className: `${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed left-0 top-16 z-40 w-72 border-r h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ${isLightMode ? "bg-white border-[#e2e8f0]" : "bg-[#1a1928] dark:bg-[#1a1928] border-[#5f6368]"}`,
      children: /* @__PURE__ */ jsx("div", {
        className: "py-6 px-4",
        children: /* @__PURE__ */ jsx("nav", {
          className: "space-y-1",
          children: sections.map((section) => renderTreeItem(section))
        })
      })
    }), sidebarOpen && /* @__PURE__ */ jsx("div", {
      className: "lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50",
      onClick: () => setSidebarOpen(false)
    }), /* @__PURE__ */ jsx("main", {
      className: "min-h-screen pl-0 lg:pl-72 pt-16",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "doc-content",
          onClick: handleDocContentClick,
          children: renderSectionContent()
        })
      })
    }), activeImage && /* @__PURE__ */ jsxs("div", {
      className: "fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center",
      onClick: () => setActiveImage(null),
      children: [/* @__PURE__ */ jsx("button", {
        type: "button",
        className: "keep-white-text absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none",
        onClick: () => setActiveImage(null),
        "aria-label": "Close image preview",
        children: "×"
      }), /* @__PURE__ */ jsx("img", {
        src: activeImage.src,
        alt: activeImage.alt,
        className: "max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl",
        onClick: (event) => event.stopPropagation()
      })]
    }), /* @__PURE__ */ jsx("style", {
      children: `
        .docs-page.docs-light .doc-content [class*='text-gray-'],
        .docs-page.docs-light .doc-content [class*='dark:text-gray-'],
        .docs-page.docs-light .doc-content [class*='text-slate-'],
        .docs-page.docs-light .doc-content [class*='dark:text-slate-'],
        .docs-page.docs-light .doc-content [class*='dark:text-white'],
        .docs-page.docs-light .doc-content [class*='dark:text-white/'],
        .docs-page.docs-light .doc-content [class*='text-[#5f6368]'],
        .docs-page.docs-light .doc-content [class*='text-[#9aa0a6]'],
        .docs-page.docs-light .doc-content [class*='text-[#e8eaed]'] {
          color: #334155 !important;
        }

        .docs-page.docs-light .doc-content [class*='text-gray-900'],
        .docs-page.docs-light .doc-content [class*='text-slate-900'],
        .docs-page.docs-light .doc-content [class*='text-[#202124]'] {
          color: #0f172a !important;
        }

        .docs-page.docs-light .doc-content [class*='dark:bg-'] {
          background-color: #f8fafc !important;
        }

        .docs-page.docs-light .doc-content [class*='dark:border-'] {
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content p,
        .docs-page.docs-light .doc-content li {
          color: #334155;
        }

        .docs-page.docs-light .doc-content h1,
        .docs-page.docs-light .doc-content h2,
        .docs-page.docs-light .doc-content h3,
        .docs-page.docs-light .doc-content h4,
        .docs-page.docs-light .doc-content h5,
        .docs-page.docs-light .doc-content h6 {
          color: #0f172a;
        }

        .docs-page.docs-light .doc-content .docs-overview-highlight {
          background-color: #eef2f7 !important;
          border: 1px solid #dbe3ef;
        }

        .docs-page.docs-light .doc-content .docs-overview-step {
          background: rgba(255, 255, 255, 0.88) !important;
          border-color: #dbe3ef !important;
        }

        .docs-page.docs-dark .doc-content .docs-overview-step {
          background: rgba(15, 23, 42, 0.38) !important;
          border-color: rgba(148, 163, 184, 0.35) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 52%, #eff6ff 100%) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-glow {
          background-color: rgba(147, 197, 253, 0.34) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-step {
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: #dbeafe !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-step-final {
          background: rgba(236, 253, 245, 0.86) !important;
          border-color: #a7f3d0 !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-flow-connector {
          background: transparent !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-flow-card {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #ecfdf5 100%) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-flow-step {
          background: rgba(255, 255, 255, 0.93) !important;
          border-color: #d1fae5 !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-flow-step {
          background: rgba(15, 23, 42, 0.82) !important;
          border-color: rgba(148, 163, 184, 0.38) !important;
        }

        .docs-page .doc-content .docs-hs-anim-shell {
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          padding: 0.9rem;
          background: linear-gradient(145deg, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.65));
        }

        .docs-page .doc-content .docs-hs-anim-stage {
          position: relative;
          overflow: hidden;
          border-radius: 0.9rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          min-height: 320px;
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #ecfdf5 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 12px 28px rgba(15, 23, 42, 0.12);
          padding: 1rem;
        }

        .docs-page .doc-content .docs-hs-anim-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 22% 22%, rgba(255, 255, 255, 0.34), transparent 42%),
            radial-gradient(circle at 80% 78%, rgba(148, 163, 184, 0.2), transparent 40%),
            repeating-linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.06) 0,
              rgba(148, 163, 184, 0.06) 1px,
              transparent 1px,
              transparent 24px
            );
        }

        .docs-page .doc-content .docs-hs-anim-poster {
          position: relative;
          z-index: 1;
          width: min(408px, 58%);
          border-radius: 0.4rem;
          border: 1px solid rgba(15, 23, 42, 0.16);
          background: #ffffff;
          padding: 0.48rem;
          box-shadow:
            0 14px 28px rgba(15, 23, 42, 0.23),
            0 3px 6px rgba(15, 23, 42, 0.14);
          transform: rotate(-1.6deg);
          animation: docsHSAnimPosterDrift 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-poster-sheet {
          border-radius: 0.2rem;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background:
            radial-gradient(circle at 20% 14%, rgba(255, 255, 255, 0.82), transparent 48%),
            linear-gradient(160deg, #ffffff 0%, #f8fafc 42%, #eef2ff 100%);
          padding: 0.6rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-kicker {
          color: #1e293b;
          font-size: 0.62rem;
          line-height: 1;
          letter-spacing: 0.09em;
          font-weight: 800;
        }

        .docs-page .doc-content .docs-hs-anim-poster-title {
          color: #0f172a;
          font-size: 1.04rem;
          line-height: 1.12;
          font-weight: 900;
        }

        .docs-page .doc-content .docs-hs-anim-poster-sub {
          color: #475569;
          font-size: 0.72rem;
          line-height: 1.22;
          font-weight: 600;
        }

        .docs-page .doc-content .docs-hs-anim-poster-grid {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.62rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-meta {
          flex: 1;
        }

        .docs-page .doc-content .docs-hs-anim-poster-meta p {
          color: #334155;
          font-size: 0.63rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art {
          position: relative;
          width: 6.05rem;
          height: 6.05rem;
          border-radius: 0.38rem;
          border: 1px solid rgba(15, 23, 42, 0.16);
          background: #ffffff;
          box-shadow: inset 0 0 0 0.2rem #ffffff;
          overflow: hidden;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art::before {
          content: '';
          position: absolute;
          inset: 0.32rem;
          background-image: radial-gradient(circle, rgba(15, 23, 42, 0.92) 30%, transparent 33%);
          background-size: 0.4rem 0.4rem;
          opacity: 0.38;
        }

        .docs-page .doc-content .docs-hs-anim-qr-art::after {
          content: '';
          position: absolute;
          inset: 0.32rem;
          background:
            linear-gradient(#0f172a, #0f172a) 56% 18% / 18% 8% no-repeat,
            linear-gradient(#0f172a, #0f172a) 30% 43% / 12% 10% no-repeat,
            linear-gradient(#0f172a, #0f172a) 63% 55% / 16% 9% no-repeat,
            linear-gradient(#0f172a, #0f172a) 46% 73% / 24% 8% no-repeat;
          opacity: 0.9;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder {
          position: absolute;
          width: 1.55rem;
          height: 1.55rem;
          border: 0.22rem solid #0f172a;
          background: #ffffff;
          z-index: 1;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder::after {
          content: '';
          position: absolute;
          inset: 0.34rem;
          background: #0f172a;
        }

        .docs-page .doc-content .docs-hs-anim-qr-finder-tl { left: 0.35rem; top: 0.35rem; }
        .docs-page .doc-content .docs-hs-anim-qr-finder-tr { right: 0.35rem; top: 0.35rem; }
        .docs-page .doc-content .docs-hs-anim-qr-finder-bl { left: 0.35rem; bottom: 0.35rem; }

        .docs-page .doc-content .docs-hs-anim-poster-foot {
          margin-top: 0.45rem;
          color: #0f172a;
          font-size: 0.72rem;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .docs-page .doc-content .docs-hs-anim-poster-foot::before {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.14), rgba(15, 23, 42, 0.42), rgba(15, 23, 42, 0.14));
          margin-bottom: 0.42rem;
        }

        .docs-page .doc-content .docs-hs-anim-poster-gloss {
          position: absolute;
          top: 0.7rem;
          right: 0.9rem;
          width: 18%;
          height: 62%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
          transform: rotate(16deg);
          pointer-events: none;
        }

        .docs-page .doc-content .docs-hs-anim-pin {
          position: absolute;
          top: -0.35rem;
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.18);
          background: radial-gradient(circle at 32% 30%, #ffffff, #dbeafe 56%, #93c5fd 100%);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
          z-index: 2;
        }

        .docs-page .doc-content .docs-hs-anim-pin-a {
          left: 0.78rem;
        }

        .docs-page .doc-content .docs-hs-anim-pin-b {
          right: 0.78rem;
        }

        .docs-page .doc-content .docs-hs-anim-human {
          position: absolute;
          right: 1.15rem;
          bottom: 1.35rem;
          display: flex;
          align-items: flex-end;
          gap: 0.2rem;
          transform-origin: right bottom;
          animation: docsHSAnimPhoneMove 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-arm {
          display: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone {
          position: relative;
          width: 8rem;
          aspect-ratio: 9 / 18.5;
          border-radius: 1.04rem;
          border: 2px solid #0f172a;
          background: #020617;
          padding: 0.32rem;
          overflow: hidden;
          box-shadow: 0 13px 30px rgba(2, 6, 23, 0.48);
        }

        .docs-page .doc-content .docs-hs-anim-screen {
          position: absolute;
          inset: 0.32rem;
          border-radius: 0.8rem;
          background: linear-gradient(160deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.96));
          padding: 0.66rem 0.56rem;
        }

        .docs-page .doc-content .docs-hs-anim-screen-title {
          color: #e2e8f0;
          font-size: 0.72rem;
          line-height: 1.1;
          font-weight: 700;
          text-align: center;
        }

        .docs-page .doc-content .docs-hs-anim-screen-scan {
          opacity: 1;
          animation: docsHSAnimScreenScan 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-screen-open {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 0.22rem;
          padding: 0.36rem 0.3rem 0.3rem;
          overflow: hidden;
          background: linear-gradient(180deg, #edf2fb 0%, #e6edf9 100%);
          opacity: 0;
          animation: docsHSAnimScreenOpen 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-screen-calling {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 0.24rem;
          padding: 0.46rem 0.3rem 0.34rem;
          overflow: hidden;
          background: linear-gradient(180deg, #edf2fb 0%, #e6edf9 100%);
          opacity: 0;
          animation: docsHSAnimScreenCalling 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle at 30% 32%, rgba(191, 219, 254, 0.44), rgba(191, 219, 254, 0.16) 62%, rgba(191, 219, 254, 0) 100%);
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble-a {
          width: 4rem;
          height: 4rem;
          right: -1.36rem;
          top: -1.36rem;
        }

        .docs-page .doc-content .docs-hs-anim-ui-bubble-b {
          width: 5.8rem;
          height: 5.8rem;
          left: -2.5rem;
          bottom: -3rem;
        }

        .docs-page .doc-content .docs-hs-anim-ui-theme-badge {
          position: absolute;
          top: 0.24rem;
          right: 0.24rem;
          width: 0.82rem;
          height: 0.82rem;
          border-radius: 999px;
          border: 1px solid #d99a32;
          background: rgba(248, 250, 252, 0.8);
          color: #7c8597;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar {
          position: relative;
          margin-top: 0.3rem;
          width: 2.14rem;
          height: 2.14rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.45);
          background:
            radial-gradient(circle at 42% 38%, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.9)),
            linear-gradient(135deg, rgba(219, 234, 254, 0.84), rgba(224, 231, 255, 0.78));
          box-shadow: 0 10px 18px rgba(148, 163, 184, 0.28);
          z-index: 1;
          overflow: hidden;
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar::before {
          content: '';
          position: absolute;
          inset: 0.43rem;
          border-radius: 0.48rem;
          border: 1px solid rgba(148, 163, 184, 0.45);
          background:
            linear-gradient(90deg, rgba(203, 213, 225, 0.65), rgba(203, 213, 225, 0.65)) 28% 28% / 44% 6% no-repeat,
            linear-gradient(90deg, rgba(203, 213, 225, 0.58), rgba(203, 213, 225, 0.58)) 36% 47% / 34% 6% no-repeat,
            linear-gradient(120deg, rgba(148, 163, 184, 0.36), rgba(191, 219, 254, 0.32));
        }

        .docs-page .doc-content .docs-hs-anim-open-avatar-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.42);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 0.18rem rgba(191, 219, 254, 0.34);
        }

        .docs-page .doc-content .docs-hs-anim-open-name {
          position: relative;
          z-index: 1;
          color: #2d5ad1;
          font-size: 0.58rem;
          line-height: 1;
          font-weight: 800;
        }

        .docs-page .doc-content .docs-hs-anim-open-ready {
          position: relative;
          z-index: 1;
          color: #0f766e;
          font-size: 0.45rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-open-call {
          margin-top: 0.02rem;
          min-height: 0.84rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-code {
          width: auto;
          margin-top: 0.02rem;
          border-radius: 999px;
          border: 1px solid rgba(147, 173, 255, 0.7);
          background: linear-gradient(180deg, rgba(221, 232, 255, 0.98), rgba(208, 221, 253, 0.98));
          box-shadow: 0 4px 10px rgba(148, 163, 184, 0.2);
          color: #2e5acb;
          font-size: 0.55rem;
          line-height: 1;
          font-weight: 700;
          padding: 0.22rem 0.52rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-note {
          position: relative;
          z-index: 1;
          margin-top: 0.01rem;
          color: #4b5563;
          font-size: 0.34rem;
          line-height: 1.24;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.01em;
        }

        .docs-page .doc-content .docs-hs-anim-open-actions {
          position: relative;
          z-index: 1;
          margin-top: 0.02rem;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.16rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-action {
          min-height: 0.9rem;
          border-radius: 0.26rem;
          border: 1px solid rgba(148, 163, 184, 0.42);
          background: rgba(255, 255, 255, 0.9);
          color: #1f2937;
          font-size: 0.37rem;
          line-height: 1;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.16rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-action:first-child svg {
          color: #10b981;
        }

        .docs-page .doc-content .docs-hs-anim-open-action:last-child svg {
          color: #ef4444;
        }

        .docs-page .doc-content .docs-hs-anim-open-schedule {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 0.86rem;
          border-radius: 0.26rem;
          border: 1px solid rgba(148, 163, 184, 0.42);
          background: rgba(255, 255, 255, 0.92);
          color: #1f2937;
          font-size: 0.4rem;
          line-height: 1;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.18rem;
        }

        .docs-page .doc-content .docs-hs-anim-open-schedule svg {
          color: #7c3aed;
        }

        .docs-page .doc-content .docs-hs-anim-open-more {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-top: auto;
          min-height: 0.7rem;
          border-radius: 0.28rem;
          border: 1px solid rgba(147, 173, 255, 0.52);
          background: linear-gradient(180deg, rgba(214, 228, 255, 0.6), rgba(205, 221, 252, 0.6));
          color: #2d5ad1;
          font-size: 0.43rem;
          line-height: 1;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-open-footer {
          position: relative;
          z-index: 1;
          color: #6b7280;
          font-size: 0.29rem;
          line-height: 1.1;
          font-weight: 600;
          text-align: center;
        }

        .docs-page .doc-content .docs-hs-anim-mini-qr {
          margin: 0.5rem auto 0;
          width: 4.55rem;
          height: 4.55rem;
          border-radius: 0.55rem;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
        }

        .docs-page .doc-content .docs-hs-anim-call-btn {
          border: 1px solid #2fb07c;
          border-radius: 999px;
          width: auto;
          margin-top: 0.02rem;
          background: linear-gradient(180deg, #34d399, #10b981);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.28);
          color: #ffffff;
          font-size: 0.5rem;
          font-weight: 700;
          line-height: 1;
          padding: 0.24rem 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          animation: docsHSAnimCallBtnPress 12s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-calling-orb {
          margin-top: 0.54rem;
          width: 2.08rem;
          height: 2.08rem;
          border-radius: 999px;
          border: 1px solid rgba(37, 99, 235, 0.22);
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          box-shadow:
            0 12px 20px rgba(37, 99, 235, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.26);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .docs-page .doc-content .docs-hs-anim-calling-note {
          color: #4b5563;
          font-size: 0.41rem;
          line-height: 1;
          font-weight: 700;
        }

        .docs-page .doc-content .docs-hs-anim-scan-focus {
          position: absolute;
          left: 12%;
          right: 12%;
          top: 33%;
          height: 32%;
          border-radius: 0.45rem;
          border: 2px solid rgba(16, 185, 129, 0.95);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
          opacity: 0;
          animation: docsHSAnimScanFocus 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-scan-line {
          position: absolute;
          left: 8%;
          right: 8%;
          top: 18%;
          height: 0.17rem;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.88), rgba(16, 185, 129, 0));
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.55);
          animation: docsHSAnimScanLine 1.35s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-tap {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 0.82rem;
          height: 0.82rem;
          border-radius: 999px;
          border: 2px solid rgba(37, 99, 235, 0.58);
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: docsHSAnimTap 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ring {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 2.45rem;
          height: 2.45rem;
          border-radius: 999px;
          border: 2px solid rgba(37, 99, 235, 0.45);
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: docsHSAnimRing 12s ease-out infinite;
        }

        .docs-page .doc-content .docs-hs-anim-ring-b {
          animation-delay: 0.5s;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 0.72rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.42rem;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar span {
          height: 0.22rem;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.46);
          opacity: 0.42;
          animation: docsHSAnimStepPulse 12s linear infinite;
        }

        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(2) { animation-delay: 2.6s; }
        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(3) { animation-delay: 5.3s; }
        .docs-page .doc-content .docs-hs-anim-stepbar span:nth-child(4) { animation-delay: 8.2s; }

        @keyframes docsHSAnimPhoneMove {
          0%, 18% {
            opacity: 0;
            transform: translate(24px, 14px) rotate(-10deg) scale(0.9);
          }
          24%, 44% {
            opacity: 1;
            transform: translate(-172px, -42px) rotate(-14deg) scale(0.95);
          }
          52%, 100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes docsHSAnimPosterDrift {
          0%, 100% { transform: rotate(-1.6deg) translateY(0); }
          50% { transform: rotate(-0.9deg) translateY(-2px); }
        }

        @keyframes docsHSAnimScreenScan {
          0%, 44% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScreenOpen {
          0%, 47% { opacity: 0; }
          52%, 68% { opacity: 1; }
          71%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScreenCalling {
          0%, 69% { opacity: 0; }
          73%, 100% { opacity: 1; }
        }

        @keyframes docsHSAnimScanFocus {
          0%, 24% { opacity: 0; }
          28%, 44% { opacity: 1; }
          48%, 100% { opacity: 0; }
        }

        @keyframes docsHSAnimScanLine {
          0% { top: 16%; opacity: 0.45; }
          50% { top: 80%; opacity: 1; }
          100% { top: 16%; opacity: 0.45; }
        }

        @keyframes docsHSAnimCallBtnPress {
          0%, 63%, 68%, 100% { transform: scale(1); }
          65% { transform: scale(0.93); }
          67% { transform: scale(1.02); }
        }

        @keyframes docsHSAnimTap {
          0%, 63%, 67%, 100% {
            opacity: 0;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
          64% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.58);
          }
          66% {
            opacity: 0;
            box-shadow: 0 0 0 12px rgba(37, 99, 235, 0);
          }
        }

        @keyframes docsHSAnimRing {
          0%, 72%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.86);
          }
          79% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1.02);
          }
          88% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.56);
          }
        }

        @keyframes docsHSAnimStepPulse {
          0%, 6%, 100% {
            opacity: 0.32;
            background: rgba(148, 163, 184, 0.46);
          }
          12%, 22% {
            opacity: 1;
            background: rgba(37, 99, 235, 0.88);
          }
        }

        .docs-page .doc-content .docs-c2c-demo-shell {
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          padding: 0.9rem;
          background: linear-gradient(145deg, rgba(241, 245, 249, 0.9), rgba(226, 232, 240, 0.65));
        }

        .docs-page .doc-content .docs-c2c-demo-browser {
          position: relative;
          overflow: hidden;
          border-radius: 0.9rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          min-height: 245px;
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #eff6ff 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 12px 28px rgba(15, 23, 42, 0.12);
        }

        .docs-page .doc-content .docs-c2c-demo-topbar {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.55rem 0.7rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(248, 250, 252, 0.85);
        }

        .docs-page .doc-content .docs-c2c-demo-topbar p {
          line-height: 1.1;
        }

        .docs-page .doc-content .docs-c2c-dot {
          display: inline-flex;
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 999px;
        }

        .docs-page .doc-content .docs-c2c-demo-page {
          padding: 1rem 1rem 3.2rem;
        }

        .docs-page .doc-content .docs-c2c-call-btn {
          position: absolute;
          right: 1rem;
          bottom: 0.9rem;
          border: 0;
          border-radius: 999px;
          width: 3.2rem;
          height: 3.2rem;
          padding: 0;
          cursor: default;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.35);
          animation:
            docsC2CBtnState 9s ease-in-out infinite,
            docsC2CBtnPress 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-call-icon {
          position: absolute;
          color: #ffffff;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .docs-page .doc-content .docs-c2c-call-icon-idle {
          animation:
            docsC2CPhoneRing 9s ease-in-out infinite,
            docsC2CIdleIcon 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-call-icon-calling {
          opacity: 0;
          transform: scale(0.88);
          animation: docsC2CCallingIcon 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-confirm-popup {
          position: absolute;
          right: 0.95rem;
          bottom: 3.55rem;
          width: min(235px, calc(100% - 1.5rem));
          border-radius: 0.75rem;
          border: 1px solid rgba(148, 163, 184, 0.38);
          background: rgba(255, 255, 255, 0.93);
          padding: 0.7rem;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.18);
          animation: docsC2CPopupState 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-popup-btn {
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: #ffffff;
          color: #334155;
          border-radius: 0.45rem;
          font-size: 0.75rem;
          line-height: 1;
          font-weight: 600;
          padding: 0.36rem 0.6rem;
        }

        .docs-page .doc-content .docs-c2c-popup-yes {
          background: #16a34a;
          border-color: #16a34a;
          color: #ffffff;
          animation: docsC2CYesPulse 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-ripple {
          position: absolute;
          right: 0.83rem;
          bottom: 0.74rem;
          width: 3.1rem;
          height: 3.1rem;
          border-radius: 999px;
          border: 2px solid rgba(34, 197, 94, 0.42);
          opacity: 0;
          animation: docsC2CRipple 9s ease-out infinite;
          pointer-events: none;
        }

        .docs-page .doc-content .docs-c2c-ripple-b {
          animation-delay: 0.4s;
        }

        .docs-page .doc-content .docs-c2c-cursor,
        .docs-page .doc-content .docs-c2c-click-pulse {
          position: absolute;
          left: 1.35rem;
          top: 2.1rem;
          pointer-events: none;
          animation: docsC2CCursorPath 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-cursor {
          width: 1.1rem;
          height: 1.45rem;
          z-index: 4;
        }

        .docs-page .doc-content .docs-c2c-cursor::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ffffff;
          border: 1.4px solid #0f172a;
          clip-path: polygon(0 0, 0 100%, 35% 73%, 54% 97%, 68% 89%, 48% 64%, 100% 64%);
          border-radius: 0.16rem;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.26);
          transform-origin: 24% 18%;
          animation: docsC2CCursorTilt 9s ease-in-out infinite;
        }

        .docs-page .doc-content .docs-c2c-cursor::after {
          content: '';
          position: absolute;
          width: 0.48rem;
          height: 0.13rem;
          left: 0.33rem;
          top: 0.72rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.45);
          transform: rotate(-32deg);
          opacity: 0.8;
        }

        .docs-page .doc-content .docs-c2c-click-pulse {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 999px;
          border: 2px solid rgba(30, 64, 175, 0.55);
          opacity: 0;
          margin-left: 0.45rem;
          margin-top: 0.62rem;
          animation:
            docsC2CCursorPath 9s ease-in-out infinite,
            docsC2CClickPulse 9s ease-in-out infinite;
          z-index: 3;
        }

        @keyframes docsC2CCursorPath {
          0%, 8% {
            left: 1.35rem;
            top: 2.1rem;
          }
          20%, 32% {
            left: calc(100% - 3.25rem);
            top: calc(100% - 3.05rem);
          }
          44%, 58% {
            left: calc(100% - 4.35rem);
            top: calc(100% - 6.5rem);
          }
          70%, 100% {
            left: calc(100% - 3.25rem);
            top: calc(100% - 3.05rem);
          }
        }

        @keyframes docsC2CPopupState {
          0%, 23% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          26%, 55% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          60%, 100% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
        }

        @keyframes docsC2CClickPulse {
          0%, 21%, 25%, 53%, 58%, 100% {
            opacity: 0;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
          22%, 54% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.55);
          }
          24%, 56% {
            opacity: 0;
            box-shadow: 0 0 0 12px rgba(37, 99, 235, 0);
          }
        }

        @keyframes docsC2CIdleIcon {
          0%, 61% { opacity: 1; }
          64%, 100% { opacity: 0; }
        }

        @keyframes docsC2CCallingIcon {
          0%, 62% {
            opacity: 0;
            transform: scale(0.88);
          }
          66%, 100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes docsC2CBtnState {
          0%, 16%, 26%, 48%, 58%, 61% {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            box-shadow: 0 10px 20px rgba(34, 197, 94, 0.35);
          }
          18%, 21%, 50%, 53% {
            background: linear-gradient(135deg, #4ade80, #22c55e);
            box-shadow: 0 14px 24px rgba(34, 197, 94, 0.44);
          }
          66%, 100% {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            box-shadow: 0 10px 22px rgba(37, 99, 235, 0.38);
          }
        }

        @keyframes docsC2CBtnPress {
          0%, 21%, 25%, 53%, 58%, 100% { transform: scale(1); }
          22%, 54% { transform: scale(0.9); }
          24%, 56% { transform: scale(1); }
        }

        @keyframes docsC2CPhoneRing {
          0%, 62%, 100% { transform: rotate(0deg); }
          66% { transform: rotate(-12deg); }
          69% { transform: rotate(12deg); }
          72% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
          78% { transform: rotate(0deg); }
        }

        @keyframes docsC2CCursorTilt {
          0%, 21%, 25%, 53%, 58%, 100% { transform: rotate(0deg); }
          22%, 54% { transform: rotate(8deg); }
          24%, 56% { transform: rotate(0deg); }
        }

        @keyframes docsC2CRipple {
          0%, 62% {
            opacity: 0;
            transform: scale(0.82);
          }
          68% {
            opacity: 0.42;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.56);
          }
        }

        @keyframes docsC2CYesPulse {
          0%, 48%, 60%, 100% { transform: scale(1); }
          54% { transform: scale(1.06); }
        }

        .docs-page.docs-light .doc-content .docs-c2c-demo-browser {
          background: linear-gradient(165deg, #f8fafc 0%, #ffffff 58%, #eff6ff 100%) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-demo-topbar {
          background: rgba(248, 250, 252, 0.88) !important;
        }

        .docs-page.docs-light .doc-content .docs-c2c-confirm-popup {
          background: rgba(255, 255, 255, 0.94) !important;
        }

        .docs-page.docs-light .doc-content .docs-hs-anim-stage {
          background: linear-gradient(160deg, #f8fafc 0%, #ffffff 52%, #ecfdf5 100%) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-shell {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.72), rgba(30, 41, 59, 0.6)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stage {
          background: linear-gradient(165deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.9)) !important;
          border-color: rgba(148, 163, 184, 0.3) !important;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(148, 163, 184, 0.44) !important;
          box-shadow: 0 14px 32px rgba(2, 6, 23, 0.56);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-pin {
          border-color: rgba(148, 163, 184, 0.42);
          background: radial-gradient(circle at 32% 30%, #e2e8f0, #94a3b8 56%, #475569 100%);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-sheet {
          border-color: rgba(148, 163, 184, 0.36);
          background:
            radial-gradient(circle at 20% 14%, rgba(148, 163, 184, 0.22), transparent 48%),
            linear-gradient(160deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 52%, rgba(51, 65, 85, 0.94) 100%);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-kicker,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-title,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-foot,
        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-meta p {
          color: #e2e8f0;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-sub {
          color: #cbd5e1;
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-poster-foot::before {
          background: linear-gradient(90deg, rgba(148, 163, 184, 0.12), rgba(148, 163, 184, 0.38), rgba(148, 163, 184, 0.12));
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stage::before {
          background:
            radial-gradient(circle at 22% 22%, rgba(148, 163, 184, 0.16), transparent 40%),
            radial-gradient(circle at 80% 78%, rgba(30, 64, 175, 0.16), transparent 40%),
            repeating-linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.08) 0,
              rgba(148, 163, 184, 0.08) 1px,
              transparent 1px,
              transparent 24px
            );
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-phone {
          border-color: #0b1220;
          box-shadow: 0 16px 32px rgba(2, 6, 23, 0.6);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-arm {
          background: linear-gradient(120deg, #c98c64, #b97a55);
        }

        .docs-page.docs-dark .doc-content .docs-hs-anim-stepbar span {
          background: rgba(148, 163, 184, 0.48);
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-shell {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.6)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-browser {
          background: linear-gradient(165deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.88)) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-demo-topbar {
          background: rgba(15, 23, 42, 0.78) !important;
          border-color: rgba(148, 163, 184, 0.28) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-confirm-popup {
          background: rgba(15, 23, 42, 0.94) !important;
          border-color: rgba(148, 163, 184, 0.32) !important;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-popup-btn {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(148, 163, 184, 0.42);
          color: #cbd5e1;
        }

        .docs-page.docs-dark .doc-content .docs-c2c-cursor::before {
          background: #f8fafc;
          border-color: #0f172a;
          box-shadow: 0 4px 10px rgba(2, 6, 23, 0.45);
        }

        .docs-page.docs-dark .doc-content .docs-c2c-popup-yes {
          background: #16a34a;
          border-color: #16a34a;
          color: #ffffff;
        }

        @media (max-width: 639px) {
          .docs-page .docs-nav-title {
            max-width: 33vw;
          }

          .docs-page .docs-nav-search-wrap {
            max-width: 9.6rem;
            margin-left: 0.5rem;
          }

          .docs-page .docs-nav-search-input {
            font-size: 0.76rem;
            line-height: 1.1rem;
          }

          .docs-page.docs-light .docs-nav-search-input {
            background-color: #ffffff !important;
            border-color: #94a3b8 !important;
            box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.18), 0 1px 2px rgba(15, 23, 42, 0.08);
          }

          .docs-page.docs-light .docs-nav-search-input::placeholder {
            color: #475569 !important;
          }

          .docs-page .doc-content .docs-c2c-demo-shell {
            padding: 0.62rem;
          }

          .docs-page .doc-content .docs-c2c-demo-browser {
            min-height: 232px;
          }

          .docs-page .doc-content .docs-c2c-demo-topbar {
            padding: 0.46rem 0.56rem;
          }

          .docs-page .doc-content .docs-c2c-demo-topbar p {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-c2c-demo-page {
            padding: 0.82rem 0.78rem 2.8rem;
          }

          .docs-page .doc-content .docs-c2c-call-btn {
            right: 0.72rem;
            bottom: 0.68rem;
            width: 2.86rem;
            height: 2.86rem;
          }

          .docs-page .doc-content .docs-c2c-ripple {
            right: 0.62rem;
            bottom: 0.58rem;
            width: 2.75rem;
            height: 2.75rem;
          }

          .docs-page .doc-content .docs-c2c-confirm-popup {
            right: 0.62rem;
            bottom: 3.18rem;
            width: min(210px, calc(100% - 1.1rem));
            padding: 0.56rem;
          }

          .docs-page .doc-content .docs-c2c-popup-btn {
            font-size: 0.69rem;
            padding: 0.3rem 0.52rem;
          }

          .docs-page .doc-content .docs-hs-anim-shell {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            padding: 0.22rem;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-shell,
          .docs-page.docs-dark .doc-content .docs-hs-anim-shell {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-stage {
            min-height: 336px;
            padding: 0.9rem;
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-stage,
          .docs-page.docs-dark .doc-content .docs-hs-anim-stage {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-stage::before {
            display: none;
          }

          .docs-page.docs-light .doc-content .docs-hs-anim-stage::before,
          .docs-page.docs-dark .doc-content .docs-hs-anim-stage::before {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-poster {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-poster-sheet {
            padding: 0.42rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-kicker {
            font-size: 0.54rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-title {
            font-size: 0.8rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-sub {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-meta p {
            font-size: 0.54rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-art {
            width: 4.5rem;
            height: 4.5rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-finder {
            width: 1.16rem;
            height: 1.16rem;
            border-width: 0.18rem;
          }

          .docs-page .doc-content .docs-hs-anim-qr-finder::after {
            inset: 0.26rem;
          }

          .docs-page .doc-content .docs-hs-anim-poster-foot {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-human {
            left: 50%;
            right: auto;
            bottom: 0.55rem;
            gap: 0;
            animation: none !important;
            opacity: 1 !important;
            transform: translateX(-50%) !important;
          }

          .docs-page .doc-content .docs-hs-anim-human.docs-hs-anim-human-manual-calling {
            left: 50%;
            right: auto;
            transform: translateX(-50%) !important;
          }

          .docs-page .doc-content .docs-hs-anim-phone {
            width: 8.6rem;
            box-shadow: none !important;
          }

          .docs-page.docs-dark .doc-content .docs-hs-anim-phone {
            box-shadow: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-arm {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-stepbar {
            display: none;
          }

          .docs-page .doc-content .docs-hs-anim-screen-open {
            gap: 0.3rem;
            padding: 0.46rem 0.4rem 0.38rem;
          }

          .docs-page .doc-content .docs-hs-anim-screen-calling {
            gap: 0.3rem;
            padding: 0.52rem 0.4rem 0.42rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-avatar {
            width: 2.2rem;
            height: 2.2rem;
            box-shadow: none;
          }

          .docs-page .doc-content .docs-hs-anim-open-name {
            font-size: 0.62rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-ready {
            font-size: 0.5rem;
            line-height: 1.36;
          }

          .docs-page .doc-content .docs-hs-anim-open-call {
            min-height: 0.9rem;
            margin-top: 0.04rem;
          }

          .docs-page .doc-content .docs-hs-anim-call-btn {
            font-size: 0.52rem;
            line-height: 1.1;
            padding: 0.24rem 0.52rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-code {
            font-size: 0.53rem;
            padding: 0.22rem 0.52rem;
            line-height: 1.2;
          }

          .docs-page .doc-content .docs-hs-anim-open-note {
            font-size: 0.4rem;
            line-height: 1.36;
          }

          .docs-page .doc-content .docs-hs-anim-open-actions {
            margin-top: 0.07rem;
            gap: 0.18rem;
          }

          .docs-page .doc-content .docs-hs-anim-open-action,
          .docs-page .doc-content .docs-hs-anim-open-schedule {
            font-size: 0.4rem;
            min-height: 1rem;
            line-height: 1.25;
          }

          .docs-page .doc-content .docs-hs-anim-open-more {
            font-size: 0.45rem;
            min-height: 0.78rem;
            line-height: 1.2;
          }

          .docs-page .doc-content .docs-hs-anim-open-footer {
            font-size: 0.34rem;
            margin-top: 0.06rem;
            line-height: 1.26;
          }

          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }

        .docs-page .doc-content .docs-overview-step-icon {
          background: rgba(59, 130, 246, 0.14);
          color: #1d4ed8;
        }

        .docs-page .doc-content .docs-overview-step {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
          animation:
            docsOverviewStepIn 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            docsOverviewStepFloat 4.2s ease-in-out infinite,
            docsOverviewStepGlow 4.2s ease-in-out infinite;
          animation-delay:
            var(--step-delay, 0ms),
            calc(var(--step-delay, 0ms) + 620ms),
            calc(var(--step-delay, 0ms) + 620ms);
        }

        .docs-page .doc-content .docs-overview-arrow {
          opacity: 0;
          animation:
            docsOverviewArrowIn 420ms ease-out forwards,
            docsOverviewArrowFlow 1.7s ease-in-out infinite;
          animation-delay: var(--arrow-delay, 0ms), calc(var(--arrow-delay, 0ms) + 420ms);
        }

        .docs-page .doc-content .docs-overview-step-icon svg {
          animation: docsOverviewIconPulse 2.3s ease-in-out infinite;
          animation-delay: calc(var(--step-delay, 0ms) + 200ms);
          transform-origin: center;
        }

        @keyframes docsOverviewStepIn {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes docsOverviewArrowIn {
          0% {
            opacity: 0;
            transform: translateX(-4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes docsOverviewArrowFlow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        @keyframes docsOverviewStepFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.01);
          }
        }

        @keyframes docsOverviewStepGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
          }
          50% {
            box-shadow: 0 12px 24px rgba(59, 130, 246, 0.16);
          }
        }

        @keyframes docsOverviewIconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .docs-page .doc-content .docs-c2c-call-btn,
          .docs-page .doc-content .docs-c2c-confirm-popup,
          .docs-page .doc-content .docs-c2c-ripple,
          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse,
          .docs-page .doc-content .docs-c2c-call-icon-idle,
          .docs-page .doc-content .docs-c2c-call-icon-calling,
          .docs-page .doc-content .docs-c2c-popup-yes,
          .docs-page .doc-content .docs-hs-anim-human,
          .docs-page .doc-content .docs-hs-anim-screen-scan,
          .docs-page .doc-content .docs-hs-anim-screen-open,
          .docs-page .doc-content .docs-hs-anim-screen-calling,
          .docs-page .doc-content .docs-hs-anim-call-btn,
          .docs-page .doc-content .docs-hs-anim-scan-focus,
          .docs-page .doc-content .docs-hs-anim-scan-line,
          .docs-page .doc-content .docs-hs-anim-tap,
          .docs-page .doc-content .docs-hs-anim-ring,
          .docs-page .doc-content .docs-hs-anim-stepbar span,
          .docs-page .doc-content .docs-overview-step,
          .docs-page .doc-content .docs-overview-arrow,
          .docs-page .doc-content .docs-overview-step-icon svg {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .docs-page .doc-content .docs-c2c-call-icon-calling,
          .docs-page .doc-content .docs-c2c-confirm-popup,
          .docs-page .doc-content .docs-c2c-ripple,
          .docs-page .doc-content .docs-c2c-cursor,
          .docs-page .doc-content .docs-c2c-click-pulse,
          .docs-page .doc-content .docs-hs-anim-tap,
          .docs-page .doc-content .docs-hs-anim-ring {
            opacity: 0 !important;
          }

          .docs-page .doc-content .docs-hs-anim-human {
            opacity: 1 !important;
            transform: none !important;
          }

          .docs-page .doc-content .docs-hs-anim-screen-scan,
          .docs-page .doc-content .docs-hs-anim-screen-calling {
            opacity: 0 !important;
          }

          .docs-page .doc-content .docs-hs-anim-screen-open {
            opacity: 1 !important;
          }
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-scan,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-open {
          opacity: 0 !important;
          animation: none !important;
          pointer-events: none;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-screen-calling {
          opacity: 1 !important;
          animation: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-scan-focus,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-scan-line,
        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-tap {
          opacity: 0 !important;
          animation: none !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-ring {
          opacity: 0;
          animation: docsHSAnimRingManual 1.15s ease-out infinite !important;
        }

        .docs-page .doc-content .docs-hs-anim-phone.docs-hs-anim-phone-manual-calling .docs-hs-anim-ring-b {
          animation-delay: 0.45s !important;
        }

        .docs-page .doc-content .docs-hs-anim-human.docs-hs-anim-human-manual-calling {
          animation: none !important;
          opacity: 1 !important;
          transform: translate(0, 0) rotate(0deg) scale(1) !important;
        }

        @keyframes docsHSAnimRingManual {
          0% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(0.86);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.6);
          }
        }

        .docs-page.docs-light .keep-white-text {
          color: #ffffff !important;
        }

        .docs-page.docs-light .docs-search-modal-backdrop {
          background-color: rgba(2, 6, 23, 0.52) !important;
          backdrop-filter: blur(4px);
        }

        .docs-page.docs-light .docs-search-modal-panel {
          background-color: rgba(255, 255, 255, 0.8) !important;
          border-color: #cbd5e1 !important;
        }

        .docs-page.docs-dark .docs-search-modal-panel {
          background-color: rgba(26, 25, 40, 0.8) !important;
        }

        .docs-page.docs-light .docs-nav-search-input {
          background-color: rgba(248, 250, 252, 0.68) !important;
          border: 1px solid #cbd5e1 !important;
          backdrop-filter: blur(6px);
        }

        .docs-page.docs-light .docs-modal-search-input {
          background-color: rgba(248, 250, 252, 0.86) !important;
          border: 1px solid #cbd5e1 !important;
          backdrop-filter: blur(4px);
        }

        .docs-page.docs-light .docs-nav-search-input:focus,
        .docs-page.docs-light .docs-nav-search-input:active,
        .docs-page.docs-light .docs-modal-search-input:focus,
        .docs-page.docs-light .docs-modal-search-input:active {
          background-color: rgba(255, 255, 255, 0.82) !important;
          border-color: #94a3b8 !important;
        }

        @media (hover: hover) and (pointer: fine) {
          .doc-content img {
            transition: transform 220ms ease, box-shadow 220ms ease;
            transform-origin: center;
            cursor: zoom-in;
            will-change: transform;
          }

          .doc-content img:hover {
            transform: scale(1.08);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
          }
        }
      `
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: "Module" }));
const SWIPER_SCRIPT_SRC = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
const SWIPER_STYLE_HREF = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
const SWIPER_STYLE_ID = "sohub-swiper-style";
const SWIPER_SCRIPT_ID = "sohub-swiper-script";
let swiperLoaderPromise = null;
function ensureSwiperAssets() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (window.Swiper) {
    return Promise.resolve(window.Swiper);
  }
  if (swiperLoaderPromise) {
    return swiperLoaderPromise;
  }
  swiperLoaderPromise = new Promise((resolve, reject) => {
    let styleEl = document.getElementById(SWIPER_STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement("link");
      styleEl.id = SWIPER_STYLE_ID;
      styleEl.rel = "stylesheet";
      styleEl.href = SWIPER_STYLE_HREF;
      document.head.appendChild(styleEl);
    }
    const existingScript = document.getElementById(SWIPER_SCRIPT_ID);
    if (existingScript) {
      if (window.Swiper) {
        resolve(window.Swiper);
      } else {
        existingScript.addEventListener("load", () => resolve(window.Swiper), {
          once: true
        });
        existingScript.addEventListener("error", reject, {
          once: true
        });
      }
      return;
    }
    const script = document.createElement("script");
    script.id = SWIPER_SCRIPT_ID;
    script.src = SWIPER_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Swiper);
    script.onerror = reject;
    document.body.appendChild(script);
  }).catch((error) => {
    swiperLoaderPromise = null;
    throw error;
  });
  return swiperLoaderPromise;
}
function initializeSwipers() {
  if (typeof window === "undefined" || !window.Swiper) {
    return;
  }
  document.querySelectorAll(".swiper-container").forEach((container) => {
    if (container.swiper) {
      container.swiper.update();
      return;
    }
    const slideCount = container.querySelectorAll(".swiper-slide").length;
    new window.Swiper(container, {
      loop: slideCount > 1,
      autoplay: slideCount > 1 ? {
        delay: 3e3,
        disableOnInteraction: false
      } : false
    });
  });
}
const page$3 = UNSAFE_withComponentProps(function FeaturePage() {
  const [activeTab, setActiveTab] = useState("call-efficiency");
  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    let cancelled = false;
    ensureSwiperAssets().then(() => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        initializeSwipers();
      }, 120);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [activeTab]);
  useEffect(() => {
    if (!activeImage) {
      return void 0;
    }
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeImage]);
  const handleFeatureImageClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    if (!target.closest(".swiper-container")) {
      return;
    }
    setActiveImage({
      src: target.currentSrc || target.src,
      alt: target.alt || "Feature image"
    });
  };
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "features-page min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("section", {
        className: "text-center py-12 md:py-16 px-4 bg-white dark:bg-[#121212]",
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsxs("h1", {
            className: "font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#111111] dark:text-white leading-tight",
            children: ["Simplify Your Business Communication with ", /* @__PURE__ */ jsx("span", {
              className: "text-[#22C55E]",
              children: "SOHUB Connect"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "font-inter text-base md:text-lg lg:text-xl text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed",
            children: "SOHUB Connect is an easy-to-use calling and messaging platform built for modern businesses. It helps your business communicate smoothly, reduce cost, and grow with confidence."
          }), /* @__PURE__ */ jsx("p", {
            className: "font-inter text-sm md:text-base text-[#22C55E] font-semibold",
            children: "Start with FREE FOREVER, then scale as your team grows."
          })]
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "py-6 md:py-10 px-4",
        onClickCapture: handleFeatureImageClick,
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-[920px] mx-auto my-6 md:my-10 text-center p-4 md:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700",
          children: [/* @__PURE__ */ jsxs("h1", {
            className: "font-plus-jakarta-sans font-bold text-base md:text-lg mb-4 md:mb-5 text-[#111111] dark:text-white",
            children: ["Explore ", /* @__PURE__ */ jsx("span", {
              className: "text-[#22C55E]",
              children: "SOHUB Connect"
            }), " Functionalities"]
          }), /* @__PURE__ */ jsx("div", {
            id: "business-tabs",
            className: "bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-3 md:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex justify-start md:justify-center gap-1 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            children: [{
              id: "call-efficiency",
              label: "Call Flow"
            }, {
              id: "work-anywhere",
              label: "Phones"
            }, {
              id: "unified-communications",
              label: "Ring Groups"
            }, {
              id: "sound-file",
              label: "Custom Audio"
            }].map((tab) => /* @__PURE__ */ jsx("div", {
              onClick: () => setActiveTab(tab.id),
              className: `px-3 md:px-4 py-2 md:py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${activeTab === tab.id ? "bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm" : "text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50"}`,
              children: tab.label
            }, tab.id))
          }), activeTab === "call-efficiency" && /* @__PURE__ */ jsx("div", {
            className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white",
                  children: "Deliver a professional calling experience with SOHUB Connect's smart IVR — no hardware or setup hassle."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Custom Welcome Messages – Set your own audio recordings or personalized greetings to welcome callers"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Interactive Voice Menus – Guide callers to the right team with clear menu options"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Smart Call Transfers – Automatically route callers to the right team or destination based on their needs"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Playback Audio Messages – Announce updates, business hours, or other important information through audio"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Ring Group Integration – Forward calls using smart ring strategies for the right team"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5",
                  children: "Ensure fast, accurate, and professional responses—right from the first ring."
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]",
                children: /* @__PURE__ */ jsx("div", {
                  className: "swiper-container",
                  style: {
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsx("div", {
                    className: "swiper-wrapper",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "swiper-slide",
                      children: /* @__PURE__ */ jsx("img", {
                        src: "/images/website/call_flow.png",
                        alt: "Call Flow",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      })
                    })
                  })
                })
              })]
            })
          }), activeTab === "work-anywhere" && /* @__PURE__ */ jsx("div", {
            className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white",
                  children: "Easily Create and Manage User Phones Without Any Hassle"
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Instant Setup – New phones are created quickly and ready to use"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Personalized Phone Naming – Organize phones by employee name, team, or department"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "One-Click Activation – Just save, and your new phone is instantly activated!"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]",
                children: /* @__PURE__ */ jsx("div", {
                  className: "swiper-container",
                  style: {
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsx("div", {
                    className: "swiper-wrapper",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "swiper-slide",
                      children: /* @__PURE__ */ jsx("img", {
                        src: "/images/features/phones_new.png",
                        alt: "Phones",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      })
                    })
                  })
                })
              })]
            })
          }), activeTab === "unified-communications" && /* @__PURE__ */ jsx("div", {
            className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white",
                  children: "Easily forward incoming calls to one or multiple agents using smart ring strategies tailored to your business."
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Multiple Ring Strategies – Choose from Ring All, Sequential, or Random ring patterns based on your team structure"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Add Multiple Phones – Group multiple team members or departments under one ring group"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Flexible Call Distribution – Ensure no call goes unanswered by distributing calls intelligently across your team"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]",
                children: /* @__PURE__ */ jsx("div", {
                  className: "swiper-container",
                  style: {
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsx("div", {
                    className: "swiper-wrapper",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "swiper-slide",
                      children: /* @__PURE__ */ jsx("img", {
                        src: "/images/features/ring_group_new.png",
                        alt: "Ring Groups",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      })
                    })
                  })
                })
              })]
            })
          }), activeTab === "sound-file" && /* @__PURE__ */ jsx("div", {
            className: "border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] text-left",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white",
                  children: "Record Your Own Voice for Call Flows to Boost Customer Satisfaction"
                }), /* @__PURE__ */ jsxs("ul", {
                  className: "list-none p-0 m-0 text-xs md:text-sm leading-relaxed",
                  children: [/* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Record Your Own Voice – Create and upload custom welcome messages, menu prompts, or announcements for your callers"
                    })]
                  }), /* @__PURE__ */ jsxs("li", {
                    className: "relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "absolute left-0 text-[#22C55E] font-bold",
                      children: "✔"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-inter text-[#525252] dark:text-white dark:text-opacity-80",
                      children: "Use Immediately After Upload – Your voice recording becomes instantly available in the call flow as soon as it's uploaded"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]",
                children: /* @__PURE__ */ jsx("div", {
                  className: "swiper-container",
                  style: {
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsx("div", {
                    className: "swiper-wrapper",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "swiper-slide",
                      children: /* @__PURE__ */ jsx("img", {
                        src: "/images/website/sound_file.png",
                        alt: "Custom Audio",
                        style: {
                          width: "100%",
                          display: "block"
                        }
                      })
                    })
                  })
                })
              })]
            })
          })]
        })
      }), activeImage && /* @__PURE__ */ jsxs("div", {
        className: "fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center",
        onClick: () => setActiveImage(null),
        children: [/* @__PURE__ */ jsx("button", {
          type: "button",
          "aria-label": "Close image preview",
          className: "absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none",
          onClick: () => setActiveImage(null),
          children: "×"
        }), /* @__PURE__ */ jsx("img", {
          src: activeImage.src,
          alt: activeImage.alt,
          className: "max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl",
          onClick: (event) => event.stopPropagation()
        })]
      }), /* @__PURE__ */ jsx("style", {
        children: `
          .features-page .swiper-container img {
            cursor: zoom-in;
          }
        `
      }), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: "Module" }));
const HOW_IT_WORKS_SCROLL_FALLBACK_OFFSET = 124;
const HOW_IT_WORKS_SCROLL_EXTRA_GAP = 20;
function HeroSection() {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (!element) {
      return;
    }
    const header = document.querySelector("header");
    const headerOffset = header instanceof HTMLElement ? Math.ceil(header.getBoundingClientRect().height) + HOW_IT_WORKS_SCROLL_EXTRA_GAP : HOW_IT_WORKS_SCROLL_FALLBACK_OFFSET;
    const targetY = window.scrollY + element.getBoundingClientRect().top - headerOffset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white dark:bg-[#121212] py-8 sm:py-10 md:py-12 lg:py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex items-center space-x-2 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 border border-[#22C55E]/30 dark:border-[#22C55E]/40 rounded-full px-4 py-2", children: /* @__PURE__ */ jsx("span", { className: "font-inter font-semibold text-xs text-[#22C55E]", children: "Turn scans into conversations" }) }),
    /* @__PURE__ */ jsx("h1", { className: "font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-tight text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl px-2", children: /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "HotScan" }) }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-[#111111] dark:text-white text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto px-2", children: "Instant voice connection from any physical touchpoint" }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2", children: "Turn QR scans into real-time conversations — without apps or setup." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://connect-client.sohub.com.bd/authentication/register",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "w-full sm:w-auto inline-flex items-center justify-center bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:scale-95 transition-all duration-200 shadow-lg shadow-[#22C55E]/30",
          children: "Create HotScan"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#how-it-works",
          onClick: (event) => {
            event.preventDefault();
            scrollToHowItWorks();
          },
          className: "w-full sm:w-auto inline-flex items-center justify-center bg-black dark:bg-black text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-200 cursor-pointer hotscan-button",
          children: "See how it works"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-xs sm:text-sm text-[#22C55E] font-semibold", children: "Included in FREE FOREVER (up to 5 users)" }),
    /* @__PURE__ */ jsxs("div", { className: "pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("span", { children: "Works on any smartphone" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("span", { children: "No downloads. No friction." })
      ] })
    ] })
  ] }) }) });
}
function ProblemSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8 sm:space-y-10 md:space-y-12", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-tight px-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[#111111] dark:text-white", children: "Offline interest often" }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "ends too early" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-4 sm:space-y-6", children: [
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#525252] dark:text-white dark:text-opacity-70", children: "Customers see your brand in the real world — on posters, counters, packaging, or events. But when they want to talk, the connection usually stops at information." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl p-4 sm:p-5 md:p-6", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg text-[#111111] dark:text-white font-semibold", children: "Web pages don't answer questions." }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl p-4 sm:p-5 md:p-6", children: /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#111111] dark:text-white font-semibold", children: "Forms don't respond instantly." }) })
      ] })
    ] })
  ] }) }) });
}
function SolutionSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white leading-tight px-2", children: [
      "HotScan enables ",
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "instant voice conversations" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#525252] dark:text-white dark:text-opacity-70 max-w-3xl mx-auto px-2", children: "HotScan lets customers scan a QR code and start a live voice call immediately." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 pt-6 sm:pt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold", children: "No apps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold", children: "No waiting" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full" }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold", children: "Just direct communication" })
      ] })
    ] })
  ] }) });
}
const steps = [
  {
    number: "1",
    title: "Create your HotScan profile",
    description: "Set up your HotScan in minutes from your dashboard."
  },
  {
    number: "2",
    title: "Place the QR code anywhere offline",
    description: "Print and display on posters, packaging, counters, or anywhere customers are."
  },
  {
    number: "3",
    title: "Customers scan and connect instantly",
    description: "The call routes securely to your team or call flow."
  }
];
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "scroll-mt-28 py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white mb-3 sm:mb-4 leading-tight px-2", children: "How it works" }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-sm sm:text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 px-2", children: "Simple for customers. Simple for businesses." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20", children: steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: `space-y-4 sm:space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#22C55E]/10 dark:bg-[#22C55E]/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-inter text-lg font-semibold text-[#22C55E]", children: step.number }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-plus-jakarta-sans font-bold text-2xl md:text-3xl text-[#111111] dark:text-white", children: step.title })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: step.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `${index % 2 === 1 ? "lg:order-1" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xl", children: index === 0 ? /* @__PURE__ */ jsx(
        "video",
        {
          className: "w-full aspect-video rounded-lg object-cover",
          autoPlay: true,
          loop: true,
          muted: true,
          playsInline: true,
          children: /* @__PURE__ */ jsx("source", { src: "/images/hotscan/Hotscan.mp4", type: "video/mp4" })
        }
      ) : index === 1 ? /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/hotscan/hotscan-qr.png",
          alt: "QR code placement",
          className: "w-full h-full object-contain"
        }
      ) }) : index === 2 ? /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/hotscan/hotscan-call.png",
          alt: "Customer scanning and connecting",
          className: "w-full h-full object-contain"
        }
      ) }) : /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#0A0A0A] dark:to-[#1A1A1A] rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "font-inter text-3xl font-bold text-white", children: step.number }) }),
        /* @__PURE__ */ jsx("p", { className: "font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60", children: step.title })
      ] }) }) }) })
    ] }, step.number)) })
  ] }) });
}
function DifferenceSection() {
  const features = [
    "Voice-first connection",
    "No SIM or app required for customers",
    "Works on all modern smartphones",
    "Secure and reliable call routing"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 px-6 bg-[#FAFAFA] dark:bg-[#121212]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center space-y-12", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] dark:text-white leading-tight", children: [
      "What Makes HotScan ",
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Different" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#525252] dark:text-white dark:text-opacity-70", children: "Designed for real-time engagement" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8", children: features.map((feature, index) => /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#111111] dark:text-white font-semibold text-left", children: feature })
    ] }) }, index)) }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold pt-8", children: "HotScan is built for moments when timing matters." })
  ] }) });
}
function WhyVoice() {
  return /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 px-6 bg-[#FAFAFA] dark:bg-[#121212]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center space-y-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] dark:text-white leading-tight", children: [
      "Why ",
      /* @__PURE__ */ jsx("span", { className: "text-[#22C55E]", children: "Voice" }),
      " Matters"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl text-[#525252] dark:text-white dark:text-opacity-70", children: "Conversations build trust" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-6 pt-8", children: [
      /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed", children: "When customers can speak instantly, questions get answered faster. Decisions happen sooner. Experiences feel more human." }),
      /* @__PURE__ */ jsx("p", { className: "font-inter text-xl sm:text-2xl text-[#111111] dark:text-white font-semibold pt-4", children: "HotScan makes those conversations possible." })
    ] })
  ] }) });
}
function CTASection() {
  return /* @__PURE__ */ jsx("section", { className: "py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 cta-section", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight px-2", children: "Turn offline interest into real conversations" }),
    /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto px-2", children: "Create your HotScan and start connecting instantly." }),
    /* @__PURE__ */ jsx("div", { className: "pt-2 sm:pt-4", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://connect-client.sohub.com.bd/authentication/register",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center justify-center bg-white text-[#22C55E] font-inter font-semibold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-lg",
        children: "Get Started"
      }
    ) })
  ] }) });
}
const page$2 = UNSAFE_withComponentProps(function HotScanPage() {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("main", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(HeroSection, {}), /* @__PURE__ */ jsx(ProblemSection, {}), /* @__PURE__ */ jsx(SolutionSection, {}), /* @__PURE__ */ jsx(HowItWorks, {}), /* @__PURE__ */ jsx(DifferenceSection, {}), /* @__PURE__ */ jsx(WhyVoice, {}), /* @__PURE__ */ jsx(ExploreFunctionalitiesSection, {}), /* @__PURE__ */ jsx(CTASection, {}), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: "Module" }));
const page$1 = UNSAFE_withComponentProps(function SOHUBConnectPage() {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(ProblemSection$1, {}), /* @__PURE__ */ jsx(SolutionSection$1, {}), /* @__PURE__ */ jsx(FeaturesSection, {}), /* @__PURE__ */ jsx(PricingSection, {}), /* @__PURE__ */ jsx(CTASection$1, {}), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: "Module" }));
const page = UNSAFE_withComponentProps(function TermsPage() {
  const terms = [{
    number: "1",
    title: "Legal Use Only",
    content: "You must not use SOHUB CONNECT for any illegal, harmful, or fraudulent purpose. Compliance with local laws is your responsibility."
  }, {
    number: "2",
    title: "Bangladesh-Only Access",
    content: "Our services are intended for users inside Bangladesh. VPNs or access from outside the country are not permitted."
  }, {
    number: "3",
    title: "Internet & BDIX Required",
    content: "SOHUB CONNECT operates over the internet. Ensure your ISP provides BDIX routing for optimal performance."
  }, {
    number: "4",
    title: "Call Rules",
    content: "HotScan™ and Click-to-Connect calls can only forward to internal SOHUB extensions, not personal mobile numbers."
  }, {
    number: "5",
    title: "Trunks & Plans",
    content: "Only verified SOHUB trunks are allowed. Adding custom trunks is available for Plus or Pro plan users only."
  }, {
    number: "6",
    title: "Verified Business Use",
    content: "All accounts must belong to verified individuals or registered businesses and used strictly for business communication."
  }, {
    number: "7",
    title: "No Tampering Allowed",
    content: "Hacking, misuse, or abuse of the system may result in immediate suspension of your account."
  }, {
    number: "8",
    title: "Community Conduct",
    content: "Respect others while using SOHUB CONNECT. Spam, harassment, or abusive behavior may lead to a ban."
  }, {
    number: "9",
    title: "Payments",
    content: "All wallet payments are final and non-refundable. We accept bKash and SSLCommerz (Visa, debit cards, and mobile wallets)."
  }, {
    number: "10",
    title: "Policy & Support",
    content: "Terms, pricing, and features may change at any time. Support is available via connect@sohub.com.bd."
  }, {
    number: "11",
    title: "Agreement",
    content: "By using SOHUB CONNECT, you confirm that you have read, understood, and agree to these terms."
  }];
  return /* @__PURE__ */ jsx(ThemeProvider, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-white dark:bg-[#121212]",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("section", {
        className: "w-full py-20 md:py-24 px-6",
        children: /* @__PURE__ */ jsx("div", {
          className: "max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center space-y-6",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2",
              children: [/* @__PURE__ */ jsx(FileText, {
                size: 14,
                className: "text-blue-600 dark:text-blue-400"
              }), /* @__PURE__ */ jsx("span", {
                className: "font-inter font-semibold text-xs text-blue-600 dark:text-blue-400",
                children: "Legal"
              })]
            }), /* @__PURE__ */ jsx("h1", {
              className: "font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight",
              children: "Terms & Conditions"
            }), /* @__PURE__ */ jsx("p", {
              className: "font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed max-w-2xl mx-auto",
              children: "Welcome to SOHUB CONNECT. By using our platform, you agree to the following terms and conditions. Please read them carefully."
            })]
          })
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "w-full py-12 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]",
        children: /* @__PURE__ */ jsx("div", {
          className: "max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsx("div", {
            className: "space-y-8",
            children: terms.map((term) => /* @__PURE__ */ jsx("div", {
              className: "bg-white dark:bg-[#1E1E1E] rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] transition-all duration-200",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex items-start space-x-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "font-inter font-bold text-lg text-[#22C55E]",
                    children: term.number
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-inter text-xl font-bold text-[#111111] dark:text-white mb-3",
                    children: term.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "font-inter text-base text-[#525252] dark:text-white/70 leading-relaxed",
                    children: term.content
                  })]
                })]
              })
            }, term.number))
          })
        })
      }), /* @__PURE__ */ jsx(Footer, {})]
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map((match) => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = (event) => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map((page2) => ({
    path: page2.path,
    url: page2.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = (value) => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex w-full items-center gap-2 p-5",
      children: [/* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        children: /* @__PURE__ */ jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */ jsx("path", {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), /* @__PURE__ */ jsx("path", {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex items-center px-[14px] py-[5px]",
          children: /* @__PURE__ */ jsx("span", {
            children: "/"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex items-center min-w-0",
          children: /* @__PURE__ */ jsx("p", {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-medium text-gray-900 px-2",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */ jsxs("p", {
        className: "pt-4 pb-12 px-2 text-gray-500",
        children: ['Looks like "', /* @__PURE__ */ jsxs("span", {
          className: "font-bold",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */ jsx("div", {
        className: "px-[20px] w-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-sm text-black text-left",
              children: "Build it from scratch"
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-sm text-gray-500 text-left",
              children: ['Create a new page to live at "', /* @__PURE__ */ jsxs("span", {
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-row items-center justify-end w-1/2",
            children: /* @__PURE__ */ jsx("button", {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "pb-20 lg:pb-[80px]",
        children: /* @__PURE__ */ jsx("p", {
          className: "flex items-center text-gray-500",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */ jsx("div", {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            children: "PAGES"
          }), siteMap.webPages?.map((route) => /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "font-medium text-gray-900",
              children: route.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-400",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */ jsx("div", {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        children: existingRoutes.map((route) => /* @__PURE__ */ jsx("div", {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          children: /* @__PURE__ */ jsxs("div", {
            className: "w-full flex-1 flex flex-col items-center ",
            children: [/* @__PURE__ */ jsx("div", {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              children: /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover"
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BlXSzoDO.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/index-B6Be22V1.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Cyc8SrN0.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/index-B6Be22V1.js", "/assets/clsx-B-dksMZM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "page": { "id": "page", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-DbYzDHuJ.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/CTASection-DAbWTRhv.js", "/assets/clsx-B-dksMZM.js", "/assets/index-B6Be22V1.js", "/assets/users-CKJXX8NG.js", "/assets/zap-LldR1Pao.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "about/page": { "id": "about/page", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-OilVd3IW.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "click-to-connect/page": { "id": "click-to-connect/page", "parentId": "root", "path": "click-to-connect", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-D1Eqrb_K.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/ExploreFunctionalitiesSection-Bougph-b.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "contact/page": { "id": "contact/page", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-D4ESQIKa.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "documentation/page": { "id": "documentation/page", "parentId": "root", "path": "documentation", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-DjpifLYB.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/users-CKJXX8NG.js", "/assets/zap-LldR1Pao.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/page": { "id": "features/page", "parentId": "root", "path": "features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-Bvhab4pL.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "hotscan/page": { "id": "hotscan/page", "parentId": "root", "path": "hotscan", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-Dm_9vE-k.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/ExploreFunctionalitiesSection-Bougph-b.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "sohub/page": { "id": "sohub/page", "parentId": "root", "path": "sohub", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-CINnQtpL.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/CTASection-DAbWTRhv.js", "/assets/users-CKJXX8NG.js", "/assets/zap-LldR1Pao.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "terms/page": { "id": "terms/page", "parentId": "root", "path": "terms", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-kDbzLhOs.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js", "/assets/Footer-C7JtSYoG.js", "/assets/users-CKJXX8NG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "__create/not-found": { "id": "__create/not-found", "parentId": "root", "path": "*?", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/not-found-QA0VktUH.js", "imports": ["/assets/chunk-JZWAC4HX-Dub_nMHz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-60377528.js", "version": "60377528", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "page": {
    id: "page",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "about/page": {
    id: "about/page",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "click-to-connect/page": {
    id: "click-to-connect/page",
    parentId: "root",
    path: "click-to-connect",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "contact/page": {
    id: "contact/page",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "documentation/page": {
    id: "documentation/page",
    parentId: "root",
    path: "documentation",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "features/page": {
    id: "features/page",
    parentId: "root",
    path: "features",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "hotscan/page": {
    id: "hotscan/page",
    parentId: "root",
    path: "hotscan",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "sohub/page": {
    id: "sohub/page",
    parentId: "root",
    path: "sohub",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "terms/page": {
    id: "terms/page",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "__create/not-found": {
    id: "__create/not-found",
    parentId: "root",
    path: "*?",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
