import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/PropertiesSlice";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

export default function EditItenary(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { all } = useSelector(({ properties }) => properties);
  const [item, setItem] = useState({});

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (clickedPropertyId) => {
    props.setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const day = updatedDays[props.dayIndex];
      if (clickedPropertyId) {
        const clickedPropertyIndex = day.properties.findIndex(
          (property) => property.property.id === clickedPropertyId
        );

        if (clickedPropertyIndex !== -1) {
          day.properties.splice(clickedPropertyIndex + 1, 0, item);
        }
      } else {
        day.properties.push(item);
      }

      return updatedDays;
    });

    props.handleCloseModal();
  };

  useEffect(() => {
    dispatch(index());
  }, []);
  return (
    <>
      <h1 style={style}>{t("add_property")}</h1>
      <Autocomplete
        id="tags-outlined"
        sx={style}
        options={all}
        getOptionLabel={(option) => option?.title}
        onChange={(e, val) =>
          setItem({ ...item, property: { ...val, selected: 0 } })
        }
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label={t("properties")} />
        )}
      />

      <TextField
        onChange={handleChange}
        sx={style}
        fullWidth
        name="time_min"
        label={t("time_min")}
      />

      <TextField
        onChange={handleChange}
        sx={style}
        id="outlined-multiline-flexible"
        label={t("note")}
        name="note"
        multiline
        minRows={5}
        fullWidth
        value={item?.note}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={() => handleSubmit(props.propertyId)}
      >
        {t("save")}
      </Button>
    </>
  );
}
