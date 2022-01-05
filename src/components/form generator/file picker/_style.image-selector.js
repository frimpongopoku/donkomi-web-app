import { css } from "@emotion/css";
import {
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
  THEME_HOVER_COLOR,
} from "../shared/_shared.styles";

const selectorCss = {
  container: css`
    border: dashed 2px #efefef;
    border-radius: 5px;
    padding: 15px;
    padding-top: 5%;
    padding-bottom: 5%;
    min-height: 300px;
    margin-top: 10px;
  `,
  iconCss: css`
    color: ${THEME_COLOR};
    cursor: pointer;
    font-size: 70px;
    border: solid 1px #f5f5f5;
    border-radius: 100%;
    padding: 50px;

    &:hover {
      background: ${THEME_HOVER_COLOR};
      color: white;
      transition: 0.2s ease-out;
    }
    &:active {
      background: ${THEME_ACTIVE_COLOR};
      transition: 0.2s ease-out;
    }
  `,
  previewImageCss: css`
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      transform: scale(0.95);
      transition: 0.3s ease-out;
    }

    &:active {
      transform: scale(0.9);
      transition: 0.2s ease-out;
    }
  `,
};

export default selectorCss;
