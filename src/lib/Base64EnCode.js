export const handleImageChange = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target.result;

      const mimeRegex = /^data:(.*?);base64,/;
      const match = base64.match(mimeRegex);
      const mimeType = match ? match[1] : "";

      const base64Data = base64.replace(mimeRegex, "");

      const imageJson = {
        data: base64Data,
        mime: mimeType,
      };
      resolve(imageJson);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
