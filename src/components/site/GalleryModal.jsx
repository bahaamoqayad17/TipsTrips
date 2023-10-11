import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Box from "@mui/material/Box";

const images = [
  "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",

  "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",

  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",

  "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
];

const GalleryModal = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{ cursor: "pointer", position: "relative" }}
        display={"flex"}
        flexDirection={"row-reverse"}
        onClick={() => setIsOpen(true)}
      >
        <img
          style={{ position: "absolute", bottom: 10, right: 10 }}
          src="/gallery.svg"
          alt=""
        />
        <img style={{ borderRadius: "16px" }} src="/test1.svg" alt="" />
      </Box>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default GalleryModal;
