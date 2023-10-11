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

export default function Alert() {
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
        py={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <img src="/warning.svg" alt="" />
        &nbsp; &nbsp; &nbsp;
        <Typography fontSize={16} fontWeight={400} color={"black"}>
          The best and easy road driving from Como to Interlaken...
        </Typography>
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
        <Box maxWidth={{ md: 600, xs: 640 }} py={"16px"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={"32px"}
          >
            <Box display={"flex"}>
              <img src="/warning.svg" alt="" />
              &nbsp;&nbsp;&nbsp;
              <Typography fontSize={20} fontWeight={700} color={"#2C2C2C"}>
                {t("traffic_alert")}
              </Typography>
            </Box>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Divider
            sx={{ mb: 3, mt: 1, width: "100%", borderColor: "#E0E0E0" }}
          />

          <Box px={"32px"}>
            <Box mb={3}>
              <Typography mb={3} fontWeight={400} fontSize={18}>
                The best and easiest road route from Como to Interlaken is as
                follows:
              </Typography>

              <Typography ontWeight={400} fontSize={18}>
                1-Start in Como, Italy, and head north on the A9 highway.
              </Typography>
              <Typography ontWeight={400} fontSize={18}>
                2-Continue on the A9, passing through Lugano, Switzerland.
              </Typography>
              <Typography ontWeight={400} fontSize={18}>
                3-Take the A2 highway towards Lucerne.
              </Typography>
              <Typography ontWeight={400} fontSize={18}>
                4-In Lucerne, take the A8 highway towards Interlaken.
              </Typography>
              <Typography ontWeight={400} fontSize={18}>
                5-Follow the A8 until you reach Interlaken.
              </Typography>
            </Box>

            <Typography ontWeight={400} fontSize={18}>
              This route is approximately 220 kilometers (137 miles) long and
              takes about 2.5 to 3 hours, depending on traffic and road
              conditions. It offers scenic views of the Swiss countryside and
              lakes along the way. It is important to note that road conditions
              and traffic can vary, so it's advisable to check for any road
              closures or construction before your trip.
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
