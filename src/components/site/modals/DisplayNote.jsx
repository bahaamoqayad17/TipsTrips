import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayNote() {
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
        onClick={handleClickOpen}
        px={2}
        py={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <DescriptionOutlinedIcon />
          &nbsp; &nbsp;
          <Typography fontWeight={400} fontSize={16} component={"span"}>
            notes notes notes notes notes notes notes notes notes
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
              {t("my_note")}
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Divider
            sx={{ mb: 3, mt: 1, width: "100%", borderColor: "#E0E0E0" }}
          />

          <Typography
            fontWeight={400}
            fontSize={18}
            id="alert-dialog-slide-description"
            px={"32px"}
          >
            His route is approximately 220 kilometers (137 miles) long and takes
            about 2.5 to 3 hours, depending on traffic and road conditions. It
            offers scenic views of the Swiss countryside and lakes along the
            way. It is important to note that road conditions and traffic can
            vary, so it's advisable to check for any road closures or
            construction before your trip.
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
}
