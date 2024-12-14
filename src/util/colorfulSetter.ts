type ColorRecord = {
  [key: string]: string;
};

export const colorfulVars = {
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

export const getContrastColor = (colorSet: Record<string, string>, excludeColors: string[] = []): string => {
  const availableColors = Object.values(colorSet).filter(color => !excludeColors.includes(color));
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

export const generateAccentColor = (theme: 'plush' | 'sombre' | 'brilliant' | 'luminous'): string => {
  if (theme === 'plush' || theme === 'sombre') {
    return document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`);
  } else {
    return getContrastColor(colorfulVars[theme], [document.documentElement.style.getPropertyValue(`--${theme}-fg-contrast`)]);
  }
}
