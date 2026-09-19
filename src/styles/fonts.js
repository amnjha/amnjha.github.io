import { css } from 'styled-components';

import SFMonoRegularWoff from '@fonts/SFMono/SFMono-Regular.woff';
import SFMonoRegularWoff2 from '@fonts/SFMono/SFMono-Regular.woff2';
import SFMonoSemiboldWoff from '@fonts/SFMono/SFMono-Semibold.woff';
import SFMonoSemiboldWoff2 from '@fonts/SFMono/SFMono-Semibold.woff2';

import SFMonoRegularItalicWoff from '@fonts/SFMono/SFMono-RegularItalic.woff';
import SFMonoRegularItalicWoff2 from '@fonts/SFMono/SFMono-RegularItalic.woff2';
import SFMonoSemiboldItalicWoff from '@fonts/SFMono/SFMono-SemiboldItalic.woff';
import SFMonoSemiboldItalicWoff2 from '@fonts/SFMono/SFMono-SemiboldItalic.woff2';

/*
  Sans text is rendered with the system stack (SF Pro on Apple platforms, Inter elsewhere,
  loaded from Google Fonts in head.js). Only the mono face is self-hosted.
*/
const sfMonoNormalWeights = {
  400: [SFMonoRegularWoff, SFMonoRegularWoff2],
  600: [SFMonoSemiboldWoff, SFMonoSemiboldWoff2],
};

const sfMonoItalicWeights = {
  400: [SFMonoRegularItalicWoff, SFMonoRegularItalicWoff2],
  600: [SFMonoSemiboldItalicWoff, SFMonoSemiboldItalicWoff2],
};

const createFontFaces = (family, weights, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(weights)) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const sfMonoNormal = createFontFaces('SF Mono', sfMonoNormalWeights);
const sfMonoItalic = createFontFaces('SF Mono', sfMonoItalicWeights, 'italic');

const Fonts = css`
  ${sfMonoNormal + sfMonoItalic}
`;

export default Fonts;
