import {
  ImgA,
  ImgB,
  ImgC,
  ImgD,
  ImgE,
  ImgF,
  ImgG,
  ImgH,
  ImgI,
  ImgJ,
  ImgK,
  ImgL,
} from '@/res/images';

const plugImage = (plugType: string): string => {
  switch (plugType) {
    case 'A':
      return ImgA.src;
      break;
    case 'B':
      return ImgB.src;
      break;
    case 'C':
      return ImgC.src;
      break;
    case 'D' || 'M':
      return ImgD.src;
      break;
    case 'E':
      return ImgE.src;
      break;
    case 'F':
      return ImgF.src;
      break;
    case 'G':
      return ImgG.src;
      break;
    case 'H':
      return ImgH.src;
      break;
    case 'I':
      return ImgI.src;
      break;
    case 'J':
      return ImgJ.src;
      break;
    case 'K':
      return ImgK.src;
      break;
    case 'L':
      return ImgL.src;
      break;
    default:
      return '';
      break;
  }
};
export default plugImage;
