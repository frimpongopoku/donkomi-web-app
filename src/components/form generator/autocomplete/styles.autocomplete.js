import {
  elevate,
  THEME_ACTIVE_COLOR,
  THEME_COLOR,
} from "../shared/_shared.styles";

export const Stylesheet = {
  input: {
    boxSizing: "border-box",
    border: "solid 2px " + THEME_COLOR,
    borderRadius: 3,
    fontSize: 14,
    width: "100%",
    "&:focus": { outline: 0 },
    padding: "15px 20px",
  },
  ghostCurtain: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "white",
    opacity: 0.1,
    zIndex: 2,
    cursor: "pointer",
  },
  dropContainer: {
    background: "white",
    zIndex: 10,
    boxSizing: "border-box",
    // padding: 15,
    width: "100%",
    position: "absolute",
    minHeight: 60,
    maxHeight: 500,
    overflowY: "scroll",
    marginTop: 5,
  },
  dropItem: {
    margin: 0,
    cursor: "pointer",
    padding: "15px",
    "&:hover": {
      background: THEME_COLOR,
      color: "white",
      transition: ".1s ease-out",
    },
    "&:active": {
      background: THEME_ACTIVE_COLOR,
      color: "white",
      transition: ".1s ease-out",
    },
  },

  chip: {
    color: THEME_COLOR,
    padding: "10px 23px",
    display: "inline-block",
    margin: "3px 4px",
    borderRadius: 55,
    cursor: "pointer",
    "& span": {
      marginRight: 5,
    },

    "&:hover": {
      opacity: 0.8,
      transform: "scale(.95)",
      transition: ".2s ease-out",
    },
  },
};
