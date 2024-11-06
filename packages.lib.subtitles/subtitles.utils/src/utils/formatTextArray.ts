export const formatTextArray = (text: string[], dflt = ''): string => (text.length === 0 ? dflt : text.join(', '));
