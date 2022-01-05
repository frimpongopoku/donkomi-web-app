import { css, cx } from "@emotion/css";
export const THEME_COLOR = "#ef9f0c";
export const THEME_HOVER_COLOR = "orange";
export const THEME_ACTIVE_COLOR = "#db6c11";

export const makeClass = (cssString) => cx(css(cssString));
export const DEFAULT = "default";
export const FULL = "full";
export const LEGACY = "legacy";
export const putElementInline = css`
  display: inline-block;
`;

export const raise = css`
  box-shadow: 0px 1px 2px #9e9e9e;
`;
const z_depth_half = css`
  box-shadow: 0 1px 0px 0 rgb(0 0 0 / 0%), 0 2px 4px 0 rgb(0 0 0 / 3%);
`;

const z_depth_1 = css`
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
`;

const z_depth_1_half = css`
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
`;

const z_depth_2 = css`
  -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const z_depth_3 = css`
  -webkit-box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;
const z_depth_4 = css`
  -webkit-box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22),
    0 25px 55px 0 rgba(0, 0, 0, 0.21);
  box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22),
    0 25px 55px 0 rgba(0, 0, 0, 0.21);
`;

const z_depth_5 = css`
  -webkit-box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2),
    0 40px 77px 0 rgba(0, 0, 0, 0.22) !important;
  box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2),
    0 40px 77px 0 rgba(0, 0, 0, 0.22) !important;
`;
const z_depth_float = css`
  box-shadow: 0 1px 0px 0 rgba(0, 0, 0, -1.84), 0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, -1.84),
    0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
`;

const z_depth_zero = css`
  box-shadow: 0 0 0;
`;
/**
 * The integer value provided resolves to a corresponding cass class that will give a box shadow to an element
 * @param {Number} depth
 * @returns
 *
 * @TODO : change this fxn and this whole elevation concept into one that actualy creates a box-shadow that is a mathematical expression
 * of whatever int value the developer passes.
 */
export const elevate = (depth) => {
  const arr = [
    z_depth_zero,
    z_depth_half,
    z_depth_float,
    z_depth_1,
    z_depth_1_half,
    z_depth_2,
    z_depth_3,
    z_depth_4,
    z_depth_5,
  ];
  if (depth > arr.length) return arr[arr.length - 1];
  if (depth < 0) return arr[0];
  return arr[depth];
};
