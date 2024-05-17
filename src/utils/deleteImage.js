import path from 'path';
import fs from 'fs';

// Recebe o nome da imagem e a delete em 'src/public/images/'
const deleteImage = (imageName) => {
  fs.unlink(path.resolve('src/public/images/' + imageName), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export default deleteImage;
