import SiteLayout from "@/components/site/SiteLayout";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Email from "@/icons/Email";
import LoginFacebook from "@/icons/LoginFacebook";

const Title = styled("h1")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 28,
  fontWeight: 700,
  textAlign: "center",
}));

const Image = styled("img")(({ theme }) => ({
  cursor: "pointer",
  width: "100%",
}));

const SignIn = styled("h1")(({ theme }) => ({
  color: "#484444",
  fontSize: 14,
  fontWeight: 400,
  textAlign: "center",
}));

const Label = styled("p")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 20,
  fontWeight: 400,
  textAlign: "left",
  marginBottom: 8,
}));

const Submit = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const LoginWith = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "stretch",
  border: "1px solid #E0E0E0",
  padding: "8px 16px",
  marginBottom: 24,
  cursor: "pointer",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
  "& p": {
    color: "#2C2C2C",
    fontSize: 18,
    fontWeight: 600,
  },
}));

const Page = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <section>
        <Container>
          <Card
            sx={{ maxWidth: 468, m: "auto", border: "none", boxShadow: "none" }}
          >
            <Title>{t("signin")}</Title>

            <center>
              <LoginWith>
                <img src="/facebook-login.svg" alt="" />
                <Typography sx={{ flex: "1 0 0" }}>
                  {t("login_with_facebook")}
                </Typography>
              </LoginWith>

              <LoginWith>
                <img src="/login-google.svg" alt="" />
                <Typography sx={{ flex: "1 0 0" }}>
                  {t("login_with_google")}
                </Typography>
              </LoginWith>
            </center>

            <center>
              <Divider sx={{ color: "#484444" }} textAlign="center">
                <SignIn>{t("sign_with")}</SignIn>
              </Divider>
            </center>

            <Box>
              <Label>{t("email")}</Label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="m.reyad.s@gmail.com"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Label>{t("password")}</Label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="**********"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ cursor: "pointer" }}
                      position="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Typography
              fontSize={14}
              fontWeight={400}
              color="primary"
              textAlign="right"
              mt={1}
            >
              {t("forget_password")}
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={t("remember_me")}
              />
            </FormGroup>

            <Submit>
              <Button
                sx={{
                  fontSize: 17,
                  padding: "10px 35px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
                color="primary"
                variant="contained"
              >
                {t("login")}
              </Button>

              <Link style={{ marginTop: 20 }} href="/register">
                {t("dont_have_account")}
              </Link>

              <Link
                style={{
                  marginTop: 10,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#44A44C",
                }}
                href="/register"
              >
                {t("signup")}
              </Link>
            </Submit>
          </Card>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
