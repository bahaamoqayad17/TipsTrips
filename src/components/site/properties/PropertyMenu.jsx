import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ManageNotes from "../modals/ManageNotes";
import { useState } from "react";
import ManageTime from "../modals/ManageTime";
import Trash from "@/icons/Trash";
import { useTranslation } from "react-i18next";

export default function PropertyMenu({ color }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: color ? color : "#fff" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ManageNotes />
        </MenuItem>
        <Divider
          sx={{
            borderColor: "#C2C2C2",
            "& .css-1wiesuv-MuiButtonBase-root-MuiMenuItem-root+.MuiDivider-root":
              {
                margin: 0,
              },
          }}
        />
        <MenuItem>
          <ManageTime />
        </MenuItem>
        <Divider
          sx={{
            borderColor: "#C2C2C2",
            "& .css-1wiesuv-MuiButtonBase-root-MuiMenuItem-root+.MuiDivider-root":
              {
                margin: 0,
              },
          }}
        />
        <MenuItem>
          <Trash /> &nbsp;&nbsp;{t("remove_note")}
        </MenuItem>
      </Menu>
    </div>
  );
}
