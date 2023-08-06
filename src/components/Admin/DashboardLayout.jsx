import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import ChangeLanguage from "./ChangeLanguage";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import HotelIcon from "@mui/icons-material/Hotel";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FestivalIcon from "@mui/icons-material/Festival";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import CommuteIcon from "@mui/icons-material/Commute";

const drawerWidth = 240;

function DashboardLayout(props) {
  const router = useRouter();
  const lang = "ar";
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const logout = () => {
    console.log("logg out");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const topics = [
    // {
    //   title: "dashboard",
    //   icon: HomeIcon,
    //   link: "",
    // },
    {
      title: "hotels",
      icon: HotelIcon,
      link: "/hotels",
    },
    {
      title: "articles",
      icon: DocumentScannerIcon,
      link: "/articles",
    },
    {
      title: "properties",
      icon: FestivalIcon,
      link: "/properties",
    },
    {
      title: "restaurants",
      icon: StorefrontIcon,
      link: "/restaurants",
    },
    {
      title: "destinations",
      icon: AddRoadIcon,
      link: "/destinations",
    },
    {
      title: "itineraries",
      icon: CommuteIcon,
      link: "/itineraries",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {topics.map((item, index) => (
          <Link
            style={{ color: "unset", textDecoration: "none" }}
            href={`/admin${item.link}`}
            key={item.title + index + "o"}
          >
            <ListItem
              style={
                item.title !== "dashboard" &&
                router.pathname.startsWith(`/admin${item.link}`)
                  ? { backgroundColor: "#44A44C" }
                  : {}
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={t(item.title)}
                  sx={{ textAlign: "start" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: lang === "en" && `${drawerWidth}px` },
          ml: { sm: lang === "ar" && `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ backgroundColor: "#fff" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, ml: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <Image
                  src={"/logo.png"}
                  width={"220"}
                  height={"60"}
                  alt="test"
                />
              </Typography>
            </Box>
            <Box>
              {/* <ChangeLanguage lang={lang} /> */}
              {/* <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: "12px" }}
                onClick={logout}
              >
                {t("logout")}
              </Button> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            borderLeft: "1px solid #0000001f",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "hidden",
          backgroundColor: "#F6F6F6",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayout;
