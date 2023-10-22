export const compressImage = async (image) =>
  // module.exports.compressImage = async (image) =>
  {
    if (image) {
      try {
        const img = new Image();
        img.src = URL.createObjectURL(image);

        await img.decode();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 800;
        const maxHeight = 800;

        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        return new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.6,
          ); // Adjust quality here if needed
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
