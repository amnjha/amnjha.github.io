import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { location, reading, process, socialMedia } from '@config';
import { Icon } from '@components/icons';

const CARD = 168;

const StyledBento = styled.section`
  max-width: var(--content-width);
  padding: 0 0 64px;

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: minmax(${CARD}px, auto);
    gap: 18px;

    @media (max-width: 560px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 400px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .span-2 {
    grid-column: span 2;

    @media (max-width: 400px) {
      grid-column: span 1;
    }
  }
`;

/* Reference card: light surface, soft lift, 20px radius, white label pill */
const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 14px;
  overflow: hidden;
  border-radius: 20px;
  background-color: var(--card);
  box-shadow: var(--card-shadow);

  .label {
    align-self: flex-start;
    margin-bottom: 10px;
    padding: 5px 9px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
    box-shadow: var(--pill-shadow);
    color: var(--ink);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: -0.05px;
    line-height: 1.2;
    pointer-events: none;
    white-space: nowrap;
  }

  h3 {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.1px;
  }

  .meta {
    color: var(--ink-muted-24);
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.35;
  }
`;

const ExperienceCard = styled(Card)`
  height: ${CARD}px;

  .timeline {
    ${({ theme }) => theme.mixins.resetList};
    position: relative;
    flex: 1;
    min-height: 0;
    margin: 4px 0 0 4px;
    padding: 6px 0 6px 14px;
    overflow-y: auto;
    scrollbar-width: none;
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 88%, transparent);
    mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 88%, transparent);

    &::-webkit-scrollbar {
      display: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 2px;
      width: 1px;
      background-color: var(--ink-muted-24);
    }

    li {
      position: relative;
      padding-bottom: 11px;

      &:before {
        content: '';
        position: absolute;
        top: 4px;
        left: -14.5px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--ink);
      }
    }

    h3 {
      font-size: 10px;
    }

    .meta {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    a {
      color: inherit;
    }
  }
`;

const WorkCard = styled(Card)`
  align-items: center;

  .label {
    align-self: flex-start;
  }

  .stack {
    position: relative;
    width: 100%;
    height: 84px;
    margin-top: 2px;
  }

  .shot {
    position: absolute;
    top: 6px;
    left: 50%;
    width: 78px;
    height: 58px;
    border-radius: 8px;
    border: 2.5px solid var(--canvas);
    overflow: hidden;
    background-color: var(--canvas);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
    transition: var(--transition);

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }

    &:nth-child(1) {
      transform: translateX(-88%) translateY(6px) rotate(-14deg);
      z-index: 1;
    }
    &:nth-child(2) {
      transform: translateX(-12%) translateY(6px) rotate(12deg);
      z-index: 2;
    }
    &:nth-child(3) {
      transform: translateX(-50%) scale(1.06);
      z-index: 3;
    }

    &:hover,
    &:focus-visible {
      z-index: 4;
      transform: translateX(-50%) rotate(0deg) scale(1.1);
    }
  }

  .title {
    margin-top: 2px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: -0.1px;
    color: var(--ink);
  }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 3px;
    font-size: 8.5px;
    font-weight: 500;
    color: var(--ink-muted-48);

    svg {
      width: 9px;
      height: 9px;
      color: var(--primary);
    }

    &:hover,
    &:focus-visible {
      color: var(--primary);
    }
  }
`;

const ReadingCard = styled(Card)`
  h3 {
    max-width: 13ch;
  }

  .meta {
    margin-top: 2px;
  }

  /* Lighter inset panel, centred, running off the card's bottom edge */
  .frame {
    position: relative;
    flex: 1;
    width: 66%;
    min-height: 72px;
    margin: 10px auto -14px;
    border-radius: 14px 14px 0 0;
    background-color: var(--canvas);
    overflow: hidden;
  }

  /* 3D hardcover seen from an angle */
  .book {
    position: absolute;
    left: 24%;
    top: 12%;
    display: block;
    width: 96px;
    height: 132px;
    perspective: 520px;
    perspective-origin: 20% 20%;
    color: inherit;

    &:hover .book3d,
    &:focus-visible .book3d {
      transform: rotateX(4deg) rotateY(20deg) rotateZ(-8deg) translateY(-3px);
    }
  }

  .book3d {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transform: rotateX(6deg) rotateY(30deg) rotateZ(-13deg);
    transition: transform 0.45s var(--easing);
  }

  .cover,
  .back,
  .pages {
    position: absolute;
    display: block;
  }

  .cover {
    inset: 0;
    overflow: hidden;
    border-radius: 1px 3px 3px 1px;
    background-color: var(--surface-tile-1);
    transform: translateZ(0);
    box-shadow: var(--product-shadow);

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0.28) 0%,
        rgba(255, 255, 255, 0) 32%,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 0.14) 100%
      );
    }
  }

  .back {
    inset: 0;
    border-radius: 1px 3px 3px 1px;
    background-color: #b0342a;
    transform: translateZ(-16px);
  }

  .pages {
    top: 2px;
    bottom: 2px;
    left: 0;
    width: 16px;
    transform-origin: left center;
    transform: rotateY(-90deg) translateX(-16px);
    background-color: #f6f6f4;
    background-image: repeating-linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0 1.5px,
      rgba(0, 0, 0, 0.09) 1.5px 2.5px
    );
    box-shadow: inset -4px 0 6px rgba(0, 0, 0, 0.12);
  }

  /* Typographic fallback shown until a cover image is added */
  .cover-fallback {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 10px 8px;
    background-color: var(--surface-tile-1);
    color: var(--on-dark);
    font-family: Georgia, 'Times New Roman', serif;

    .t {
      font-size: 10px;
      line-height: 1.15;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .a {
      font-size: 6px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #cccccc;
    }
  }
`;

const MapCard = styled(Card)`
  padding: 0;
  background-color: var(--canvas);

  .label {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
    margin: 0;
  }

  .map {
    position: absolute !important;
    inset: 0;
    width: 100%;
    height: 100%;

    img {
      transform: scale(1.3);
      transform-origin: 35% 25%;
    }
  }

  .place {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding: 40px 12px 14px;
    text-align: center;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--canvas) 48%);

    .city {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--ink);
    }
    .country {
      margin-top: 1px;
      font-size: 7px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--ink-muted-24);
    }
    .coords {
      margin-top: 3px;
      font-size: 6px;
      letter-spacing: 0.1em;
      color: var(--ink-muted-24);
    }
  }
`;

const ProcessCard = styled(Card)`
  .step {
    flex: 1;
    padding: 12px 0 12px;
  }

  .step h3 {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .step p {
    margin: 0;
    color: var(--ink-muted-48);
    font-size: 8.5px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0;
    max-width: 60ch;
  }

  .tabs {
    display: flex;
    gap: 2px;
    margin-top: auto;
    padding: 3px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
    box-shadow: var(--pill-shadow);
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tab {
    flex: 1;
    min-width: max-content;
    min-height: 26px;
    padding: 0 12px;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--ink);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: -0.05px;
    transition: var(--transition);

    &:hover {
      color: var(--primary);
    }
    &:active {
      transform: scale(0.95);
    }
    &:focus-visible {
      outline: 2px solid var(--primary-focus);
      outline-offset: 1px;
    }

    &[aria-selected='true'] {
      background-color: var(--ink);
      color: var(--on-dark);
    }
  }
`;

const Bento = () => {
  const data = useStaticQuery(graphql`
    {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
          }
        }
      }
      shots: allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          relativeDirectory: { regex: "/^featured/" }
          extension: { in: ["png", "jpg", "jpeg"] }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              external
              github
            }
          }
        }
      }
      bookCovers: allFile(
        filter: { sourceInstanceName: { eq: "images" }, relativeDirectory: { eq: "books" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 300, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
  `);

  const jobs = data.jobs.edges.map(({ node }) => node.frontmatter);
  const shots = data.shots.nodes.slice(0, 3);
  const featured = data.featured.edges.map(({ node }) => node.frontmatter);
  const bookCover = getImage(data.bookCovers.nodes.find(n => n.name === reading.cover));
  const github = (socialMedia.find(s => s.name === 'GitHub') || {}).url;

  const [activeStep, setActiveStep] = useState(0);
  const step = process[activeStep];

  return (
    <StyledBento>
      <div className="grid">
        <ExperienceCard id="experience" tabIndex="-1">
          <span className="label">My Experience</span>
          <ol className="timeline">
            {jobs.map(({ title, company, range, location: where, url }, i) => (
              <li key={i}>
                <h3>
                  {title} at{' '}
                  <a href={url} target="_blank" rel="noreferrer">
                    {company}
                  </a>
                </h3>
                <div className="meta">
                  {range} · {where}
                </div>
              </li>
            ))}
          </ol>
        </ExperienceCard>

        <WorkCard id="work" tabIndex="-1">
          <span className="label">Featured work</span>
          <div className="stack">
            {shots.map(({ name, childImageSharp }, i) => {
              const image = getImage(childImageSharp);
              const project = featured[i % featured.length] || {};
              return (
                <a
                  key={name}
                  className="shot"
                  href={project.external || project.github || github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.title || name}>
                  {image && <GatsbyImage image={image} alt={project.title || name} />}
                </a>
              );
            })}
          </div>
          <div className="title">Aman’s Projects</div>
          <a className="cta" href={github} target="_blank" rel="noreferrer">
            <Icon name="GitHub" /> View on GitHub
          </a>
        </WorkCard>

        <ReadingCard>
          <span className="label">What I’m reading</span>
          <h3>{reading.title}</h3>
          <div className="meta">{reading.author}</div>
          <div className="frame">
            <a
              className="book"
              href={reading.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${reading.title} by ${reading.author}`}>
              <span className="book3d">
                <span className="back" aria-hidden="true" />
                <span className="pages" aria-hidden="true" />
                <span className="cover">
                  {bookCover ? (
                    <GatsbyImage image={bookCover} alt={`${reading.title} cover`} />
                  ) : (
                    <span className="cover-fallback" aria-hidden="true">
                      <span className="t">{reading.title}</span>
                      <span className="a">{reading.author}</span>
                    </span>
                  )}
                </span>
              </span>
            </a>
          </div>
        </ReadingCard>

        <MapCard>
          <span className="label">Map</span>
          <StaticImage
            className="map"
            src="../../images/map/bengaluru.jpg"
            alt={`Street map of ${location.city}`}
            width={480}
            height={480}
            quality={85}
            placeholder="blurred"
            formats={['AUTO', 'WEBP']}
          />
          <div className="place">
            <div className="city">{location.city}</div>
            <div className="country">{location.country}</div>
            <div className="coords">{location.coordinates}</div>
          </div>
        </MapCard>

        <ProcessCard className="span-2" id="process" tabIndex="-1">
          <span className="label">How I work</span>
          <div className="step" role="tabpanel" id={`step-panel-${activeStep}`}>
            <h3>
              {String(activeStep + 1).padStart(2, '0')} {step.title}
            </h3>
            <p>{step.description}</p>
          </div>
          <div className="tabs" role="tablist" aria-label="How I work">
            {process.map((item, i) => (
              <button
                key={i}
                type="button"
                className="tab"
                role="tab"
                aria-selected={activeStep === i}
                aria-controls={`step-panel-${i}`}
                onClick={() => setActiveStep(i)}>
                Step {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </ProcessCard>
      </div>
    </StyledBento>
  );
};

export default Bento;
