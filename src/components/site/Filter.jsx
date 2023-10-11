import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Paper } from "@mui/material";

const FilterTitle = styled("p")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 20,
  fontWeight: 600,
  margin: 0,
  marginBottom: 5,
  marginTop: 20,
}));

const seasons = [
  "all_seasons",
  "spring_march",
  "summer_june",
  "fall_september",
  "winter_december",
];

const types = [
  "car_road",
  "itinerary_car",
  "hiking_itinerary",
  "campervans_itinerary",
  "christmas_itinerary",
  "honeymoon_itinerary",
  "kids_itinerary",
  "solo_couple_itinerary",
];

const marks = [
  {
    value: 0,
    label: "Free",
  },
  {
    value: 1000,
    label: "1000",
  },
];

const countries = [
  {
    label: "Switzerland",
    value: "Switzerland",
  },
  {
    label: "Paris",
    value: "Paris",
  },
  {
    label: "London",
    value: "London",
  },
  {
    label: "Berlin",
    value: "Berlin",
  },
];

const Filter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "#F5F5F5",
          padding: "16px",
        }}
      >
        <FilterTitle>{t("choose_a_destination")} :</FilterTitle>

        <Autocomplete
          sx={{
            backgroundColor: "#fff",
            "& input": {
              textAlign: "center",
              color: "#757575",
              fontSize: 20,
              fontWeight: 600,
            },
            "& .MuiAutocomplete-paper": {
              color: "red !important",
            },
          }}
          fullWidth
          options={countries}
          defaultValue={{ label: "Switzerland", value: "Switzerland" }}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />

        <FilterTitle>{t("best_in")} :</FilterTitle>

        <FormGroup>
          {seasons.map((season) => (
            <FormControlLabel
              sx={{ justifyContent: "space-between", m: 0 }}
              control={<Checkbox />}
              label={t(season)}
              labelPlacement="start"
            />
          ))}
        </FormGroup>

        <FilterTitle>{t("destination")} :</FilterTitle>

        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="All"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="All"
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              control={<Radio />}
              label={t("all")}
              labelPlacement="start"
            />
            <FormControlLabel
              value="only_city"
              control={<Radio />}
              label={t("only_city")}
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              labelPlacement="start"
            />
            <FormControlLabel
              value="multi_destinations"
              control={<Radio />}
              label={t("multi_destinations")}
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>

        <FilterTitle>{t("type")} :</FilterTitle>

        <FormGroup>
          {types.map((type) => (
            <FormControlLabel
              sx={{ justifyContent: "space-between", m: 0 }}
              control={<Checkbox />}
              label={t(type)}
              labelPlacement="start"
            />
          ))}
        </FormGroup>

        <FilterTitle>{t("number_of_days")} :</FilterTitle>

        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="All"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="All"
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              control={<Radio />}
              label={t("all")}
              labelPlacement="start"
            />
            <FormControlLabel
              value="one_day"
              control={<Radio />}
              label={t("one_day")}
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              labelPlacement="start"
            />

            <FormControlLabel
              value="less_than_5_days"
              control={<Radio />}
              label={t("less_than_5_days")}
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              labelPlacement="start"
            />

            <FormControlLabel
              value="more_than_5_days"
              control={<Radio />}
              label={t("more_than_5_days")}
              sx={{
                justifyContent: "space-between",
                m: 0,
              }}
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>

        <FilterTitle>{t("trips_cost")} :</FilterTitle>
        <Typography>*{t("per_one_person")}</Typography>

        <Typography fontWeight={600} color={"#2c2c2c"} my={2} fontSize={20}>
          0-500$
        </Typography>

        <Slider
          defaultValue={500}
          step={10}
          marks={marks}
          max={1000}
          valueLabelDisplay="on"
          sx={{
            fontSize: 20,
            "& .MuiSlider-markLabel[data-index='1']": {
              left: "94% !important",
            },
            "& .MuiSlider-markLabel[data-index='0']": {
              left: "6% !important",
            },
            "& .MuiSlider-markLabel": {
              fontSize: "20px !important",
              fontWeight: "600 !important",
              color: "#2c2c2c !important",
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "4px", fontSize: 20, mt: 4 }}
        >
          {t("apply_filters")}
        </Button>

        <Typography
          sx={{ cursor: "pointer" }}
          color="primary"
          my={3}
          fontSize={18}
        >
          {t("reset_filters")}
        </Typography>
      </Box>
    </>
  );
};

export default Filter;
