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
import { useMemo, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import countryList from "react-select-country-list";
import ReactFlagsSelect from "react-flags-select";
import Portrait from "@/icons/Portrait";
import Email from "@/icons/Email";

const Title = styled("p")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 28,
  fontWeight: 700,
  textAlign: "center",
}));

const Image = styled("img")(({ theme }) => ({
  cursor: "pointer",
  width: "100%",
}));

const SignIn = styled("p")(({ theme }) => ({
  color: "#C2C2C2",
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

const Page = () => {
  const [flag, setFlag] = useState("PS");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const flags = useMemo(() => options.map((option) => option.value), []);

  return (
    <>
      <section>
        <Container>
          <Card
            sx={{ maxWidth: 468, m: "auto", border: "none", boxShadow: "none" }}
          >
            <Title>{t("signup")}</Title>

            <center>
              <Image src="./login-facebook.svg" alt="" />
              <Image src="./login-google.svg" alt="" />
            </center>

            <center>
              <Divider textAlign="center">
                <SignIn>{t("sign_with")}</SignIn>
              </Divider>
            </center>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box>
                <Label>{t("first_name")}</Label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Bahaa"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Portrait />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Label>{t("last_name")}</Label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Moqayad"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Portrait />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box>
              <Label>{t("email")}</Label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="m.reyad.s@gmail.com"
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
              <Label>{t("country")}</Label>
              <ReactFlagsSelect
                selected={flag}
                onSelect={(data) => setFlag}
                countries={flags}
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

            <Typography fontSize={14} fontWeight={400} color="#757575" mt={1}>
              {t("password_advice")}
            </Typography>

            <FormGroup sx={{ flexDirection: "row", alignItems: "center" }}>
              <FormControlLabel
                sx={{ m: 0 }}
                control={<Checkbox />}
                label={t("i_agree")}
              />
              <span style={{ color: "#44A44C" }}> Terms&Conditions</span>
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
                {t("signup")}
              </Button>

              <Link style={{ marginTop: 20 }} href="/register">
                {t("already_have_account")}
              </Link>

              <Link
                style={{
                  marginTop: 10,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#44A44C",
                }}
                href="/login"
              >
                {t("login")}
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
