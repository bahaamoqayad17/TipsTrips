import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import AccountMenu from "./AccountMenu";
import LanguageMenu from "./LanguageMenu";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";

const drawerWidth = 240;
const navItems = [
  { title: "home", link: "/" },
  { title: "itineraries", link: "/itineraries" },
  { title: "articles", link: "/articles" },
  { title: "my_trips", link: "/my-trips" },
  { title: "contact", link: "/contact" },
];

function NavBar(props) {
  const { window } = props;
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const user =
    typeof window !== "undefined" ? window.localStorage.getItem("user") : null;
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <AccountMenu />
      </Box>
      <Box sx={{ p: 2, pb: 0 }}>
        <LanguageMenu />
      </Box>
      <Box onClick={handleDrawerToggle} sx={{ p: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(`/${item.link}`);
                }}
                sx={{ px: 0 }}
              >
                <ListItemText primary={t(item.title)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "51px" }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "#fff" }} elevation={0} component="nav">
        <Toolbar>
          <IconButton
            sx={{
              display: { sm: "none", xs: "flex" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MenuIcon
                fontSize="large"
                color="black"
                onClick={handleDrawerToggle}
              />
              <Checkbox
                checked={checked}
                onChange={handleCheckBox}
                icon={<FavoriteBorder fontSize="large" color="black" />}
                checkedIcon={<Favorite fontSize="large" color="error" />}
                sx={{ ml: 2 }}
              />
            </Box>

            <Image src="/logo.png" width={"180"} height={"50"} alt="logo" />
          </IconButton>

          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Image
                  src="/logo.png"
                  width={"240"}
                  height={"70"}
                  alt="logo"
                  style={{ marginTop: 4 }}
                />
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {navItems.map((item, i) => (
                  <>
                    <Button
                      key={item.title}
                      sx={{
                        fontSize: { md: "14px", lg: "20" },
                        mx: 1,
                        px: 2,
                        color: "#2C2C2C/",
                        textTransform: "capitalize",
                        fontSize: "15px",
                      }}
                      onClick={() => {
                        router.push(`/${item.link}`);
                      }}
                    >
                      {t(item.title)}
                    </Button>
                    {i !== 4 && (
                      <>
                        <div
                          style={{
                            backgroundColor: "#E0E0E0",
                            height: "30px",
                            display: "inline-block",
                            width: "1px",
                          }}
                        ></div>
                      </>
                    )}
                  </>
                ))}
              </Box>
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <LanguageMenu />
                  <Box sx={{ display: "flex" }}>
                    <AccountMenu />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

export default NavBar;
