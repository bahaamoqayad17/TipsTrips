import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayThingsToDo() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{ cursor: "pointer" }}
        px={2}
        py={1}
        onClick={handleClickOpen}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"}>
          <TourOutlinedIcon /> &nbsp; &nbsp;
          <Typography
            fontWeight={600}
            fontSize={{ xs: 15, md: 16 }}
            component={"span"}
          >
            {t("things_to_do")}
          </Typography>
        </Box>

        <ArrowForwardIosSharpIcon fontSize="small" />
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "@media(max-width:768px)": {
            "& .MuiDialog-root": {
              position: "relative",
            },
            "& .MuiPaper-root": {
              margin: 0,
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
          },
        }}
      >
        <Box maxWidth={460} py={"16px"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={"32px"}
          >
            <Typography fontSize={20} fontWeight={700} color={"#2C2C2C"}>
              {t("my_things_to_do")}
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Divider
            sx={{ mb: 3, mt: 1, width: "100%", borderColor: "#E0E0E0" }}
          />
          <Typography fontWeight={400} fontSize={18} px={"32px"}>
            His route is approximately 220 kilometers (137 miles) long and takes
            about 2.5 to 3 hours. Traffic and road conditions. It offers scenic
            views of the Swiss countryside and lakes along . Traffic and road
            conditions.
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
}
