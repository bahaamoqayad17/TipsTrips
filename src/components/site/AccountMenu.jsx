import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import { BorderHeart } from "@/icons/BorderHeart";
import Link from "next/link";

const navItems = [
  {
    title: "my_trips",
    link: "/",
  },
  {
    title: "my_favorites",
    link: "/",
  },
  {
    title: "my_subscriptions",
    link: "/",
  },
  {
    title: "edit",
    link: "/",
  },
  {
    title: "sign_out",
    link: "/",
  },
];

export default function AccountMenu() {
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
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box display={{ xs: "none", md: "block" }}>
          <Link
            href={"/"}
            style={{
              margin: "10px 10px 0 10px",
            }}
          >
            <BorderHeart fontSize="large" />
          </Link>
        </Box>
        <Tooltip title={t("settings")}>
          <Box
            onClick={handleClick}
            size="small"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "#007590",
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <KeyboardArrowDownIcon
              fontSize="large"
              color="black"
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Avatar
              sx={{
                width: 40,
                height: 40,
                display: { xs: "none", md: "flex" },
              }}
              src={"./avatar.png"}
            />
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 40, height: 40 }} src={"./avatar.png"} />

              <Typography variant="h6" ml={1} color={"Black"}>
                Bahaa
              </Typography>

              <KeyboardArrowDownIcon fontSize="large" color="black" />
            </Box>
          </Box>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            width: { xs: "160px", md: "200px" },
            position: "relative",
            mt: { md: 2, xs: 0 },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            zIndex: 6000,
            borderRadius: "0px 0px 8px 8px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,10%)",
          },
        }}
        transformOrigin={{ horizontal: "bottom", vertical: "top" }}
        anchorOrigin={{ horizontal: "bottom", vertical: "bottom" }}
      >
        {navItems.map((item, i) => (
          <>
            <MenuItem
              sx={{
                py: 0,
                fontSize: "18px",
                fontWeight: 400,
                color: "#2C2C2C",
              }}
              style={item.title === "sign_out" ? { color: "#44A44C" } : {}}
              key={item.title}
              onClick={handleClose}
            >
              {t(item.title)}
            </MenuItem>
            {i !== navItems.length - 1 && (
              <Divider
                sx={{
                  backgroundColor: "#E0E0E0",
                }}
                className="divider-account"
              />
            )}
          </>
        ))}
      </Menu>
    </>
  );
}
