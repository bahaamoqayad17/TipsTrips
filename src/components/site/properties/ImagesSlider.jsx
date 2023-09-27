import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const ImagesSlider = () => {
  const swiper = useSwiper();
  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView={4}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {images.map((item, i) => (
          <>
            <SwiperSlide mb key={i}>
              <Box mb={3}>
                <img className="destination-image" src={item.imgPath} alt="" />
              </Box>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImagesSlider;
