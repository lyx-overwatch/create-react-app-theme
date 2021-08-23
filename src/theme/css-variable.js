// import cssVars from 'css-vars-ponyfill';
// import base from "./base-theme";
// import light from "./light-theme";
// import dark from "./dark-theme";

const base = require("./base-theme");
const light = require("./light-theme");
const dark = require("./base-theme");

const changeColors = (mode) => {
  // cssVars({
  //   watch: true,
  // });
  let themeColor = null;
  if (mode === "light") themeColor = { ...light };
  if (mode === "dark") themeColor = { ...dark };
  const finalColor = {
    ...base,
    ...themeColor,
  };
  for (const [key, value] of Object.entries(finalColor)) {
    if (key !== "antdTheme") {
      document.body.style.setProperty(key, value);
    }
  }
  return finalColor;
};

module.exports = changeColors;

// export default changeColors;
