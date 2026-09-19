import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { email } from '@config';
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
  padding: 0 24px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: var(--transition);

  @media (max-width: 480px) {
    padding: 0 16px;
  }

  ${props =>
    !props.scrolledToTop &&
    css`
      height: var(--nav-scroll-height);
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
    gap: 9px;

    .logo {
      ${({ theme }) => theme.mixins.flexCenter};
      color: var(--ink);
      width: 26px;
      height: 26px;

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
      width: 5px;
      height: 5px;
      margin-top: 8px;
      border-radius: 50%;
      background-color: var(--primary);
    }

    .email {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: -0.1px;
      color: var(--ink);
      padding: 2px 0;

      &:hover,
      &:focus-visible {
        color: var(--primary);
      }
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

        <Menu />
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
