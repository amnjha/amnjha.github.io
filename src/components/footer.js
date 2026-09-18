import React from 'react';
import styled from 'styled-components';
import { socialMedia, email } from '@config';
import { Icon } from '@components/icons';

const StyledFooter = styled.footer`
  background-color: var(--canvas-parchment);
  color: var(--ink-muted-80);
  padding: 40px 48px;

  @media (max-width: 1080px) {
    padding: 40px 40px;
  }
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
  @media (max-width: 480px) {
    padding: 32px 16px;
  }

  .inner {
    ${({ theme }) => theme.mixins.flexBetween};
    max-width: var(--content-width);
    margin: 0 auto;
    gap: 16px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .credit {
    font-size: var(--fz-xs);
    letter-spacing: -0.12px;
    line-height: 1.6;

    a {
      color: var(--ink-muted-80);

      &:hover,
      &:focus-visible {
        color: var(--primary);
      }
    }
  }
`;

const StyledSocialLinks = styled.div`
  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    ${({ theme }) => theme.mixins.resetList};
    gap: 4px;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 40px;
      height: 40px;
      border-radius: var(--radius-pill);
      color: var(--ink-muted-80);

      &:hover,
      &:focus-visible {
        color: var(--primary);
        background-color: var(--canvas);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const Footer = () => (
  <StyledFooter id="contact">
    <div className="inner">
      <div className="credit">
        <div>
          Designed &amp; built by <a href="https://github.com/amnjha/amnjha.github.io">Aman Jha</a>
        </div>
        <div>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>

      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>
    </div>
  </StyledFooter>
);

export default Footer;
