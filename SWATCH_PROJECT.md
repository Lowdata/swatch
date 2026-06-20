# Swatch Project - Feature Documentation

This document explains the architecture, logic, and core features behind **Swatch v2**, a premium developer design utility for generating CSS values and UI themes.

---

## 1. Global Layout & Architecture
- **Tech Stack**: Built with Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, and shadcn/ui.
- **Layout Logic**: The application uses a split-pane responsive layout (`app/page.tsx`). On desktop, it features a fixed 300px sidebar on the left for navigation tabs and the footer, leaving the right side as a flexible "Stage" for the actual generator tools. On mobile, the flex-direction flips to a single column so the navigation stacks cleanly on top.
- **Copy Feedback**: A global `Toaster` component from `react-hot-toast` is mounted in `app/layout.tsx` to provide accessible visual feedback whenever a user copies code to their clipboard.

---

## 2. Core UI Components

To ensure the application feels like a premium utility rather than a basic dashboard, several custom reusable components were built:

### Chip Preview (`ChipPreview`)
- **What it does**: Acts as the visual canvas for all previews (shadows, gradients, palettes).
- **How it works**: It is styled to resemble a physical paint chip you would find in a hardware store. It uses CSS `aspect-ratio` to maintain its card shape, and features a subtle absolute-positioned `div` styled as an inner-shadowed "punch hole" at the top center.

### Ticket Output (`TicketOutput`)
- **What it does**: Displays the generated code (CSS & Tailwind) for the user to copy.
- **How it works**: Styled like a perforated receipt/ticket. It uses a row of tiny rounded `div`s rendered in an absolute container with negative margin at the top edge to simulate the "torn paper" look. It takes `css` and `tailwind` string props, rendering them in monospace blocks with built-in clipboard copying (`navigator.clipboard.writeText`).

### Preset Chips (`PresetChip`)
- **What it does**: Allows users to quickly select predefined starting configurations.
- **How it works**: A simple, pill-shaped button that executes an `onClick` handler. Instead of hiding presets inside native HTML `<select>` dropdowns (which feel basic), they are exposed as a row of sleek buttons.

---

## 3. The Generators

### Shadow Generator
- **What it does**: Allows fine-tuning of CSS `box-shadow` properties (X, Y, Blur, Spread, Opacity, Color) and previews them on the Chip Preview.
- **How it works**: 
  - Standard `<input type="range">` sliders bind to React state.
  - A custom `hexToRgb` helper converts the standard hex color picker output (`#000000`) into `r, g, b` integers.
  - The final shadow string is dynamically concatenated: `x y blur spread rgba(r,g,b, opacity)`.

### Gradient Generator
- **What it does**: Generates a two-color CSS `linear-gradient` based on an adjustable angle.
- **How it works**: 
  - The user can adjust the angle (0-360) and pick colors for multiple "stops" (0% and 100%).
  - It compiles into standard CSS: `linear-gradient({angle}deg, {color1} 0%, {color2} 100%)` and directly applies it to the `background` style of the Chip Preview.

### Palette Generator
- **What it does**: Generates a mathematically harmonious 5-color palette based on a single base color.
- **How it works**: 
  - It uses an analogous color theory approach. 
  - When the user selects a base HEX color, the app converts it to HSL (Hue, Saturation, Lightness).
  - It keeps the Saturation and Lightness exactly the same, but mathematically adds and subtracts exactly 15 and 30 degrees to the Hue (`h-30`, `h-15`, `h`, `h+15`, `h+30`). 
  - It converts these new HSL values back to HEX and displays them side-by-side.

---

## 4. AI Theme Generator
- **What it does**: Takes a short text prompt (under 100 words) describing a brand or startup, and uses Artificial Intelligence to instantly construct a full design system (Primary, Secondary, Accent, Background, Text colors, plus a complimentary Shadow and Gradient).
- **How it works**:
  - **Frontend**: The user types a prompt. A word counter dynamically splits the string by spaces to enforce the 100-word limit. If valid, it sends a `POST` request to `/api/theme`.
  - **Backend (`route.ts`)**: Initializes the `@google/genai` SDK using a server-side `GEMINI_API_KEY`. 
  - **Strict Failsafe**: The backend passes a strict `systemInstruction` to the `gemini-2.5-flash` model. The prompt instructs the AI to evaluate if the input is actually a business/brand. If it's a joke or an essay, the AI is forced to return a hardcoded JSON error object (`{"error": "We only generate..."}`). 
  - **JSON Output**: The AI is configured with `responseMimeType: "application/json"`, guaranteeing the response is clean, parseable JSON containing the exact HEX codes needed.
  - **Rendering**: The frontend parses the JSON and renders a beautiful mock "Brand Name" layout right inside the Chip Preview, while injecting the generated variables into the Ticket Output.
