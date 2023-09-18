import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (lang) => {
    setAnchorEl(null);
    window.location.reload();
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="black"
        sx={{ p: { xs: 0 }, textTransform: "capitalize" }}
      >
        <LanguageIcon />
        &nbsp; English
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        sx={{
          top: "22px",
        }}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose("ar")}>{t("arabic")}</MenuItem>
        <MenuItem onClick={() => handleClose("en")}>{t("english")}</MenuItem>
      </Menu>
    </div>
  );
}
