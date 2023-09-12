import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "swiper/css";
import "swiper/css/navigation";

const DestinationSlider = ({ destinations }) => {
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
                }}
              >
                <img className="destination-image" src={item.image} alt="" />
                <Typography
                  fontSize={{ md: 24, xs: 18 }}
                  color={"#2C2C2C"}
                  fontWeight={700}
                >
                  {item.name}
                </Typography>
              </Box>
            </SwiperSlide>
          </>
        ))}
      </Swiper>

      <div className="next-btn" onClick={() => swiper?.slideNext()}>
        <img src="./forward.svg" alt="" />
      </div>
      <div className="prev-btn" onClick={() => swiper?.slidePrev()}>
        <img src="./backward.svg" alt="" />
      </div>
    </Box>
  );
};

export default DestinationSlider;
