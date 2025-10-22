// Utility functions
export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (date: string | Date, locale: string = 'en'): string => {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'np' ? 'ne-NP' : 'en-US');
};

export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const getMultilingualText = (
  text: { en: string; np: string } | string,
  locale: string
): string => {
  if (typeof text === 'string') return text;
  return locale === 'np' ? text.np : text.en;
};
