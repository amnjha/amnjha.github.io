import { css } from 'styled-components';

/*
  Design tokens follow the Apple design language:
  one Action Blue accent, near-black ink, white / parchment canvases,
  hairline borders, pill CTAs and 18px utility cards.
*/
const variables = css`
  :root {
    /* Apple tokens */
    --primary: #0066cc;
    --primary-focus: #0071e3;
    --primary-on-dark: #2997ff;
    --primary-tint: rgba(0, 102, 204, 0.08);
    --ink: #1d1d1f;
    --ink-muted-80: #333333;
    --ink-muted-48: #7a7a7a;
    --ink-muted-24: #b8b8bd;
    --divider-soft: #f0f0f0;
    --hairline: #e0e0e0;
    --hairline-alpha: rgba(0, 0, 0, 0.08);
    --canvas: #ffffff;
    --canvas-parchment: #f5f5f7;
    --surface-pearl: #fafafc;
    --surface-tile-1: #272729;
    --surface-black: #000000;
    --surface-chip: rgba(210, 210, 215, 0.64);
    --on-primary: #ffffff;
    --on-dark: #ffffff;
    --product-shadow: rgba(0, 0, 0, 0.22) 3px 5px 30px 0;

    /* Legacy names used by the blog, archive and post pages, remapped to the light palette */
    --dark-navy: var(--canvas-parchment);
    --navy: var(--canvas);
    --light-navy: var(--canvas-parchment);
    --lightest-navy: var(--hairline);
    --navy-shadow: rgba(0, 0, 0, 0.08);
    --dark-slate: var(--ink-muted-48);
    --slate: var(--ink-muted-80);
    --light-slate: var(--ink-muted-80);
    --lightest-slate: var(--ink);
    --white: var(--ink);
    --green: var(--primary);
    --green-tint: var(--primary-tint);
    --pink: var(--primary);
    --blue: var(--primary);

    --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter',
      system-ui, 'Segoe UI', Helvetica, Arial, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 10px;
    --fz-xs: 12px;
    --fz-sm: 14px;
    --fz-md: 17px;
    --fz-lg: 21px;
    --fz-xl: 24px;
    --fz-xxl: 28px;
    --fz-heading: 40px;
    --fz-hero: 56px;

    --radius-xs: 5px;
    --radius-sm: 8px;
    --radius-md: 11px;
    --radius-lg: 18px;
    --radius-pill: 9999px;
    --border-radius: var(--radius-sm);

    --space-xxs: 4px;
    --space-xs: 8px;
    --space-sm: 12px;
    --space-md: 17px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-xxl: 48px;
    --space-section: 80px;

    --content-width: 760px;
    --nav-height: 88px;
    --nav-scroll-height: 64px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
