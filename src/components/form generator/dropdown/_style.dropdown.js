import { css } from "@emotion/css";
import {
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
  THEME_HOVER_COLOR,
} from "../shared/_shared.styles";

export const dropdownCSS = {
  defaultDropdownSelector: css`
    display: inline-flex;
    cursor: pointer;
    border: solid 0px transparent;
    border-bottom-width: 4px;
    padding: 5px;
    &:hover {
      border-bottom-color: ${THEME_COLOR};
    }
  `,

  fullWidthTogglerCss: css`
    width: 100%;
    padding: 12px 20px;
    border: solid 2px ${THEME_COLOR};
    border-radius: 4px;
    display: flex;
    cursor: pointer;
    text-transform: capitalize;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    & span {
      color: ${THEME_COLOR};
      text-tranform: capitalize;
    }
    &:hover {
      border-color: ${THEME_HOVER_COLOR};
      transition: 0.2s ease-out;
      background: ${THEME_COLOR};
    }
    &:hover span {
      color: white !important;
      transition: 0.2s ease-out;
    }
  `,

  dropdownChildrenContainer: css`
    position: absolute;
    top: 30px;
    left: 0px;
    z-index: 3;
    border-radius: 5px;
    background: white;
  `,
  dropdownChildrenContainerFullCss: css`
    position: absolute;
    top: 57px;
    left: 0px;
    z-index: 3;
    border-radius: 5px;
    width: 100%;
    background: white;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  `,

  dropdownItemCss: css`
    cursor: pointer;
    padding: 15px 15px;
    color: black;
    text-align: left;
    text-transform: capitalize;
    overflow-wrap: break-word;
    &:hover {
      background: ${THEME_COLOR};
      color: white;
      transition: 0.2s ease-out;
    }
    &:active {
      background: ${THEME_ACTIVE_COLOR};
    }
  `,

  ghostCurtainCss: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    opacity: 0;
  `,
  selectedItemCss: css`
    background: ${THEME_ACTIVE_COLOR};
    color: white !important;
    &:hover {
      background: antiquewhite !important;
      color: black !important;
      transition: 0.2s ease-out;
    }
  `,
};
