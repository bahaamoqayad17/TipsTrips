import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SiteLayout from "@/components/site/SiteLayout";
import { GrayBorderHeart } from "@/icons/GrayBorderHeart";
import AddIcon from "@mui/icons-material/Add";
import RecommendedRestaurants from "@/components/site/drawers/RecommendedRestaurants";
import RecommendedHotels from "@/components/site/drawers/RecommendedHotels";
import GeneralInformation from "@/components/site/drawers/GeneralInformation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MenuIcon from "@mui/icons-material/Menu";
import ChangeDaysOrder from "@/components/site/drawers/ChangeDaysOrder";
import TripTimeline from "@/components/site/TripTimeline";
import Map from "@/components/site/Map";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import MapIcon from "@/icons/MapIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImagesSlider from "@/components/site/properties/ImagesSlider";
import GalleryModal from "@/components/site/GalleryModal";
import ShareMenu from "@/components/site/ShareMenu";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Route = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 18,
  fontWeight: 400,
  marginBottom: 10,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Title = styled("h1")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 40,
  fontWeight: 700,
  maxWidth: 600,
  lineHeight: 1.375,
  [theme.breakpoints.down("sm")]: {
    fontSize: 22,
    maxWidth: 280,
  },
}));

const SubTitle = styled("p")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 20,
  fontWeight: 700,
  display: "inline-block",
  marginRight: 16,
  marginBottom: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
}));

const Badge = styled("div")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  padding: "8px 16px",
  marginRight: 16,
  display: "inline-block",
  fontSize: 15,
  fontWeight: "normal",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    padding: "4px 8px",
  },
}));

const Button = styled("button")(({ theme }) => ({
  backgroundColor: "#44A44C",
  color: "#fff",
  borderRadius: "4px",
  width: "100%",
  height: 63,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
    "& svg": {
      width: 30,
      height: 30,
    },
  },
}));

const TabStyle = {
  minWidth: 74,
  height: 74,
  borderRadius: "8px",
  color: "#2C2C2C",
  backgroundColor: "#fff",
  boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.10)",
  border: "0.25px solid #E0E0E0",
  fontSize: 18,
  marginRight: "8px",
};

const Day = styled("p")(({ theme }) => ({
  fontSize: 18,
  color: "#2c2c2c",
  fontWeight: 400,
  margin: 0,
}));

const ShowInMap = styled("button")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  backgroundImage: "url(/map.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  borderRadius: "8px",
  fontSize: 18,
  color: "#2C2C2C",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  cursor: "pointer",
  border: "1px solid #B9B9B9",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ShowMapMobile = styled("button")(({ theme }) => ({
  backgroundColor: "#E0E0E0",
  borderRadius: "4px",
  fontSize: 14,
  padding: "4px 8px",
  width: 125,
  height: 32,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 400,
  color: "#2C2C2C",
  border: "1px solid #C2C2C2",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={{ md: 5, xs: 0 }} pt={"5px"} pl={0}>
          {children}
        </Box>
      )}
    </div>
  );
};
const Page = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <section>
        <Container sx={{ mb: 4 }}>
          <Route>
            {t("home")} / {t("itineraries")}
          </Route>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Title>
              Itinerary 6 days in Amsterdam and the Dutch countryside
            </Title>
            <Box
              display={{ md: "flex", xs: "none" }}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={180}
            >
              <img src="/facebook.svg" alt="" />
              <img src="/mail.svg" alt="" />
              <img src="/share.svg" alt="" />
              <GrayBorderHeart fontSize="large" />
            </Box>

            <Box display={{ md: "none", xs: "block" }}>
              <ShareMenu />
            </Box>
          </Box>

          <Grid container>
            <Grid item xs={12}>
              <Box display={{ xs: "block", md: "none" }}>
                <ImagesSlider />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography mb={{ xs: 3, md: 6 }}>
                {t("about_content")}
              </Typography>

              <Box>
                <SubTitle>{t("best_in")} : </SubTitle>
                <Badge>{t("spring")}</Badge>
                <Badge>{t("summer")}</Badge>
              </Box>

              <Box>
                <SubTitle>{t("type")} : </SubTitle>
                <Badge>{t("itinerary_car")}</Badge>
                <Badge>{t("kids_itinerary")}</Badge>
              </Box>

              <Box mb={5}>
                <SubTitle>{t("trips_cost")} : </SubTitle>
                <Badge style={{ color: "#44A44C", fontWeight: 400 }}>
                  {t("free")}
                </Badge>
                <Typography>*{t("per_one_person")}</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button>
                    <AddIcon /> &nbsp;{t("add_to_my_trips")}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RecommendedHotels />
                </Grid>

                <Grid item xs={12} md={6}>
                  <GeneralInformation />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RecommendedRestaurants />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display={{ xs: "none", md: "block" }}>
                <GalleryModal />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box py={2} sx={{ backgroundColor: "#f5f5f5" }}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  display={{ xs: "flex", md: "none" }}
                  justifyContent={"space-between"}
                >
                  {!showMap && (
                    <>
                      <ShowMapMobile onClick={() => setShowMap(true)}>
                        <MapIcon />
                        {t("show_in_map")}
                      </ShowMapMobile>
                    </>
                  )}
                  {showMap && (
                    <>
                      <ShowMapMobile
                        style={{
                          backgroundImage: "none",
                          backgroundColor: "#E0E0E0",
                        }}
                        onClick={() => setShowMap(false)}
                      >
                        <MenuIcon /> {t("show_in_list")}
                      </ShowMapMobile>
                    </>
                  )}
                  <ChangeDaysOrder />
                </Box>
              </Grid>

              <Grid item md={8} xs={12}>
                <Tabs
                  value={value}
                  onChange={(e, val) => setValue(val)}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#C1E1C3",
                      border: "1px solid #44A44C",
                      color: "#2C2C2C",
                    },
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                    overflow: "unset",
                    position: "relative",
                    "& .MuiTabs-scrollButtons:first-child": {
                      color: "#fff",
                      position: "absolute",
                      left: "-3%",
                      top: "20%",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      zIndex: 50000,
                    },
                    "& .MuiTabs-scrollButtons:last-child": {
                      color: "#fff",
                      position: "absolute",
                      right: "-3%",
                      top: "20%",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      zIndex: 50000,
                    },
                    "& .MuiTabs-more:first-child": {
                      color: "#FF5733",
                      "&:hover": {
                        color: "#FF5733",
                      },
                    },

                    "@media (max-width: 768px)": {
                      "& .MuiTabs-scrollButtons:last-child": {
                        display: "none",
                      },
                      "& .MuiTabs-scrollButtons:first-child": {
                        display: "none",
                      },
                    },

                    "& .MuiTabs-more:last-child": {
                      color: "#44A44C",
                      "&:hover": {
                        color: "#2C2C2C",
                      },
                    },
                    "& .css-ptiqhd-MuiSvgIcon-root": {
                      fontSize: "2.25rem",
                    },
                  }}
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Tab
                      sx={TabStyle}
                      label={
                        <div>
                          <Day>Day</Day>{" "}
                          <Day style={{ fontWeight: 600 }}>{i + 1}</Day>
                        </div>
                      }
                      key={i}
                    />
                  ))}
                </Tabs>
              </Grid>

              <Grid item md={4} xs={12}>
                <Box
                  display={{ xs: "none", md: "flex" }}
                  justifyContent={"space-around"}
                >
                  <ChangeDaysOrder />
                  {!showMap && (
                    <>
                      <ShowInMap onClick={() => setShowMap(true)}>
                        &nbsp; <MenuIcon /> &nbsp; &nbsp; {t("show_in_map")}
                        &nbsp;
                      </ShowInMap>
                    </>
                  )}
                  {showMap && (
                    <>
                      <ShowInMap
                        style={{
                          backgroundImage: "none",
                          backgroundColor: "#E0E0E0",
                        }}
                        onClick={() => setShowMap(false)}
                      >
                        &nbsp; <MenuIcon /> &nbsp; &nbsp; {t("show_in_list")}
                        &nbsp;
                      </ShowInMap>
                    </>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                {!showMap ? (
                  Array.from({ length: 20 }).map((_, i) => (
                    <TabPanel value={value} index={i} key={i}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={{ md: "center", xs: "flex-start" }}
                        flexDirection={{ xs: "column", md: "row" }}
                      >
                        <Box mb={3}>
                          <Typography
                            color={"#000"}
                            fontWeight={600}
                            fontSize={18}
                          >
                            Day 1: Amsterdam - Zaandam
                          </Typography>
                        </Box>
                        <Box mb={{ xs: 2, md: 0 }}>
                          <Typography
                            color={"#2c2c2c"}
                            fontWeight={{ md: 600, xs: 400 }}
                            fontSize={{ md: 20, xs: 16 }}
                            maxWidth={290}
                          >
                            Total estimated duration of visits to places for
                            this day:{" "}
                            <Typography
                              fontWeight={600}
                              fontSize={{ md: 20, xs: 16 }}
                              color={"primary"}
                              component={"span"}
                            >
                              8 Hours
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                      <TripTimeline />
                    </TabPanel>
                  ))
                ) : (
                  <>
                    <Map />
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
