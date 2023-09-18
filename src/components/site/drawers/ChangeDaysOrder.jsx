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

export default function ChangeDaysOrder() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { t } = useTranslation();

  const [days, setDays] = useState([
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
  ]);

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
    console.log(result);
    if (!result.destination) {
      return; // Dropped outside the list
    }

    const reorderedDays = [...days];
    const [movedDay] = reorderedDays.splice(result.source.index, 1);
    reorderedDays.splice(result.destination.index, 0, movedDay);

    // Update the state with the new order
    // You can also make an API call here to update the server with the new order
    // For now, we'll just update the local state
    // Note: Make sure your day objects have a unique ID (e.g., "day-1", "day-2")
    setDays(reorderedDays);
  };

  const onDragStart = (e, index) => {
    console.log("drag start", index);
  };

  const onDragEnd = (e, index) => {
    console.log("drag Emd", index);
  };

  const onDragEnter = (e, index) => {
    console.log("drag Enter", index);
  };

  return (
    <div>
      <React.Fragment key={"ShowDetails"}>
        <DisplayButton
          color="primary"
          variant="contained"
          onClick={toggleDrawer("ShowDetails", true)}
        >
          {t("change_order_days")}
        </DisplayButton>
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

              <DragDropContext>
                <Droppable droppableId="Bahaa-Id">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {days.map((day, index) => (
                        <Draggable
                          key={day.id}
                          draggableId={day.id}
                          index={index}
                        >
                          {(provided) => (
                            <Day
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <MenuIcon /> &nbsp; &nbsp; {day.name}
                            </Day>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* 
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="days">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {days.map((day, index) => (
                        <Draggable
                          key={day.id}
                          draggableId={day.id}
                          index={index}
                        >
                          {(provided) => (
                            <Day
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <MenuIcon /> &nbsp; &nbsp; {day.name}
                            </Day>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext> */}

              <Box mt={5} display={"flex"} justifyContent={"space-between"}>
                <Button
                  onClick={toggleDrawer("ShowDetails", false)}
                  sx={ButtonStyle}
                  variant="contained"
                >
                  {t("save")}
                </Button>
                <Button
                  onClick={toggleDrawer("ShowDetails", false)}
                  sx={ButtonStyle}
                >
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
      </React.Fragment>
    </div>
  );
}
