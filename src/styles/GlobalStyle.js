import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--primary);
    color: var(--on-primary);
  }

  :focus {
    outline: 2px solid var(--primary-focus);
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  :focus-visible {
    outline: 2px solid var(--primary-focus);
    outline-offset: 3px;
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: var(--ink-muted-24) var(--canvas);
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: var(--canvas);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--ink-muted-24);
    border: 3px solid var(--canvas);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--canvas);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    font-weight: 400;
    letter-spacing: -0.374px;
    line-height: 1.47;

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
    min-height: 100vh;
    padding: 160px 48px;

    @media (max-width: 1080px) {
      padding: 160px 40px;
    }
    @media (max-width: 768px) {
      padding: 140px 24px;
    }
    @media (max-width: 480px) {
      padding: 120px 16px;
    }

    &.fillHeight {
      padding: 0 48px;

      @media (max-width: 1080px) {
        padding: 0 40px;
      }
      @media (max-width: 768px) {
        padding: 0 24px;
      }
      @media (max-width: 480px) {
        padding: 0 16px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: var(--space-section) 0;
    max-width: 980px;

    @media (max-width: 768px) {
      padding: 48px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(34px, 6vw, var(--fz-hero));
    line-height: 1.07;
    letter-spacing: -0.28px;
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(28px, 5vw, var(--fz-heading));
    line-height: 1.1;
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--primary);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-lg));
      font-weight: 400;
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--hairline);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--primary);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    font-family: var(--font-sans);
  }

  input, textarea {
    border-radius: 0;
    outline: 0;
    font-family: var(--font-sans);

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--canvas-parchment);
      color: var(--ink);
      font-size: var(--fz-sm);
      border-radius: var(--radius-xs);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      ${({ theme }) => theme.mixins.fancyList};
    }
  }

  blockquote {
    border-left-color: var(--primary);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: var(--fz-xl);
      font-weight: 300;
    }
  }

  hr {
    background-color: var(--hairline);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
      transform: none;
    }
  }

  #logo {
    color: var(--ink);
  }

  .overline {
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
  }

  .subtitle {
    color: var(--ink-muted-48);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-weight: 400;
    line-height: 1.5;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--primary);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: -0.224px;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};
`;

export default GlobalStyle;
