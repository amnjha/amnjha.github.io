import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { role, company, openToWork, bookCallUrl } from '@config';

const StyledHeroSection = styled.section`
  max-width: var(--content-width);
  padding: 140px 0 40px;

  @media (max-width: 768px) {
    padding: 120px 0 32px;
  }

  h1 {
    margin: 0;
    font-size: clamp(32px, 6vw, 44px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 0.28em;
  }

  .muted {
    color: var(--ink-muted-24);
    font-weight: 600;
  }

  .accent {
    color: var(--primary);

    &:hover,
    &:focus-visible {
      color: var(--primary-focus);
    }
  }

  .avatar {
    display: inline-flex;
    width: 1.3em;
    height: 1.3em;
    margin: 0 0.05em;
    border-radius: var(--radius-md);
    border: 3px solid var(--canvas);
    box-shadow: 0 0 0 1px var(--hairline-alpha);
    transform: rotate(-6deg);
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      transform: rotate(0deg) scale(1.05);
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-left: 0.45em;
    padding: 0 11px 0 8px;
    height: 26px;
    border: 1px solid var(--hairline-alpha);
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    color: var(--ink);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: -0.08px;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    transform: translateY(-0.08em);

    .pulse {
      position: relative;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--status-green-tint);

      &:after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: 50%;
        background-color: var(--status-green);
      }
    }

    @media (max-width: 480px) {
      height: 24px;
      font-size: 10px;
    }
  }

  .cta {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 32px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .book {
      ${({ theme }) => theme.mixins.darkPill};
      flex-shrink: 0;
    }

    p {
      max-width: 360px;
      margin: 0;
      color: var(--ink);
      font-size: var(--fz-md);
      line-height: 1.47;
    }
  }
`;

const Hero = () => (
  <StyledHeroSection id="top">
    <h1>
      <span className="line">
        <span>Hi, I’m</span>
        <span className="avatar">
          <StaticImage
            src="../../images/me.jpg"
            width={120}
            height={120}
            quality={95}
            placeholder="blurred"
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Aman Jha"
          />
        </span>
        <span>Aman Jha!</span>
      </span>
      <span className="line">
        <span className="muted">I’m a</span>
        <span>{role}</span>
        <span className="muted">at</span>
      </span>
      <span className="line">
        <a className="accent" href={company.url} target="_blank" rel="noreferrer">
          {company.name}.
        </a>
        {openToWork && (
          <span className="status">
            <span className="pulse" aria-hidden="true" />
            Open to work
          </span>
        )}
      </span>
    </h1>

    <div className="cta">
      <a className="book" href={bookCallUrl} target="_blank" rel="noreferrer">
        Book a call
      </a>
      <p>Feel free to explore my work and reach out. I’d love to connect!</p>
    </div>
  </StyledHeroSection>
);

export default Hero;
