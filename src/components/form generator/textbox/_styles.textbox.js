import { css } from "@emotion/css";
import { THEME_COLOR } from "../shared/_shared.styles";
export const input = css`
  margin: 10px 0px;
  padding: 13px;
  font-size: 16px;
  border: solid 0px ${THEME_COLOR};
  width: 100%;
  border-left-width: 5px;
  font-family: inherit;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
`;
