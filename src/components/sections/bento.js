import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { skills, location, process, resumePath } from '@config';
import { Icon } from '@components/icons';

const StyledBento = styled.section`
  max-width: var(--content-width);
  padding: 0 0 var(--space-section);

  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: minmax(0, auto);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .span-2 {
    grid-column: span 2;

    @media (max-width: 560px) {
      grid-column: span 1;
    }
  }
`;

/* store-utility-card: white, 1px hairline, 18px radius, 24px padding, no shadow */
const Card = styled.article`
  ${({ theme }) => theme.mixins.card};
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  overflow: hidden;

  .label {
    ${({ theme }) => theme.mixins.pearlCapsule};
    align-self: flex-start;
    margin-bottom: 16px;
    padding: 5px 10px;
    font-size: var(--fz-xs);
    letter-spacing: -0.12px;
    pointer-events: none;
  }

  h3 {
    margin: 0;
    font-size: var(--fz-md);
    font-weight: 600;
    line-height: 1.24;
    letter-spacing: -0.374px;
  }

  .meta {
    color: var(--ink-muted-48);
    font-size: var(--fz-xs);
    letter-spacing: -0.12px;
    line-height: 1.4;
  }
`;

const ExperienceCard = styled(Card)`
  .timeline {
    ${({ theme }) => theme.mixins.resetList};
    position: relative;
    flex: 1;
    min-height: 0;
    max-height: 300px;
    margin-left: 4px;
    padding-left: 18px;
    overflow-y: auto;
    scrollbar-width: none;
    -webkit-mask-image: linear-gradient(to bottom, #000 82%, transparent);
    mask-image: linear-gradient(to bottom, #000 82%, transparent);

    &::-webkit-scrollbar {
      display: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 3px;
      width: 1px;
      background-color: var(--hairline);
    }

    li {
      position: relative;
      padding-bottom: 14px;

      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: -18px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: var(--ink);
      }

      &:first-child:before {
        background-color: var(--primary);
      }
    }

    h3 {
      font-size: var(--fz-sm);
      letter-spacing: -0.224px;
    }

    a {
      color: inherit;
    }
  }
`;

const WorkCard = styled(Card)`
  .stack {
    position: relative;
    height: 120px;
    margin: 8px 0 16px;
  }

  .shot {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 130px;
    height: 96px;
    border-radius: var(--radius-sm);
    border: 3px solid var(--canvas);
    overflow: hidden;
    /* product shadow: the single shadow in the system, reserved for imagery */
    box-shadow: var(--product-shadow);
    transition: var(--transition);

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }

    &:nth-child(1) {
      transform: translateX(-70%) rotate(-8deg);
      z-index: 1;
    }
    &:nth-child(2) {
      transform: translateX(-30%) rotate(6deg);
      z-index: 2;
    }
    &:nth-child(3) {
      transform: translateX(-50%) rotate(-2deg);
      z-index: 3;
    }

    &:hover,
    &:focus-visible {
      z-index: 4;
      transform: translateX(-50%) rotate(0deg) scale(1.04);
    }
  }

  ul {
    ${({ theme }) => theme.mixins.resetList};
    margin-top: auto;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 0;
      border-top: 1px solid var(--divider-soft);
      font-size: var(--fz-sm);
      letter-spacing: -0.224px;

      a {
        color: var(--ink);
        display: inline-flex;
        align-items: center;
        gap: 6px;

        svg {
          width: 12px;
          height: 12px;
          color: var(--ink-muted-48);
        }

        &:hover,
        &:focus-visible {
          color: var(--primary);
        }
      }
    }
  }
`;

const StackCard = styled(Card)`
  .chips {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    li {
      padding: 6px 11px;
      border: 1px solid var(--hairline-alpha);
      border-radius: var(--radius-pill);
      background-color: var(--canvas);
      color: var(--ink);
      font-size: var(--fz-xs);
      letter-spacing: -0.12px;
      line-height: 1.29;
    }
  }

  .more {
    margin-top: auto;
    padding-top: 16px;
    font-size: var(--fz-xs);
    color: var(--ink-muted-48);

    a {
      color: var(--primary);
    }
  }
`;

const MapCard = styled(Card)`
  padding: 0;
  min-height: 240px;
  background-color: var(--canvas-parchment);

  .label {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 2;
    margin: 0;
  }

  .map {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--ink);
  }

  .place {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding: 60px 24px 22px;
    text-align: center;
    background: linear-gradient(to bottom, rgba(245, 245, 247, 0) 0%, var(--canvas-parchment) 45%);

    .city {
      font-size: var(--fz-lg);
      font-weight: 400;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--ink);
    }
    .country {
      margin-top: 2px;
      font-size: var(--fz-xxs);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--ink-muted-48);
    }
    .coords {
      margin-top: 6px;
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.08em;
      color: var(--ink-muted-48);
    }
  }
`;

const ProcessCard = styled(Card)`
  .step {
    flex: 1;
    padding: 12px 0 20px;
  }

  .step h3 {
    font-size: var(--fz-md);
    margin-bottom: 8px;
  }

  .step p {
    margin: 0;
    color: var(--ink-muted-48);
    font-size: var(--fz-xs);
    line-height: 1.5;
    letter-spacing: -0.12px;
    max-width: 52ch;
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-top: auto;
    padding: 4px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas-parchment);
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tab {
    flex: 1;
    min-width: max-content;
    min-height: 36px;
    padding: 0 14px;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--ink-muted-80);
    font-size: var(--fz-xs);
    letter-spacing: -0.12px;
    transition: var(--transition);

    &:hover {
      color: var(--ink);
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

const MapArt = () => (
  <svg
    className="map"
    viewBox="0 0 240 240"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <g strokeWidth="0.6" opacity="0.18">
        <path d="M-10 60 C 40 55, 70 75, 120 62 S 200 40, 250 58" />
        <path d="M-10 128 C 30 120, 60 140, 110 130 S 190 118, 250 132" />
        <path d="M-10 190 C 40 182, 80 200, 130 188 S 200 176, 250 190" />
        <path d="M62 -10 C 58 40, 70 80, 60 120 S 66 200, 58 250" />
        <path d="M128 -10 C 132 40, 122 90, 130 130 S 126 200, 134 250" />
        <path d="M190 -10 C 186 50, 198 100, 188 150 S 194 210, 186 250" />
      </g>
      <g strokeWidth="1.4" opacity="0.5">
        <path d="M-10 96 C 30 92, 80 112, 120 98 S 200 76, 250 94" />
        <path d="M96 -10 C 92 50, 106 100, 96 150 S 104 210, 94 250" />
        <path d="M158 -10 C 164 60, 150 120, 162 180 S 154 230, 160 250" />
      </g>
      <g strokeWidth="0.8" opacity="0.32">
        <path d="M20 20 L 50 44 L 84 30 L 118 52 L 150 34 L 184 58 L 226 30" />
        <path d="M14 160 L 46 148 L 78 168 L 116 152 L 146 176 L 190 158 L 232 172" />
        <path d="M40 214 L 74 204 L 108 222 L 140 208 L 178 224 L 214 210" />
      </g>
      <g strokeWidth="1" opacity="0.28">
        <ellipse cx="150" cy="150" rx="26" ry="16" />
        <ellipse cx="70" cy="70" rx="18" ry="11" />
      </g>
    </g>
    <circle cx="120" cy="104" r="4" fill="#0066cc" />
    <circle cx="120" cy="104" r="9" fill="#0066cc" opacity="0.18" />
  </svg>
);

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
              cover {
                childImageSharp {
                  gatsbyImageData(width: 320, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
      }
    }
  `);

  const jobs = data.jobs.edges.map(({ node }) => node.frontmatter);
  const featured = data.featured.edges.map(({ node }) => node.frontmatter);

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
            {featured.map(({ title, cover, external, github }, i) => {
              const image = getImage(cover);
              return (
                <a
                  key={i}
                  className="shot"
                  href={external || github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={title}>
                  {image && <GatsbyImage image={image} alt={title} />}
                </a>
              );
            })}
          </div>
          <ul>
            {featured.map(({ title, external, github }, i) => (
              <li key={i}>
                <a href={external || github} target="_blank" rel="noreferrer">
                  {title}
                  <Icon name="External" />
                </a>
              </li>
            ))}
          </ul>
        </WorkCard>

        <StackCard>
          <span className="label">What I build with</span>
          <ul className="chips">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
          <div className="more">
            Full stack and history in my{' '}
            <a href={resumePath} target="_blank" rel="noreferrer">
              resume
            </a>
            .
          </div>
        </StackCard>

        <MapCard>
          <span className="label">Map</span>
          <MapArt />
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
