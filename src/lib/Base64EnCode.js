import Resizer from "react-image-file-resizer";
export const handleImageChange = (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      2000,
      2000,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};
