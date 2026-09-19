import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

/*
  The page is designed at a fixed 540px column. On larger laptop and desktop
  viewports the whole layout is scaled up, in steps that keep the hero and the
  bento grid inside a single viewport height.
*/
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-width: 1180px) and (min-height: 790px) {
    zoom: 1.06;
  }
  @media (min-width: 1280px) and (min-height: 860px) {
    zoom: 1.15;
  }
  @media (min-width: 1360px) and (min-height: 900px) {
    zoom: 1.2;
  }
  @media (min-width: 1440px) and (min-height: 970px) {
    zoom: 1.3;
  }
  @media (min-width: 1600px) and (min-height: 1060px) {
    zoom: 1.42;
  }
  @media (min-width: 1700px) and (min-height: 1110px) {
    zoom: 1.48;
  }
  @media (min-width: 2000px) and (min-height: 1300px) {
    zoom: 1.74;
  }
  @media (min-width: 2400px) and (min-height: 1500px) {
    zoom: 2;
  }
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, []);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          <StyledContent>
            <Nav isHome={isHome} />

            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
