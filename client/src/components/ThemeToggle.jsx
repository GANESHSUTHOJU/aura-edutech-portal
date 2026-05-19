import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-20 h-10 p-1 bg-slate-100 dark:bg-dark-card rounded-full transition-colors duration-500 shadow-inner overflow-hidden group border border-slate-200 dark:border-dark-border"
    >
      <div className="absolute inset-0 flex justify-between items-center px-2.5 z-0">
        <Sun className={`w-5 h-5 transition-all duration-500 ${isDarkMode ? 'text-slate-400 opacity-50' : 'text-primary'}`} />
        <Moon className={`w-5 h-5 transition-all duration-500 ${!isDarkMode ? 'text-slate-400 opacity-50' : 'text-primary'}`} />
      </div>
      <motion.div
        animate={{ x: isDarkMode ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-8 h-8 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg z-10 border border-slate-100 dark:border-white/5"
      >
        {isDarkMode ? (
          <Moon className="w-4 h-4 text-primary" />
        ) : (
          <Sun className="w-4 h-4 text-primary" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
