import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useTranslation } from "react-i18next";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Ticket from "@/icons/Ticket";
import Video from "@/icons/Video";
import DisplayNote from "../modals/DisplayNote";
import DisplayThingsToDo from "../modals/DisplayThingsToDo";
import styled from "@emotion/styled";
import PropertyMenu from "./PropertyMenu";

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const TitleContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "32%",
  paddingRight: 8,
  paddingLeft: 8,
  color: "#fff",
  width: "100%",
  background: `linear-gradient(rgba(250, 250, 250, 0.1),#000)`,
  [theme.breakpoints.down("sm")]: {
    top: "31%",
  },
}));

const StartTime = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 8,
  left: 8,
  borderRadius: "2px",
  background: "rgba(44, 44, 44, 0.80)",
  padding: "2px 8px",
  color: "#fff",
  fontSize: "18px",
}));

const Fork = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
}));

const SingleProperty = () => {
  const { t } = useTranslation();
  return (
    <>
      <Card
        sx={{
          width: { md: 345, xs: "100%" },
          position: "relative",
          mb: 3,
          "& .MuiCardContent-root:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="244"
          image="/test1.svg"
        />
        <Fork>
          <img src="/fork.svg" alt="" />
        </Fork>
        <StartTime>9:00 - 10:00</StartTime>
        <TitleContainer>
          <Typography fontSize={20} fontWeight={700}>
            Niederhorn Park
          </Typography>
          <Title>
            <Typography fontSize={14} fontWeight={400}>
              Interlaken - Switzerland
            </Typography>
            <PropertyMenu />
          </Title>
        </TitleContainer>

        <CardContent
          sx={{
            p: 0,
            color: "#2C2C2C",
          }}
        >
          <Box px={2} py={1} display={"flex"} alignItems={"center"}>
            <AccessTimeOutlinedIcon /> &nbsp; &nbsp;{" "}
            <Typography
              fontWeight={600}
              fontSize={{ xs: 15, md: 18 }}
              component={"span"}
            >
              {t("duration")}:
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={{ xs: 15, md: 18 }}
              component={"span"}
            >
              1 {t("hour")}
            </Typography>
          </Box>
          <Divider />
          <Box px={2} py={1} display={"flex"} alignItems={"center"}>
            <DirectionsOutlinedIcon /> &nbsp; &nbsp;{" "}
            <Typography
              fontWeight={600}
              fontSize={{ xs: 15, md: 18 }}
              component={"span"}
            >
              {t("go_to_location")}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{ cursor: "pointer" }}
            px={2}
            py={1}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <Ticket fontSize="large" />
              <Typography
                fontWeight={600}
                fontSize={{ xs: 15, md: 18 }}
                component={"span"}
              >
                {t("admission_ticket")}:
              </Typography>
              <Typography
                color="primary"
                fontWeight={400}
                fontSize={{ xs: 15, md: 18 }}
                component={"span"}
              >
                {t("free")}
              </Typography>
            </Box>

            <ArrowForwardIosSharpIcon />
          </Box>
          <Divider />

          <DisplayThingsToDo />

          <Divider />
          <DisplayNote />
          <Divider />
          <Box
            px={2}
            py={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Video fontSize="large" />

              <Typography
                fontWeight={600}
                fontSize={{ xs: 15, md: 18 }}
                component={"span"}
              >
                {t("live_camera")}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SingleProperty;
