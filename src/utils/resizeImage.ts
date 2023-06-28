import pica from 'pica';

const resizeImage = async (
  imageData: ArrayBuffer,
  maxWidth: number,
  maxHeight: number,
) => {
  // Convertir les données de l'image en un objet Image
  const image = new Image();
  image.src = URL.createObjectURL(new Blob([imageData]));

  // Attendre le chargement complet de l'image
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  // Calculer les dimensions de redimensionnement
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }

  if (height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }

  // Créer un canvas pour le redimensionnement de l'image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // Effectuer le redimensionnement avec pica
  const picaInstance = pica();
  await picaInstance.resize(image, canvas);

  // Obtenir les données de l'image redimensionnée depuis le canvas
  const resizedImageData = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png', 0.9);
  });

  return resizedImageData;
};

export default resizeImage;
