import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Router from "next/router";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

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

const Suitable = styled("p")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  color: "#fff",
  position: "absolute",
  top: "43%",
  left: 8,
}));

export default function RecommendedHotels() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { t } = useTranslation();

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
      <div key={"ShowDetails"}>
        <DisplayButton
          color="primary"
          variant="contained"
          onClick={toggleDrawer("ShowDetails", true)}
        >
          <LocalHotelIcon color="primary" /> &nbsp; {t("recommended_hotels")}
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
                {t("recommended_hotels")}
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
                  borderRadius: "16px",
                  boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.10)",
                  border: "1px solid #C2C2C2",
                  position: "relative",
                }}
              >
                <CardMedia component="img" height="250" image="/hotel.svg" />
                <Suitable>Suitable for couples and families</Suitable>
                <CardContent sx={{ pl: 2 }}>
                  <Typography
                    gutterBottom
                    fontSize={20}
                    color={"#2c2c2c"}
                    fontWeight={700}
                  >
                    Catalonia Plaza Hotel
                  </Typography>
                  <Box mb={1} color={"#FEBE46"}>
                    <StarRateRoundedIcon />
                    <StarRateRoundedIcon />
                    <StarRateRoundedIcon />
                    <StarRateRoundedIcon />
                    <StarRateRoundedIcon />
                  </Box>

                  <Typography
                    gutterBottom
                    fontSize={16}
                    color={"#2c2c2c"}
                    fontWeight={400}
                    mb={2}
                  >
                    Hotel Description is Here ...........
                  </Typography>
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
                    {t("check_price")}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}
