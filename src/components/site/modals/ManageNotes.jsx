import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ButtonStyle = {
  width: "166px",
  borderRadius: "4px",
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: 20,
};
export default function ManageNotes() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(
    "A wireframe is a low-fidelity sketch of a user interface, showing the layout of elements such as buttons, text fields, and navigation menus. By creating a wireframe, designers can plan the user flow and ensure that the final product is intuitive and easy to use. This helps to create a positive user experience, which is essential for the success of any digital product."
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={handleClickOpen}
        display={"flex"}
        alignItems={"center"}
      >
        <DescriptionOutlinedIcon /> &nbsp;&nbsp;
        <Typography fontSize={16} fontWeight={400} color={"#2C2C2C"}>
          {t("manage_notes")}
        </Typography>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box width={460} sx={{ padding: "16px 32px" }}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={3}
          >
            <Typography fontSize={20} fontWeight={700} color={"#2C2C2C"}>
              {t("manage_notes")}
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <TextField
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={note}
            inputProps={{ maxLength: 500 }}
            onChange={(e) => setNote(e.target.value)}
          />
          <Box mt={1} display={"flex"} flexDirection={"row-reverse"}>
            <Typography fontSize={18} color={"black"}>
              {note.length} / 500 {t("char")}
            </Typography>
          </Box>

          <Box mt={5} display={"flex"} justifyContent={"space-between"}>
            <Button onClick={handleSubmit} sx={ButtonStyle} variant="contained">
              {t("save")}
            </Button>
            <Button onClick={handleRemove} sx={ButtonStyle}>
              {t("remove")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
