import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { skills, location, reading, resumePath } from '@config';
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

/* Reference card: parchment surface, soft lift, white label pill */
const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  padding: var(--space-lg);
  overflow: hidden;
  border-radius: 24px;
  background-color: var(--canvas-parchment);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.06);

  .label {
    align-self: flex-start;
    margin-bottom: 16px;
    padding: 7px 12px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    color: var(--ink);
    font-size: var(--fz-xs);
    letter-spacing: -0.12px;
    line-height: 1.29;
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
    color: var(--ink-muted-24);
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

const ReadingCard = styled(Card)`
  min-height: 330px;

  h3 {
    font-size: var(--fz-sm);
    letter-spacing: -0.224px;
    max-width: 14ch;
  }

  .meta {
    margin-top: 2px;
  }

  /* Lighter inset panel, centred, running off the card's bottom edge */
  .frame {
    position: relative;
    flex: 1;
    width: 62%;
    min-height: 190px;
    margin: 18px auto -24px;
    border-radius: 22px 22px 0 0;
    background-color: var(--surface-pearl);
    overflow: hidden;
  }

  /* 3D hardcover seen from an angle */
  .book {
    position: absolute;
    left: 24%;
    top: 10%;
    display: block;
    width: 156px;
    height: 216px;
    perspective: 720px;
    perspective-origin: 20% 20%;
    color: inherit;

    &:hover .book3d,
    &:focus-visible .book3d {
      transform: rotateX(4deg) rotateY(20deg) rotateZ(-8deg) translateY(-4px);
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
    border-radius: 2px 5px 5px 2px;
    background-color: var(--surface-tile-1);
    transform: translateZ(0);
    /* product shadow: the single shadow in the system, reserved for imagery */
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
    border-radius: 2px 5px 5px 2px;
    background-color: #b0342a;
    transform: translateZ(-26px);
  }

  .pages {
    top: 3px;
    bottom: 3px;
    left: 0;
    width: 26px;
    transform-origin: left center;
    transform: rotateY(-90deg) translateX(-26px);
    background-color: #f6f6f4;
    background-image: repeating-linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0 2px,
      rgba(0, 0, 0, 0.09) 2px 3px
    );
    box-shadow: inset -6px 0 8px rgba(0, 0, 0, 0.12);
  }

  /* Typographic fallback shown until a cover image is added */
  .cover-fallback {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 14px 12px;
    background-color: var(--surface-tile-1);
    color: var(--on-dark);
    font-family: Georgia, 'Times New Roman', serif;

    .t {
      font-size: 15px;
      line-height: 1.15;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .a {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #cccccc;
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
      border-radius: var(--radius-pill);
      background-color: var(--canvas);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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

const ProjectsCard = styled(Card)`
  .project {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 20px;
    align-items: start;
    padding: 4px 0 20px;

    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .shot {
    display: block;
    border-radius: var(--radius-md);
    overflow: hidden;
    background-color: var(--canvas);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    aspect-ratio: 4 / 3;

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }
  }

  .project h3 {
    font-size: var(--fz-md);
    margin-bottom: 6px;

    a {
      color: var(--ink);

      &:hover,
      &:focus-visible {
        color: var(--primary);
      }
    }
  }

  .description {
    color: var(--ink-muted-48);
    font-size: var(--fz-xs);
    line-height: 1.5;
    letter-spacing: -0.12px;

    p {
      margin: 0;
    }
    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .tech {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;

    li {
      padding: 4px 9px;
      border-radius: var(--radius-pill);
      background-color: var(--canvas);
      font-size: var(--fz-xxs);
      letter-spacing: -0.08px;
      line-height: 1.3;
      color: var(--ink);
    }
  }

  .links {
    display: flex;
    gap: 6px;
    margin-top: 12px;

    a {
      ${({ theme }) => theme.mixins.pearlCapsule};
      gap: 6px;
      padding: 5px 10px;
      border: 0;
      border-radius: var(--radius-pill);
      background-color: var(--canvas);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      font-size: var(--fz-xs);

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-top: auto;
    padding: 4px;
    border-radius: var(--radius-pill);
    background-color: var(--canvas);
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
              tech
              cover {
                childImageSharp {
                  gatsbyImageData(width: 480, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
            }
            html
          }
        }
      }
      bookCovers: allFile(
        filter: { sourceInstanceName: { eq: "images" }, relativeDirectory: { eq: "books" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
  `);

  const jobs = data.jobs.edges.map(({ node }) => node.frontmatter);
  const featured = data.featured.edges.map(({ node }) => ({
    ...node.frontmatter,
    html: node.html,
  }));
  const bookCover = getImage(data.bookCovers.nodes.find(n => n.name === reading.cover));

  const [activeProject, setActiveProject] = useState(0);
  const project = featured[activeProject];

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

        <ProjectsCard className="span-2" id="projects" tabIndex="-1">
          <span className="label">Featured projects</span>
          {project && (
            <div className="project" role="tabpanel" id={`project-panel-${activeProject}`}>
              {getImage(project.cover) && (
                <a
                  className="shot"
                  href={project.external || project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.title}>
                  <GatsbyImage image={getImage(project.cover)} alt={project.title} />
                </a>
              )}
              <div>
                <h3>
                  <a href={project.external || project.github} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </h3>
                <div className="description" dangerouslySetInnerHTML={{ __html: project.html }} />
                {project.tech && (
                  <ul className="tech">
                    {project.tech.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                )}
                <div className="links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Icon name="GitHub" /> GitHub
                    </a>
                  )}
                  {project.external && (
                    <a href={project.external} target="_blank" rel="noreferrer">
                      <Icon name="External" /> Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="tabs" role="tablist" aria-label="Featured projects">
            {featured.map((item, i) => (
              <button
                key={i}
                type="button"
                className="tab"
                role="tab"
                aria-selected={activeProject === i}
                aria-controls={`project-panel-${i}`}
                onClick={() => setActiveProject(i)}>
                {item.title}
              </button>
            ))}
          </div>
        </ProjectsCard>
      </div>
    </StyledBento>
  );
};

export default Bento;
