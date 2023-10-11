import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SiteLayout from "@/components/site/SiteLayout";
import SingleItenirary from "@/components/site/SingleItenirary";

const Route = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 18,
  fontWeight: 400,
  marginBottom: 56,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Title = styled("h1")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 30,
}));

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("my_favorites")}
          </Route>
          <Title>{t("my_favorites")}</Title>

          <Grid container>
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
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
