import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React, { useContext } from "react";
import { DarkThemeContext } from "../ContextTheme";

export const Header = () => {
  const { isDark, toggleDarkTheme } = useContext(DarkThemeContext);

  return (
    <div>
      <div className="header">
        <div className="header-container">
          <div className="header-text">Where in the world?</div>
          <div className="header-mode" onClick={toggleDarkTheme}>
            {isDark ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
            <div className="header-mode-text">
              {" "}
              {isDark ? "Dark" : "Light"} Mode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
