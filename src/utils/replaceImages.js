import deleteImage from './deleteImage.js';

/**
 * Retorna novo array com os nomes das imagens com base em uma lista de ações
 * @typedef { 'add' | 'remove' | 'replace' | 'keep' | null} Action
 * @param {Array<String>} newImages - Array de nomes das imagens novas
 * @param {Array<String>} oldImages - Array de nomes das imagens antigas
 * @param {Array<Action>} actions - Lista de ações para cada índice das imagens antigas
 * @returns {Array<String>} - Novo array com as imagens
 */
const replaceImages = (newImages, oldImages, actions) => {
  const images = [];
  const newImagesCopy = newImages.slice();
  const oldImagesCopy = oldImages.slice();

  for (const action of actions) {
    if (action === 'add') {
      images.push(newImagesCopy.shift());
    } else if (action === 'remove') {
      const deletedImage = oldImagesCopy.shift();
      deleteImage(deletedImage);
    } else if (action === 'replace') {
      const deletedImage = oldImagesCopy.shift();
      images.push(newImagesCopy.shift());
      deleteImage(deletedImage);
    } else if (action === 'keep') {
      images.push(oldImagesCopy.shift());
    }
  }

  return images;
};

export default replaceImages;
