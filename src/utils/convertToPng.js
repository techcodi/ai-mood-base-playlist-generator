export const convertToPng = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("toBlob failed"));

              const pngFile = new File(
                [blob],
                `${file.name.split(".")[0]}.png`,
                {
                  type: "image/png",
                }
              );

              resolve(pngFile);
            },
            "image/png",
            1.0
          );
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => reject(new Error("Image failed to load"));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};
