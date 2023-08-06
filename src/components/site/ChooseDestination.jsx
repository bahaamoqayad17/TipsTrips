import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

export default function ChooseDestination({ countries }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ outline: "2px #fff solid", px: 4, py: 1.5, fontSize: 18 }}
        style={open ? { backgroundColor: "#fff", color: "#000" } : {}}
        variant="contained"
      >
        {t("choose_destination")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Autocomplete
          options={countries.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              sx={{ width: 280, px: 1, my: 2 }}
              className="search-input"
              placeholder={t("choose_city_or_country")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ fontWeight: "bold" }}>
                    <SearchIcon /> {t("where_to")}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Divider sx={{ backgroundColor: "#000" }} />
        <Box sx={{ mt: 1 }}>
          {countries.map((country) => (
            <>
              <MenuItem
                sx={{
                  ":hover": {
                    backgroundColor: "#44A44C",
                    color: "#fff",
                  },
                  width: "100%",
                }}
                fullWidth
                onClick={handleClose}
              >
                <LocationOnIcon /> &nbsp; {country.name}
              </MenuItem>
            </>
          ))}
        </Box>
      </Menu>
    </div>
  );
}
