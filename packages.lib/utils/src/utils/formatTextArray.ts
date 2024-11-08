export const formatTextArray = (text: string[], dflt: string | null = null): string => (text.length === 0 ? dflt : text.join(', '));
