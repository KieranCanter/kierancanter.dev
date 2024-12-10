/**
 * Color Record Type
 * Maps color names to their RGB values
 */
type ColorRecord = {
  [key: string]: string;
};

/**
 * Theme Color Palettes
 * Defines available colors for Brilliant and Luminous themes
 */
export const colorfulVars = {
  // Brilliant theme colors - Light colorful
  brilliant: {
    rose: 'rgb(180,98,123)',
    valentine: 'rgb(220,86,86)',
    forest: 'rgb(50,125,75)',
    toolbox: 'rgb(123,111,191)',
    mustard: 'rgb(180,116,18)',
    bluish: 'rgb(57,125,173)',
    rust: 'rgb(205,94,21)',
    viridian: 'rgb(62,134,128)',
  } as ColorRecord,
  
  // Luminous theme colors - Dark colorful
  luminous: {
    azure: 'rgb(125,249,255)',
    banana: 'rgb(255,255,186)',
    lavender: 'rgb(204,183,254)',
    lime: 'rgb(192,255,140)',
    mandarin: 'rgb(255,179,128)',
    mint: 'rgb(159,255,203)',
    peach: 'rgb(255,179,186)',
    watermelon: 'rgb(255,105,180)',
  } as ColorRecord
};

/**
 * Get Random Contrast Color
 * Returns a random color from the set, excluding specified colors
 * @param colorSet - Set of available colors
 * @param excludeColors - Colors to exclude from selection
 * @returns Selected color string
 */
export const getContrastColor = (colorSet: Record<string, string>, excludeColors: string[] = []): string => {
  const availableColors = Object.values(colorSet).filter(color => !excludeColors.includes(color));
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

/**
 * Generate Theme Accent Color
 * Returns appropriate accent color based on theme
 * @param theme - Current theme name
 * @returns Color string for accent
 */
export const generateAccentColor = (theme: 'plush' | 'sombre' | 'brilliant' | 'luminous'): string => {
  if (theme === 'plush' || theme === 'sombre') {
    return document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`);
  } else {
    return getContrastColor(colorfulVars[theme], [document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`)]);
  }
}
