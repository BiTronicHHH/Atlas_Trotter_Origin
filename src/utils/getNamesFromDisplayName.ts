const getNamesFromDisplayName = (
  displayName?: string | null,
): { firstName: string; lastName: string } => {
  if (!displayName) return { firstName: '', lastName: '' };

  const array = displayName.split(' ');

  if (array.length == 1) {
    return { firstName: array[0], lastName: '' };
  } else if (array.length > 1) {
    return { firstName: array[0], lastName: array[1] };
  } else {
    return { firstName: '', lastName: '' };
  }
};

export default getNamesFromDisplayName;
