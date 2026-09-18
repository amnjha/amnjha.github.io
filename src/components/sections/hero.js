import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { role, company, openToWork, bookCallUrl } from '@config';

const StyledHeroSection = styled.section`
  max-width: var(--content-width);
  padding: 118px 0 30px;

  @media (max-width: 768px) {
    padding: 104px 0 24px;
  }

  h1 {
    margin: 0;
    font-size: clamp(28px, 6vw, 34px);
    font-weight: 600;
    line-height: 1.38;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 0.26em;
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
    width: 1.55em;
    height: 1.55em;
    margin: 0 0.02em;
    border-radius: 50%;
    border: 3px solid var(--canvas);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.14);
    transform: rotate(-8deg);
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      transform: rotate(0deg) scale(1.05);
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-left: 0.55em;
    padding: 0 10px 0 7px;
    height: 24px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
    box-shadow: var(--pill-shadow);
    color: var(--ink);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: -0.05px;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;

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
  }

  .cta {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 22px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    .book {
      ${({ theme }) => theme.mixins.darkPill};
      flex-shrink: 0;
      min-height: 40px;
      padding: 12px 20px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.1px;
    }

    p {
      max-width: 320px;
      margin: 0;
      color: var(--ink);
      font-size: 13px;
      font-weight: 400;
      letter-spacing: -0.1px;
      line-height: 1.55;
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
      <p>Feel free to explore my portfolio and reach out —I’d love to connect!</p>
    </div>
  </StyledHeroSection>
);

export default Hero;
