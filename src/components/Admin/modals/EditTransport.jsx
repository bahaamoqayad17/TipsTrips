import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const style = {
  marginBottom: "30px",
};

const box = {
  display: "flex",
  justifyContent: "space-between",
  width: "80%",
  alignItems: "center",
};

const inputs = {
  display: "flex",
  justifyContent: "space-between",
  width: "115%",
  mb: 2,
  alignItems: "center",
};

export default function EditTransport(props) {
  const { t } = useTranslation();
  const [items, setItems] = useState([
    { type: "bus", duration: "", distance: "" },
    { type: "walking", duration: "", distance: "" },
    { type: "driving", duration: "", distance: "" },
  ]);

  const handleChange = (e, index) => {
    const { name, value, checked } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    updatedItems[index].checked = checked;
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    const checkedTypes = items
      .filter((item) => item.checked)
      .map((item) => item.type);

    const updatedDays = props?.days.map((day) => ({
      ...day,
      properties: day.properties.map((property) => {
        if (property.property.id === props.propertyId) {
          return {
            ...property,
            property: {
              ...property.property,
              transport: checkedTypes,
            },
          };
        }
        return property;
      }),
    }));

    props.setDays(updatedDays);
  };

  return (
    <>
      <h1 style={style}>{t("add_transport")}</h1>

      <Typography variant="h6" sx={style}>
        {t("add_time_in_mins")}
      </Typography>

      {items.map((item, index) => (
        <Box key={index} sx={box}>
          <Box sx={{ display: "flex" }}>
            <Checkbox
              checked={item.checked}
              onChange={(e) => handleChange(e, index)}
              name="checked"
            />

            <Typography sx={{ mt: 1 }}>&nbsp;{t(item.type)}</Typography>
          </Box>
          <Box>
            <Box sx={inputs}>
              <label htmlFor="">{t("duration_time")}</label>
              <TextField
                onChange={(e) => handleChange(e, index)}
                name="duration"
                value={item.duration}
              />
            </Box>
            <Box sx={inputs}>
              <label htmlFor="">{t("distance")}</label>
              <TextField
                onChange={(e) => handleChange(e, index)}
                name="distance"
                value={item.distance}
              />
            </Box>
          </Box>
        </Box>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        {t("save")}
      </Button>
    </>
  );
}
