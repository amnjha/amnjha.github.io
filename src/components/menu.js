import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { navLinks, resumePath, email, bookCallUrl } from '@config';
import { KEY_CODES } from '@utils';
import { useOnClickOutside } from '@hooks';

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

/* button-icon-circular: 44px translucent chip, ink icon */
const StyledMenuButton = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  position: relative;
  z-index: 10;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-pill);
  background-color: var(--surface-chip);
  color: var(--ink);
  transition: var(--transition);

  &:hover {
    background-color: var(--hairline);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus-visible {
    outline: 2px solid var(--primary-focus);
    outline-offset: 2px;
  }

  .lines {
    position: relative;
    width: 18px;
    height: 12px;
  }

  .line {
    position: absolute;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background-color: currentColor;
    transition: var(--transition);

    &.top {
      top: 0;
      width: 18px;
      transform: ${props => (props.menuOpen ? 'translateY(5px) rotate(45deg)' : 'none')};
    }
    &.bottom {
      top: 10px;
      width: ${props => (props.menuOpen ? '18px' : '11px')};
      transform: ${props => (props.menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none')};
    }
  }
`;

const StyledSidebar = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 50px 24px;
  width: min(75vw, 400px);
  height: 100vh;
  outline: 0;
  background-color: rgba(245, 245, 247, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid var(--hairline-alpha);
  z-index: 9;
  transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
  visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
  transition: var(--transition);

  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    color: var(--ink);
    text-align: center;
  }

  ol {
    ${({ theme }) => theme.mixins.resetList};
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 4px;
    }

    a {
      ${({ theme }) => theme.mixins.link};
      display: block;
      width: 100%;
      padding: 12px 20px;
      border-radius: var(--radius-md);
      font-size: var(--fz-lg);
      font-weight: 600;
      letter-spacing: -0.01em;

      &:hover,
      &:focus-visible {
        background-color: var(--canvas);
        color: var(--ink);
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 32px;
  }

  .book-link {
    ${({ theme }) => theme.mixins.darkPill};
    width: 100%;
  }

  .resume-link {
    ${({ theme }) => theme.mixins.pearlCapsule};
    justify-content: center;
    width: 100%;
    min-height: 44px;
  }

  .email-link {
    margin-top: 24px;
    font-size: var(--fz-sm);
    color: var(--ink-muted-48);
  }
`;

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const buttonRef = useRef(null);
  const navRef = useRef(null);

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false);
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    setFocusables();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const wrapperRef = useRef();
  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <div ref={wrapperRef}>
        <StyledMenuButton
          onClick={toggleMenu}
          menuOpen={menuOpen}
          ref={buttonRef}
          aria-label="Menu"
          aria-expanded={menuOpen}>
          <span className="lines" aria-hidden="true">
            <span className="line top" />
            <span className="line bottom" />
          </span>
        </StyledMenuButton>

        <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link to={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
            )}

            <div className="actions">
              <a href={bookCallUrl} className="book-link" target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
              <a
                href={resumePath}
                className="resume-link"
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </div>

            <a href={`mailto:${email}`} className="email-link">
              {email}
            </a>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
