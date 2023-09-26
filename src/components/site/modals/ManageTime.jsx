import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NumberInput = ({ max }) => {
  const style = {
    backgroundColor: "#F5F5F5",
    width: 77,
    height: 48,
    borderRadius: "4px",
    border: "none",
    textAlign: "center",
    fontSize: 20,
    color: "#2C2C2C",
    fontWeight: 700,
  };
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    const { value } = e.target;
    if (value > max) {
      setValue(max);
    } else {
      setValue(value);
    }
  };
  return (
    <input
      className="number-input"
      style={style}
      type="number"
      max={max}
      min={1}
      value={value || 1}
      onChange={handleChange}
    />
  );
};

const ButtonStyle = {
  width: "166px",
  borderRadius: "4px",
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: 20,
};
export default function ManageTime() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState(75);

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
        <AccessTimeOutlinedIcon /> &nbsp;&nbsp;
        <Typography fontSize={16} fontWeight={400} color={"#2C2C2C"}>
          {t("manage_time")}
        </Typography>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box width={510} sx={{ padding: "16px" }}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={20} fontWeight={700} color={"#2C2C2C"}>
              {t("manage_time")}
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Typography my={3} fontWeight={400} fontSize={18} color={"#616161"}>
            {t("working_hours")}: 09:00 - 16:00
          </Typography>

          <Box
            sx={{ borderBottom: "1px dotted #C2C2C2", pb: 5 }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={700} fontSize={20} color={"#2C2C2C"}>
              {t("start_time")}:
            </Typography>
            <Box display={"flex"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                mr={2}
              >
                <NumberInput max={24} />
                <Typography
                  mt={1}
                  fontWeight={400}
                  fontSize={18}
                  color={"black"}
                >
                  {t("hours")}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <NumberInput max={24} />
                <Typography
                  mt={1}
                  fontWeight={400}
                  fontSize={18}
                  color={"black"}
                >
                  {t("minutes")}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              mt={3}
              mb={1.2}
              fontWeight={400}
              fontSize={18}
              color={"#616161"}
            >
              {t("people_spend")}: 1h 15m {t("here")}
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontWeight={700} fontSize={20} color={"#2C2C2C"}>
                {t("duration")}:
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "50px",
                  padding: "4px",
                }}
                display={"flex"}
                alignItems={"center"}
              >
                <RemoveIcon
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#E0E0E0",
                    borderRadius: "50px",
                    padding: "8px",
                  }}
                  fontSize="large"
                  onClick={() => setMinutes(minutes - 1)}
                />
                <Typography
                  fontWeight={600}
                  fontSize={20}
                  color={"#4F4F4F"}
                  mx={2}
                >
                  {Math.floor(minutes / 60)}h {minutes % 60}m
                </Typography>
                <AddIcon
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#E0E0E0",
                    borderRadius: "50px",
                    padding: "8px",
                  }}
                  fontSize="large"
                  onClick={() => setMinutes(minutes + 1)}
                />
              </Box>
            </Box>
          </Box>

          <Box mt={5} display={"flex"} justifyContent={"space-between"}>
            <Button onClick={handleSubmit} sx={ButtonStyle} variant="contained">
              {t("save")}
            </Button>
            <Button
              onClick={handleRemove}
              sx={[ButtonStyle, { fontWeight: 400 }]}
            >
              {t("reset")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
