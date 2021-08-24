import light from "./light-theme";
import dark from "./dark-theme";

const changeColors = (mode) => {
  let themeColor = null;
  if (mode === "light") themeColor = { ...light };
  if (mode === "dark") themeColor = { ...dark };
  const finalColor = {
    ...themeColor,
  };
  if (window.less) {
    window.less.modifyVars({
      ...finalColor,
    });
  }
};

export default changeColors;
