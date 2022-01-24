import { css } from "@emotion/css";
import {
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
  THEME_HOVER_COLOR,
} from "../shared/_shared.styles";
const emptyBox = css`
  height: 15px;
  width: 15px;
  border: solid 4px ${THEME_COLOR};
  margin: 4px;
  border-radius: 2px;
`;
const defaultContainer = css`
  padding: 10px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  & p {
    font-size: 17px;
    margin: 4px;
    text-transform: capitalize;
  }

  &:hover > p {
    color: ${THEME_HOVER_COLOR};
    transition: 0.2s ease-in;
  }
  &:hover .box {
    border-color: ${THEME_HOVER_COLOR};
    transition: 0.2s ease-in;
  }
  &:active > p {
    color: ${THEME_ACTIVE_COLOR};
    transition: 0.2s ease-in;
  }
  &:active .box {
    border-color: ${THEME_ACTIVE_COLOR};
    transition: 0.2s ease-in;
  }

  &:hover .check-mark {
    color: ${THEME_HOVER_COLOR};
    transition: 0.2s ease-in;
  }

  &:active .check-mark {
    color: ${THEME_ACTIVE_COLOR};
    transition: 0.2s ease-in;
  }
`;

const hoveringCheckMarkCss = css`
  font-size: 12px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  color: ${THEME_COLOR};
`;

/** @ignore */
export const checkBoxCss = { defaultContainer, emptyBox, hoveringCheckMarkCss };
