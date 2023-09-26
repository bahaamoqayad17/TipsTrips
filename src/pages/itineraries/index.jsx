import SiteLayout from "@/components/site/SiteLayout";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Filter from "@/components/site/Filter";
import SingleItenirary from "@/components/site/SingleItenirary";
import FilterDrawer from "@/components/site/drawers/FilterDrawer";

const Route = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 18,
  fontWeight: 400,
  marginBottom: 56,
}));

const Title = styled("h1")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 30,
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

const LoadMore = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: 50,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#2C2C2C",
  borderRadius: 4,
  padding: "16px 10px",
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 600,
  width: "367px",
  color: "#fff",
}));

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("itineraries")}
          </Route>

          <Box
            display={{ xs: "none", md: "flex" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Title>Itineraries in Switzerland</Title>
            <Box
              display={"flex"}
              alignItems={"center"}
              fontSize={"20px"}
              justifyContent={"space-between"}
              width={180}
              fontWeight={600}
            >
              {t("share")}
              <img src="/facebook.svg" alt="" />
              <img src="/mail.svg" alt="" />
              <img src="/share.svg" alt="" />
            </Box>
          </Box>

          <Box display={{ xs: "block", md: "none" }}>
            <Title>Itineraries in Switzerland</Title>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={3}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                fontSize={"20px"}
                justifyContent={"space-between"}
                width={120}
                fontWeight={600}
              >
                <img src="/facebook.svg" alt="" />
                <img src="/mail.svg" alt="" />
                <img src="/share.svg" alt="" />
              </Box>
              <Box display={{ xs: "block", md: "none" }}>
                <FilterDrawer />
              </Box>
            </Box>
          </Box>

          <Grid container>
            <Grid xs={12} md={4}>
              <Box sx={{ display: { xs: "none", md: "block" } }} maxWidth={330}>
                <Filter />
              </Box>
            </Grid>

            <Grid xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleItenirary />
                </Grid>
              </Grid>

              <LoadMore>{t("load_more_itineraries")}</LoadMore>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
