import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import EditPenIcon from "@mui/icons-material/Create";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "./ConfirmDialog";

export default function DynamicMenu({ item, model }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Link
            href={{ pathname: `/admin/${model}/${item.id}` }}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <EditPenIcon fontSize="small" />
            &nbsp; {t("edit")}
          </Link>
        </MenuItem>
        <MenuItem>
          <ConfirmDialog
            model={model}
            id={item.id}
            setOpen={setOpenMenu}
            open={openMenu}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
