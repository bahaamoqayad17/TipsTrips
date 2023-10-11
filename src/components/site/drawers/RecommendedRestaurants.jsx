import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Divider from "@mui/material/Divider";

const DisplayButton = styled("button")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  width: "100%",
  height: 63,
  fontSize: 16,
  fontWeight: 600,
  color: "#2C2C2C",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "& svg": {
      fill: "#fff",
    },
  },
  [theme.breakpoints.down("sm")]: {
    border: "1px solid #B9B9B9",
    fontSize: 20,
    "& svg": {
      width: 30,
      height: 30,
    },
  },
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

const IsHalal = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "4px",
  padding: "8px 16px",
  color: "#fff",
}));

export default function RecommendedRestaurants() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { t } = useTranslation();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Box mb={3} key={"ShowDetails"}>
        <DisplayButton
          color="primary"
          variant="contained"
          onClick={toggleDrawer("ShowDetails", true)}
        >
          <RestaurantMenuIcon color="primary" /> &nbsp;{" "}
          {t("recommended_restaurants")}
        </DisplayButton>
        <Drawer
          anchor={"left"}
          open={state["ShowDetails"]}
          onClose={toggleDrawer("ShowDetails", false)}
          sx={{
            overflowY: "scroll",
            position: "relative",
            zIndex: 10000000,
            "& .MuiDrawer-paper": {
              backgroundColor: "#f5f5f5 !important",
            },
          }}
        >
          <Box
            sx={{
              py: "16px",
              width: { xs: "100%", md: "450px" },
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={"32px"}
            >
              <Typography fontSize={20} fontWeight={700}>
                {t("recommended_restaurants")}
              </Typography>

              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={toggleDrawer("ShowDetails", false)}
              />
            </Box>

            <Divider
              sx={{ mb: 3, mt: 1, width: "100%", borderColor: "#E0E0E0" }}
            />

            <Box px={"32px"}>
              <Card
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 8px 0px",
                  border: "1px solid rgb(194, 194, 194)",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              height: 255,
                              display: "block",
                              maxWidth: 400,
                              overflow: "hidden",
                              width: "100%",
                            }}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      display: "flex",
                      width: "55%",

                      justifyContent: "space-between",
                    }}
                  >
                    <IsHalal>{t("halal")}</IsHalal>

                    <MobileStepper
                      sx={{
                        backgroundColor: "inherit",
                        position: "relative",
                        "& .MuiMobileStepper-dot": {
                          backgroundColor: "#fff",
                        },
                      }}
                      steps={maxSteps}
                      activeStep={activeStep}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ pl: 2 }}>
                  <Typography
                    gutterBottom
                    fontSize={20}
                    color={"#2c2c2c"}
                    fontWeight={700}
                  >
                    Catalonia Plaza Hotel
                  </Typography>
                  {/* <Box display={"flex"} sx={{ cursor: "pointer" }}>
                  <Typography
                    mb={3}
                    fontSize={16}
                    color={"primary"}
                    fontWeight={400}
                  >
                    {t("read_more")}...
                  </Typography>
                  <ArrowForwardIosOutlinedIcon fontSize="small" />
                </Box> */}

                  <Button
                    sx={{
                      padding: "16px",
                      borderRadius: "8px",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                    fullWidth
                    variant="contained"
                  >
                    <DirectionsOutlinedIcon /> &nbsp; &nbsp;
                    {t("get_direction")}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
}
