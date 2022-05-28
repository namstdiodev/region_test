import React, { useContext } from 'react'
import { DarkThemeContext } from '../ContextTheme';

export const Content = () => {
  const { isDark } = useContext(DarkThemeContext);

  return (
    <div className="content"></div>
  )
}
