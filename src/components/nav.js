import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { email, navLinks, resumePath } from '@config';
import { useScrollDirection } from '@hooks';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  width: 100%;
  height: var(--nav-height);
  padding: 0 48px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }

  ${props =>
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
      border-bottom-color: var(--hairline-alpha);
    `};

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        transform: translateY(calc(var(--nav-scroll-height) * -1));
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  color: var(--ink);
  z-index: 12;

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;

    .logo {
      ${({ theme }) => theme.mixins.flexCenter};
      color: var(--ink);
      width: 34px;
      height: 34px;

      svg {
        fill: none;
        stroke: currentColor;
        transition: var(--transition);
        user-select: none;
      }

      &:hover,
      &:focus-visible {
        color: var(--primary);
        outline: 0;
      }
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--primary);

      @media (max-width: 400px) {
        display: none;
      }
    }

    .email {
      font-size: var(--fz-sm);
      letter-spacing: -0.224px;
      color: var(--ink);
      padding: 2px 0;

      &:hover,
      &:focus-visible {
        color: var(--primary);
      }

      @media (max-width: 400px) {
        display: none;
      }
    }
  }

  .links {
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
      display: none;
    }

    ol {
      ${({ theme }) => theme.mixins.resetList};
      display: flex;
      align-items: center;
      gap: 4px;

      a {
        display: inline-flex;
        align-items: center;
        min-height: 36px;
        padding: 0 12px;
        border-radius: var(--radius-pill);
        font-size: var(--fz-sm);
        letter-spacing: -0.224px;
        color: var(--ink-muted-80);

        &:hover,
        &:focus-visible {
          color: var(--ink);
          background-color: var(--canvas-parchment);
        }
      }
    }

    .resume-button {
      ${({ theme }) => theme.mixins.smallButton};
      margin-left: 8px;
    }
  }
`;

const Nav = ({ isHome }) => {
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Logo = isHome ? (
    <a href="/" aria-label="home" className="logo">
      <IconLogo />
    </a>
  ) : (
    <Link to="/" aria-label="home" className="logo">
      <IconLogo />
    </Link>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <div className="brand">
          {Logo}
          <span className="dot" aria-hidden="true" />
          <a className="email" href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <div className="links">
          {navLinks && (
            <ol>
              {navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link to={url}>{name}</Link>
                </li>
              ))}
            </ol>
          )}
          <a className="resume-button" href={resumePath} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>

        <Menu />
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
