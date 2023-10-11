import SiteLayout from "@/components/site/SiteLayout";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

const Route = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 18,
  fontWeight: 400,
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

const TitleTwo = styled("h2")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 25,
  fontWeight: 700,
  marginBottom: 30,
}));

const MessageContainer = styled("div")(({ theme }) => ({
  marginBottom: 30,
  borderRadius: 8,
  backgroundColor: "#F5F5F5",
  padding: 16,
}));

const Page = () => {
  const { t } = useTranslation();
  const [item, setItem] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("contact")}
          </Route>
          <Title>{t("contact")}</Title>

          <TitleTwo>{t("send_us_message")}</TitleTwo>

          <Grid container>
            <Grid xs={12} md={6}>
              <MessageContainer>
                <TextField
                  fullWidth
                  label={t("full_name")}
                  variant="outlined"
                  onChange={handleChange}
                  name="full_name"
                  sx={{ backgroundColor: "#fff", borderRadius: "4px", mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={t("email")}
                  type="email"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  sx={{ backgroundColor: "#fff", borderRadius: "4px", mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={t("type_message")}
                  variant="outlined"
                  name="message"
                  onChange={handleChange}
                  sx={{ backgroundColor: "#fff", borderRadius: "4px", mb: 2 }}
                  multiline
                  rows={5}
                />
                <ReCAPTCHA
                  sitekey="Your client site key"
                  onChange={(v) => setItem({ ...item, captcha: v })}
                  style={{ marginBottom: 16 }}
                />

                <Button
                  sx={{ width: "166px", borderRadius: "4px", fontSize: 18 }}
                  variant="contained"
                >
                  {t("send")}
                </Button>
              </MessageContainer>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
