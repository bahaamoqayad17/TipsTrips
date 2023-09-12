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
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AccountMenu from "./AccountMenu";
import LanguageMenu from "./LanguageMenu";
import Link from "next/link";
import { BorderHeart } from "@/icons/BorderHeart";

const drawerWidth = 240;
const navItems = [
  { title: "home", link: "/" },
  { title: "itineraries", link: "/" },
  { title: "articles", link: "/articles" },
  { title: "my_trips", link: "/my-trips" },
  { title: "contact", link: "/" },
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
      <AppBar
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 0px 8px #c5c5c5",
          zIndex: { xs: 1, md: 5000 },
        }}
        component="nav"
      >
        <Toolbar sx={{ px: { xs: 0, md: "16px" } }}>
          <IconButton
            sx={{
              display: { sm: "flex", xs: "flex", md: "none" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MenuIcon
                fontSize="medium"
                color="black"
                onClick={handleDrawerToggle}
              />
              <BorderHeart fontSize="medium" color="black" sx={{ ml: 2 }} />
            </Box>

            <img width={"140px"} src="/logo-mobile.svg" alt="logo" />
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
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <img src="/logo.png" alt="logo" style={{ marginTop: 4 }} />
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                {navItems.map((item, i) => (
                  <>
                    <Link
                      key={item.title}
                      style={{
                        color: "#2C2C2C",
                        fontSize: "17px",
                        display: "block",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                      href={`${item.link}`}
                    >
                      {t(item.title)}
                    </Link>
                    {i !== 4 && (
                      <>
                        <div
                          style={{
                            backgroundColor: "#E0E0E0",
                            height: "30px",
                            display: "block",
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
