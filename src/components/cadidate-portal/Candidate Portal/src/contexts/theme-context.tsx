import React from 'react';
import { useTheme } from '@heroui/use-theme';
import { Tooltip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  React.useEffect(() => {
    // Set initial theme based on user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useWiseTheme = () => React.useContext(ThemeContext);

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useWiseTheme();

  return (
    <Tooltip
      content={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      placement="bottom"
    >
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle theme"
        onPress={toggleTheme}
        className="transition-transform hover:scale-105"
      >
        {isDark ? (
          <Icon icon="lucide:sun" className="h-5 w-5" />
        ) : (
          <Icon icon="lucide:moon" className="h-5 w-5" />
        )}
      </Button>
    </Tooltip>
  );
};
