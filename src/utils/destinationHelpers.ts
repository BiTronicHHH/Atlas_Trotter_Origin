import destinations from './destinations';

export const getTickerFromId = (id: string): string => {
  const destination = destinations.find((d) => d.id == id);
  if (!destination) return '';
  return destination.name.toLowerCase().replace(/ /g, '-');
};

export const getNameFromId = (id: string): string => {
  const destination = destinations.find((d) => d.id == id);
  if (!destination) return '';
  return destination.name;
};
