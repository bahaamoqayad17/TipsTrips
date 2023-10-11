import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import DisplayNote from "../modals/DisplayNote";
import styled from "@emotion/styled";
import PropertyMenu from "./PropertyMenu";

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const TitleContainer = styled("div")(({ theme }) => ({
  padding: "8px",
  color: "#2c2c2c",
  width: "100%",
}));

const Transport = () => {
  const { t } = useTranslation();
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          position: "relative",

          "& .MuiCardContent-root:last-child": {
            paddingBottom: 0,
          },
          mb: 3,
        }}
      >
        <TitleContainer>
          <Typography fontSize={20} fontWeight={700}>
            Niederhorn Park
          </Typography>
          <Title>
            <Typography fontSize={14} fontWeight={400}>
              Interlaken - Switzerland
            </Typography>
            <PropertyMenu color={"black"} />
          </Title>
        </TitleContainer>

        <CardContent
          sx={{
            p: 0,
            color: "#2C2C2C",
          }}
        >
          <Divider />

          <Box px={2} py={1} display={"flex"} alignItems={"center"}>
            <DirectionsOutlinedIcon /> &nbsp; &nbsp;{" "}
            <Typography fontWeight={600} fontSize={18} component={"span"}>
              {t("go_to_location")}
            </Typography>
          </Box>
          <Divider />

          <DisplayNote />
        </CardContent>
      </Card>
    </>
  );
};

export default Transport;
