import { css } from 'styled-components';

const pressable = css`
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition);

  &:active {
    transform: scale(0.95);
  }
  &:focus-visible {
    outline: 2px solid var(--primary-focus);
    outline-offset: 2px;
  }
  &:after {
    display: none !important;
  }
`;

/* Signature Apple pill in Action Blue */
const button = css`
  ${pressable};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--on-primary);
  background-color: var(--primary);
  border: 0;
  border-radius: var(--radius-pill);
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  font-weight: 400;
  letter-spacing: -0.374px;
  line-height: 1;
  padding: 13px 22px;
  min-height: 44px;

  &:hover {
    background-color: var(--primary-focus);
    color: var(--on-primary);
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--primary);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--primary);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--primary-focus);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--primary-focus) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--primary);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  bigButton: css`
    ${button};
    font-size: 18px;
    font-weight: 300;
    padding: 14px 28px;
  `,

  /* Compact dark utility rect (Sign In / Bag grammar) */
  smallButton: css`
    ${pressable};
    display: inline-flex;
    align-items: center;
    color: var(--on-dark);
    background-color: var(--ink);
    border: 0;
    border-radius: var(--radius-sm);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 400;
    letter-spacing: -0.224px;
    line-height: 1.29;
    padding: 8px 15px;

    &:hover {
      background-color: var(--ink-muted-80);
      color: var(--on-dark);
    }
  `,

  /* Dark pill, used for the hero CTA and selected chips */
  darkPill: css`
    ${button};
    background-color: var(--ink);

    &:hover {
      background-color: var(--ink-muted-80);
    }
  `,

  /* Pearl capsule secondary button */
  pearlCapsule: css`
    ${pressable};
    display: inline-flex;
    align-items: center;
    color: var(--ink-muted-80);
    background-color: var(--surface-pearl);
    border: 1px solid var(--hairline-alpha);
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    letter-spacing: -0.224px;
    line-height: 1.29;
    padding: 8px 14px;

    &:hover {
      color: var(--ink);
      border-color: var(--ink-muted-24);
    }
  `,

  /* Store utility card: white, hairline, 18px radius, no shadow */
  card: css`
    background-color: var(--canvas);
    border: 1px solid var(--hairline-alpha);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
  `,

  boxShadow: css`
    border: 1px solid var(--hairline-alpha);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      border-color: var(--ink-muted-24);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-md);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--primary);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
