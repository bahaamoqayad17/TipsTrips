import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";

import CloseIcon from "@mui/icons-material/Close";

const Button = styled("button")(({ theme }) => ({
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

export default function GeneralInformation() {
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
      <React.Fragment key={"ShowDetails"}>
        <Button
          color="primary"
          variant="contained"
          onClick={toggleDrawer("ShowDetails", true)}
        >
          <InfoIcon color="primary" /> &nbsp; {t("general_information")}
        </Button>
        <Drawer
          anchor={"left"}
          open={state["ShowDetails"]}
          onClose={toggleDrawer("ShowDetails", false)}
          sx={{
            overflowY: "scroll",
            position: "relative",
            zIndex: 10000000,
          }}
        >
          <Box
            sx={{
              padding: "16px 32px",
              width: "450px",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography fontSize={20} fontWeight={700}>
                {t("general_information")}
              </Typography>

              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={toggleDrawer("ShowDetails", false)}
              />
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
