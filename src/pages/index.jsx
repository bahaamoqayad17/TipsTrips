import SiteLayout from "@/components/site/SiteLayout";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import SingleItenirary from "@/components/site/SingleItenirary";
import SingleArticle from "@/components/site/SingleArticle";
import DestinationSlider from "@/components/site/DestinationSlider";
import ChooseDestination from "@/components/site/ChooseDestination";

const destinations = [
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
  {
    id: 1,
    name: "Egypt",
    image: "./paris.svg",
  },
];
const countries = [
  {
    id: 1,
    name: "France",
  },
  {
    id: 1,
    name: "France",
  },
  {
    id: 1,
    name: "France",
  },
  {
    id: 1,
    name: "France",
  },
];

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <header className="header" style={{ textAlign: "center" }}>
        <Container sx={{ py: { xs: 5, md: 10 } }}>
          <Box>
            <Typography
              variant="h1"
              mb={2}
              fontSize={{ md: 60, xs: 37 }}
              color="primary.200"
              sx={{
                px: { xs: 8, md: 0 },
                textShadow: "4px 10px 8px rgba(0, 0, 0, 0.40)",
                paddingLeft: { xs: "20px", md: 0 },
                paddingRight: { xs: "20px", md: 0 },
                lineHeight: 1.1,
              }}
            >
              {t("ready_to_start")}
            </Typography>
            <Typography
              variant="h3"
              mb={3}
              fontSize={{ md: 32, xs: 20 }}
              color="white"
              sx={{
                px: { xs: 5, md: 0 },
                textShadow: "4px 10px 8px rgba(0, 0, 0, 0.40)",
              }}
            >
              {t("ready_content")}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                display={{ md: "block", xs: "none" }}
                mb={5}
                textAlign={"center"}
                fontSize={18}
                color="white"
                maxWidth={680}
              >
                {t("about_travel")}
              </Typography>
            </Box>
          </Box>
          <Box display={{ xs: "none", md: "block" }}>
            <ChooseDestination countries={countries} />
          </Box>
        </Container>
      </header>

      <Box sx={{ display: { xs: "block", md: "none" }, pt: 5 }}>
        <center>
          <ChooseDestination countries={countries} />
        </center>
      </Box>

      <Box>
        <Box sx={{ py: 5 }}>
          <Container>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: " 1.5rem", md: "36px" },
                mb: { xs: 2, md: 5 },
              }}
            >
              {t("popular_destinations")}
            </Typography>
            <DestinationSlider destinations={destinations} />
          </Container>
        </Box>

        {/* <Box sx={{ pb: 5, display: { xs: "none", md: "block" } }}>
          <center>
            <img src="./advertisement.svg" alt="" />
          </center>
        </Box> */}
      </Box>

      <Box sx={{ backgroundColor: "#F5F5F5" }}>
        <Container sx={{ py: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: " 1.5rem", md: "36px" },
              mb: { xs: 2, md: 5 },
            }}
          >
            {t("popular_itineraries")}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleItenirary />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* <Box sx={{ pt: 5, display: { xs: "none", md: "block" } }}>
        <center>
          <img src="./advertisement.svg" alt="" />
        </center>
      </Box> */}

      <Box>
        <Container sx={{ py: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: " 1.5rem", md: "36px" },
              mb: { xs: 2, md: 5 },
            }}
          >
            {t("latest_articles")}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SingleArticle />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Box sx={{ pb: 5, display: { xs: "none", md: "block" } }}>
        <center>
          <img src="./advertisement.svg" alt="" />
        </center>
      </Box> */}

      <Box
        sx={{
          pb: 15,
        }}
      >
        <Container>
          <Box
            sx={{
              py: { md: 5.625, xs: 2 },
              px: { md: 5, lg: 10, xs: 3 },
              backgroundColor: "#2C2C2C",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              mb={1}
              fontSize={{ xs: "18px", md: "42px" }}
              sx={{ px: { xs: 1, md: 0 } }}
              color={"white"}
            >
              {t("first_to_know")}
            </Typography>
            <Typography
              color={"white"}
              fontSize={{ xs: "14px", md: "16px" }}
              variant="body1"
              mb={{ md: 4, xs: 2 }}
            >
              {t("first_to_know_content")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                px: 2,
              }}
            >
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  width: { xs: "330px", md: "400px" },
                  mb: 2,
                }}
                placeholder={t("enter_your_email")}
                variant="outlined"
              />
              <Button
                variant="contained"
                sx={{
                  p: "16px",
                  ml: { md: 3, xs: "none" },
                  width: { xs: "100%", md: "unset" },
                  mb: 2,
                }}
              >
                {t("send")}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
