import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const DestinationSlider = ({ destinations }) => {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      slidesPerView={4}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        0: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
    >
      {destinations.map((item, i) => (
        <>
          <SwiperSlide key={i}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              <img className="destination-image" src={item.image} alt="" />
              {item.name}
            </Box>
          </SwiperSlide>
        </>
      ))}
      <div className="swiper-button-next">
        <img src="./forward.svg" alt="" />
      </div>
      <div className="swiper-button-prev">
        <img src="./backward.svg" alt="" />
      </div>
    </Swiper>
  );
};

export default DestinationSlider;
