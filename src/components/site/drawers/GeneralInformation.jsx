import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";
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
  [theme.breakpoints.down("sm")]: {
    border: "1px solid #B9B9B9",
    fontSize: 20,
    "& svg": {
      width: 30,
      height: 30,
    },
  },
}));

const Title = styled("h3")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  color: "#2C2C2C",
  marginBottom: 16,
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
      <div key={"ShowDetails"}>
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
            "& .MuiDrawer-paper": {
              backgroundColor: "#f5f5f5 !important",
            },
          }}
        >
          <Box
            sx={{
              py: "16px",
              maxWidth: { xs: "100%", md: 710 },
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={"32px"}
            >
              <Typography fontSize={20} fontWeight={700}>
                {t("general_information")}
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
              <Title>Plan the User Experience</Title>
              <p>
                A wireframe is a low-fidelity sketch of a user interface,
                showing the layout of elements such as buttons, text fields, and
                navigation menus. By creating a wireframe, designers can plan
                the user flow and ensure that the final product is intuitive and
                easy to use. This helps to create a positive user experience,
                which is essential for the success of any digital product.
              </p>
              <Box my={1}>
                <img src="/info.svg" alt="" />
              </Box>

              <p>
                A wireframe is a low-fidelity sketch of a user interface,
                showing the layout of elements such as buttons, text fields, and
                navigation menus. By creating a wireframe, designers can plan
                the user flow and ensure that the final product is intuitive and
                easy to use. This helps to create a positive user experience,
                which is essential for the success of any digital product.
              </p>

              <Title>Plan the User Experience</Title>
              <p>
                A wireframe is a low-fidelity sketch of a user interface,
                showing the layout of elements such as buttons, text fields, and
                navigation menus. By creating a wireframe, designers can plan
                the user flow and ensure that the final product is intuitive and
                easy to use. This helps to create a positive user experience,
                which is essential for the success of any digital product.
              </p>
            </Box>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}
