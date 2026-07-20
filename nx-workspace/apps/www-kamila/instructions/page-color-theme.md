> **Role & Objective**
> Act as an expert Frontend Developer specializing in Angular. Your task is to build a responsive, single-page website (One-Pager) for an Interior & Wellbeing Architect. The design must be elegant, calming, and deeply inspired by nature, utilizing a provided botanical theme.
> **Tech Stack**
>
> - Framework: Angular
> - UI Components: PrimeNG (Theme: `aura-light-green` or `lara-light-teal`)
> - Styling & Layout: Tailwind CSS
> - Icons: `ng-icons` (specifically Tabler Icons suite)
>
> **Strict Architecture Rules**
>
> - **Layout Generation:** You must use Tailwind CSS strictly for all layout management, grids, spacing, typography, and responsive behaviors. Do not use PrimeFlex under any circumstances.
> - **Component Usage:** Use PrimeNG components for complex UI elements (like carousels, dialogs, smooth scrolling features, or advanced buttons), but wrap and position them using Tailwind CSS.
>
> **Design System & Visuals**
>
> - **Color Palette (Tailwind Custom Colors):** Configure `tailwind.config.js` with:
> - `sage-green`: #7a9a83
> - `forest-green`: #3f5344
> - `gold-accent`: #c7a977
> - `warm-white`: #faf9f6
> - `charcoal`: #4a4a4a
>
> - **Graphic Assets Integration:** The design relies heavily on botanical watercolor assets.
> - Use `lewy górny narożnik.jpg` as an absolute-positioned decorative asset in the top-left corner of the Hero section.
> - Use `prawy dolny naroznik.jpg` as an absolute-positioned decorative asset in the bottom-right corner of the Hero or Footer sections.
> - Reference `Clipboard_04-28-2026_02.jpg` for the central logo placement (a diamond shape with the letter K).
> - Reference `grafika na fb.jpg` for the general mood: clean typography, earthy background blocks mixed with high-quality interior photos featuring lush green plants.
>
> **Structure & Content Requirements**
> Implement a sticky navigation bar with smooth scrolling to the following sections:
>
> 1. **Hero Section:** Full screen, warm-white background, featuring the corner botanical graphics. Main heading: "Kamila Denis Architekt Wnętrz | Architekt Dobrostanu". Include a call-to-action button.
> 2. **Pain Point / Philosophy:** A clean layout with ample white space. Split into two columns on desktop: text on one side, interior detail image on the other.
> 3. **Senses & Nature (Grid Section):** Create a responsive grid (1 column on mobile, 2 or 4 on desktop) displaying 4 cards. Use `ng-icons` (Tabler) representing plants, stones, and aromatherapy inside the cards.
> 4. **About Me (Storytelling):** A distinct section with a subtle `sage-green` background block. Center a large blockquote for the "Design your joy" manifest.
> 5. **Workshops:** A highlighted, bordered, or elevated card section promoting the proprietary workshop.
> 6. **Footer/CTA:** Minimalist, utilizing `prawy dolny naroznik.jpg` for decoration. Large CTA button to initiate contact.
>
> **Execution Step**
> Please start by generating the `tailwind.config.js` to establish the color palette, and then provide the HTML/TS structure for the overarching `app.component` containing the layout wrapper and the navigation bar.
