import { useContext } from 'react';
import { ThemeContext } from '../../context';

export const useTheme = () => {
  const context = useContext<any>(ThemeContext);
  
  if(!context) throw new Error('"ThemeContext" should be used with "ThemeProvider"');
  
  return context;
};