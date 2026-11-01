import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PwaChrome } from "@/components/safai/pwa";
import appCss from "../styles.css?url";
import appCssText from "../styles.css?inline";

const APP = "सफाई निरीक्षण – नगरपालिका खरखौदा क्षेत्र";
const SHORT = "सफाई निरीक्षण";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP },
      { name: "application-name", content: SHORT },
      { name: "description", content: "नगरपालिका खरखौदा क्षेत्र का सफाई निरीक्षण फॉर्म।" },
      { name: "theme-color", content: "#1a56db" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: SHORT },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-startup-image", href: "/splash/iphone-se.png", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" },
      { rel: "apple-touch-startup-image", href: "/splash/iphone-x.png", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/splash/iphone-14.png", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/splash/iphone-15.png", media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/splash/iphone-15pm.png", media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/splash/ipad.png", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@500;600;700;800&family=Noto+Sans:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: appCssText.replace(/<\/style/gi, "<\\/style") }} />
        <style>{`#boot{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1a56db;text-align:center;font-family:sans-serif}#boot img{width:96px;height:96px;border-radius:28px}#boot h1{margin:16px 0 0;color:#fff !important;font-size:28px;font-weight:800}#boot p{margin:6px 0 0;color:#fff !important;font-size:16px;opacity:.92}html.desk-lock body{width:430px !important;max-width:430px !important}html.desk-lock .fixed{left:0 !important;right:auto !important;margin-left:0 !important;margin-right:0 !important;transform:none !important;width:430px !important;max-width:430px !important}html.desk-lock .fixed.bottom-0{bottom:var(--desk-bottom) !important}html.desk-lock .fixed.inset-0{top:0 !important;bottom:var(--desk-bottom) !important;height:auto !important}html.desk-lock #boot{left:0 !important;right:auto !important;width:430px !important;bottom:var(--desk-bottom) !important}`}</style>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var added=false;var last=0;function pin(){if(added)return;added=true;var m=document.createElement("meta");m.setAttribute("name","viewport");m.setAttribute("content","width=device-width, initial-scale=1, viewport-fit=cover");document.head.appendChild(m)}function fit(){var now=Date.now();if(now-last<350)return;last=now;var touch=navigator.maxTouchPoints>0;var w=window.innerWidth;var root=document.documentElement;if(touch&&w>700)pin();requestAnimationFrame(function(){w=window.innerWidth;if(!touch||w<700){root.classList.remove("desk-lock");root.style.zoom="";return}var scale=w/430;root.classList.add("desk-lock");root.style.zoom=String(scale);root.style.setProperty("--desk-bottom",(window.innerHeight*(1-1/scale))+"px")})}fit();window.addEventListener("resize",fit);window.addEventListener("orientationchange",fit)})();`,
          }}
        />
      </head>
      <body>
        <div id="boot">
          <img src="/logo.png" alt="" />
          <h1>सफाई निरीक्षण फॉर्म</h1>
          <p>नगरपालिका खरखौदा क्षेत्र</p>
        </div>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <PwaChrome />
        <Scripts />
      </body>
    </html>
  ),
});
