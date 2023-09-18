import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CloseIcon from "@mui/icons-material/Close";

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

        <ArrowForwardIosSharpIcon />
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box maxWidth={460} sx={{ padding: "16px 32px" }}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={3}
          >
            <Typography fontSize={20} fontWeight={700} color={"#2C2C2C"}>
              {t("my_note")}
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Typography
            fontWeight={400}
            fontSize={18}
            id="alert-dialog-slide-description"
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
