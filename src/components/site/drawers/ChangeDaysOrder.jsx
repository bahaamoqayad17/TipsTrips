import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DaysOrder from "@/icons/DaysOrder";

const DisplayButton = styled("button")(({ theme }) => ({
  backgroundColor: "#E0E0E0",
  borderRadius: "8px",
  width: 164,
  height: 74,
  padding: "8px 16px",
  fontSize: 16,
  fontWeight: 600,
  color: "#2C2C2C",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #B9B9B9",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MobileButton = styled("button")(({ theme }) => ({
  backgroundColor: "#E0E0E0",
  borderRadius: "4px",
  width: 200,
  height: 32,
  padding: "4px 8px",
  fontSize: 14,
  fontWeight: 400,
  color: "#2C2C2C",
  border: "1px solid #C2C2C2",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Day = styled("div")(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  width: "100%",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
  height: 43,
  padding: "8px 16px",
  fontSize: 18,
  fontWeight: 600,
  color: "#2C2C2C",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  border: "1px solid #E0E0E0",
  marginBottom: 16,
}));

const ButtonStyle = {
  width: "166px",
  borderRadius: "4px",
  padding: "8px 16px",
  fontWeight: 600,
  fontSize: 20,
};

const initDays = [
  {
    id: "1",
    name: "Day 1",
  },
  {
    id: "2",
    name: "Day 2",
  },
  {
    id: "3",
    name: "Day 3",
  },
  {
    id: "4",
    name: "Day 4",
  },
  {
    id: "5",
    name: "Day 5",
  },
  {
    id: "6",
    name: "Day 6",
  },
  {
    id: "7",
    name: "Day 7",
  },
];

export default function ChangeDaysOrder() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { t } = useTranslation();

  const [days, setDays] = useState(initDays);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedDays = [...days];
    const [movedDay] = reorderedDays.splice(result.source.index, 1);
    reorderedDays.splice(result.destination.index, 0, movedDay);
    setDays(reorderedDays);
  };

  const handleReset = () => {
    setDays(initDays);
  };

  return (
    <div>
      <div key={"ShowDetails"}>
        <DisplayButton onClick={toggleDrawer("ShowDetails", true)}>
          {t("change_order_days")}
        </DisplayButton>

        <MobileButton onClick={toggleDrawer("ShowDetails", true)}>
          <DaysOrder /> {t("change_order_days")}
        </MobileButton>
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
              width: { xs: "100%", md: "450px" },
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={3}
            >
              <Typography fontSize={20} fontWeight={700}>
                {t("change_order_days")}
              </Typography>

              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={toggleDrawer("ShowDetails", false)}
              />
            </Box>
            <Box>
              <Typography mb={3}>{t("drag_and_drop")}</Typography>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="1">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {days.map((day, index) => (
                        <Draggable
                          key={day.id}
                          draggableId={day.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Day>
                                <MenuIcon /> &nbsp; &nbsp; {day.name}
                              </Day>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>

              <Box mt={5} display={"flex"} justifyContent={"space-between"}>
                <Button
                  onClick={toggleDrawer("ShowDetails", false)}
                  sx={ButtonStyle}
                  variant="contained"
                >
                  {t("save")}
                </Button>
                <Button onClick={handleReset} sx={ButtonStyle}>
                  {t("reset")}
                </Button>
              </Box>
              <Box
                mt={5}
                display={"flex"}
                justifyContent={"center"}
                color={"#FEBE46"}
              >
                <StarRateRoundedIcon fontSize="large" />
              </Box>
            </Box>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}
