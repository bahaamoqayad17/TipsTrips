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
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Filter from "../Filter";
import Settings from "@/icons/Settings";

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
}));

const Suitable = styled("p")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  color: "#fff",
  position: "absolute",
  top: "43%",
  left: 8,
}));

export default function FilterDrawer() {
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
        <Settings onClick={toggleDrawer("ShowDetails", true)} />
        <Drawer
          anchor={"left"}
          open={state["ShowDetails"]}
          onClose={toggleDrawer("ShowDetails", false)}
          sx={{
            overflowY: "scroll",
            position: "relative",
          }}
        >
          <Box maxWidth={330}>
            <Filter />
          </Box>
        </Drawer>
      </div>
    </div>
  );
}
