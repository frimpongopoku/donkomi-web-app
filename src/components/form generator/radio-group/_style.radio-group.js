import { css } from "@emotion/css";
import {
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
  THEME_HOVER_COLOR,
} from "../shared/_shared.styles";
const emptyCircle = css`
  height: 15px;
  width: 15px;
  border: solid 2px ${THEME_COLOR};
  margin: 4px;
  border-radius: 100%;
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
    font-size: 16px;
    margin: 4px;
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
  height: 20px;
  width: 20px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-48%, -48%);
  left: 50%;
  background: ${THEME_COLOR};
`;

export const radioGroupCSS = {
  defaultContainer,
  emptyCircle,
  hoveringCheckMarkCss,
};
