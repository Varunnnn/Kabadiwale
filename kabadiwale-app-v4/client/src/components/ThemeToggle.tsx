import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabel = false,
  size = 'md'
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  // Determine icon size based on the size prop
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  }[size];
  
  // Determine button padding based on the size prop
  const buttonSize = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  }[size];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium dark:text-gray-200">
          {theme === 'light' ? 'Light' : 'Dark'} Mode
        </span>
      )}
      
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full transition-all duration-300">
        <button
          onClick={() => setTheme('light')}
          className={`${buttonSize} rounded-full transition-all duration-300 ${
            theme === 'light' 
              ? 'bg-white text-primary shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
          }`}
          aria-label="Light mode"
          title="Light mode"
        >
          <Sun size={iconSize} />
        </button>
        
        <button
          onClick={() => setTheme('system')}
          className={`${buttonSize} rounded-full transition-all duration-300 ${
            theme === 'system' 
              ? 'bg-white dark:bg-gray-700 text-primary dark:text-primary shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
          }`}
          aria-label="System theme"
          title="System theme"
        >
          <Laptop size={iconSize} />
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          className={`${buttonSize} rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-yellow-400 shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-yellow-400'
          }`}
          aria-label="Dark mode"
          title="Dark mode"
        >
          <Moon size={iconSize} />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;