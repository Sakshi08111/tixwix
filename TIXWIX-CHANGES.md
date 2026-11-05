# Tixwix site update

- Rebranded visible UI from Event Rockerz/Heyeve to Tixwix.
- Added your supplied logo and dark-theme transparent navbar mark at `public/images/tixwix-*`.
- Connected local image files to Home, About, Categories, and Events page backgrounds/collages.
- The original uploaded ZIP did **not** contain a dedicated Events hero photo, so that page temporarily uses `about-hero-background.png`. To use a unique photo, place `events-hero-background.webp` in `public/images` and update `src/pages/Events.css`.
- `.env.local`, Git history, node_modules, and dist were deliberately excluded from this share. Keep your existing `.env.local` safely on your machine; never commit secrets.

Run `npm install` then `npm run build` to test.
