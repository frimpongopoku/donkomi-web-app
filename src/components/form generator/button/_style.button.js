import { css } from "@emotion/css";
import {
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
  THEME_HOVER_COLOR,
} from "../shared/_shared.styles";

export const remove_defaults = css`
  padding: 10px 15px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  border: 0px;
  background: transparent;
  &:focus {
    outline: 0;
  }
`;

export const default_btn = css`
  padding: 10px 20px;
  background: ${THEME_COLOR};
  color: white;
  border-radius: 4px;
  &:hover {
    background: ${THEME_HOVER_COLOR};
    transition: 0.2s ease-out;
  }
  &:active {
    background: ${THEME_ACTIVE_COLOR};
    transition: 0.2s ease-out;
  }
`;
export const round_me = css`
  border-radius: 55px;
`;
