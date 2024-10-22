type ColorRecord = {
  [key: string]: string;
};

export const colorfulVars = {
  brilliant: {
    bubblegum: 'rgb(255,140,174)',
    coral: 'rgb(245,96,96)',
    emerald: 'rgb(80,200,120)',
    lilac: 'rgb(157,141,241)',
    marigold: 'rgb(255,165,25)',
    sky: 'rgb(83,182,248)',
    tangerine: 'rgb(255,118,27)',
    turquoise: 'rgb(98,209,202)',
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
