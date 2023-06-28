const categoryLabel = (categoryName: string): string => {
  switch (categoryName) {
    case 'Cultural':
      return 'cultural immersion';
      break;
    case 'Nature':
      return 'exploring the beauty of nature';
      break;
    case 'Sports':
      return 'sports activities';
      break;
    case 'Beach':
      return 'relaxing on beautiful beaches';
      break;
    case 'Gastronomic':
      return 'culinary experiences';
      break;
    case 'Romantic':
      return 'a romantic stay';
      break;
    case 'Urban':
      return 'enjoying urban life';
      break;
    case 'Diving':
      return 'diving in the best spots of the world';
      break;
    default:
      return categoryName;
      break;
  }
};
export default categoryLabel;
