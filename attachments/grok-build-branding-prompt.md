Make the app fully white-labelled with OUR name and logo everywhere. Nothing should show "Grok", the Grok logo or a default icon: not in the browser, not during install, and not after install. Use the attached logo file safai-logo-final.png (1024×1024: white clipboard with green ticks and a yellow broom on a blue rounded square) as the app icon.

App name: "सफाई निरीक्षण – नगरपालिका खरखौदा"
Short name (shown under the home-screen icon): "सफाई निरीक्षण"
Theme colour: #1a56db. Background colour: #ffffff.

1. Web App Manifest (manifest.webmanifest / manifest.json):
   - "name": "सफाई निरीक्षण – नगरपालिका खरखौदा"
   - "short_name": "सफाई निरीक्षण"
   - "start_url": "/", "scope": "/", "display": "standalone", "orientation": "portrait"
   - "theme_color": "#1a56db", "background_color": "#ffffff", "lang": "hi"
   - "icons": generate from our logo at 48, 72, 96, 128, 144, 152, 192, 256, 384 and 512 px (PNG).
     - Include "purpose": "any" icons.
     - Also include separate "purpose": "maskable" icons at 192 and 512, with the logo inside the safe zone (about 80% centre) on a #1a56db background.
   - Remove any Grok-provided or default manifest and icons. Link only ours with <link rel="manifest">.

2. HTML <head>:
   - <title>सफाई निरीक्षण – नगरपालिका खरखौदा</title>
   - favicon.ico (16/32/48) and favicon.png from our logo. Also <link rel="apple-touch-icon" sizes="180x180"> with our logo.
   - <meta name="theme-color" content="#1a56db">, <meta name="application-name" content="सफाई निरीक्षण">
   - <meta name="apple-mobile-web-app-capable" content="yes">, <meta name="apple-mobile-web-app-title" content="सफाई निरीक्षण">, <meta name="apple-mobile-web-app-status-bar-style" content="default">
   - Open Graph and share preview tags (og:title, og:description, og:image) with our name and logo, so shared links (WhatsApp etc.) show our logo, not Grok's.
   - Remove any "Built with Grok" / "Made with" badge, watermark, footer, or meta "generator" tag.

3. Install prompt and splash screen:
   - Add our own "App इंस्टॉल करें" button using the beforeinstallprompt event. It shows our logo and name.
   - The Android splash screen (made from the manifest name + background_color + 512 icon) must show our logo and name.
   - For iOS, add apple-touch-startup-image splash images with our logo on white.

4. Service worker:
   - Register our own service worker (sw.js) so the app installs as a real PWA and opens offline to the login screen.
   - Cache the manifest and icons. Bump the cache version so old Grok icons are not served from the cache.

5. After install:
   - The home-screen icon, app switcher, notification icon and title bar must all show our logo and "सफाई निरीक्षण".
   - Check this on Android Chrome and iPhone Safari ("Add to Home Screen"), and tell me if anything still shows Grok.

If the hosting platform forces its own branding at a level I can't change in code, tell me exactly where it appears.
