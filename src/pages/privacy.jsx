import SiteLayout from "@/components/site/SiteLayout";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

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
}));
const Content = styled("p")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  marginTop: 20,
  color: "#000",
  marginBottom: 20,
}));

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("privacy_policy")}
          </Route>

          <Grid container>
            <Grid md={6} xs={12}>
              <Title>{t("privacy_policy")}</Title>
              <Content>{t("about_content")}</Content>
              <Title>{t("who_are_we")}</Title>
              <Content>{t("who_are_we_content1")}</Content>
              <Content>{t("who_are_we_content2")}</Content>
              <Title>{t("our_mission")}</Title>
              <Content>{t("our_mission_content1")}</Content>
              <Content>{t("our_mission_content2")}</Content>
              <Title>{t("how_to_contact")}</Title>
              <Content>{t("how_to_contact_content1")}</Content>
              <Content>{t("how_to_contact_content2")}</Content>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
