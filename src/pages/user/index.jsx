import SiteLayout from "@/components/site/SiteLayout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Portrait from "@/icons/Portrait";
import Email from "@/icons/Email";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";

const Upload = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fontSize: 16,
  fontWeight: 600,
  color: "#fff",
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 8,
  height: 60,
  cursor: "pointer",
}));

const Label = styled("p")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 20,
  fontWeight: 400,
  textAlign: "left",
  marginBottom: 8,
}));

const Page = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState("/avatar.png");
  const [flag, setFlag] = useState("PS");

  const options = useMemo(() => countryList().getData(), []);
  const flags = useMemo(() => options.map((option) => option.value), []);

  return (
    <>
      <section>
        <Container>
          <Grid container>
            <Grid md={6} xs={12}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                maxWidth={320}
              >
                <Avatar src={image} sx={{ width: 100, height: 100 }} />
                <label htmlFor="fileInput">
                  <Upload>
                    <AddIcon /> {t("upload_photo")}
                  </Upload>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Box>

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
                  onSelect={(data) => setFlag(data)}
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
                  type={"password"}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box width={{ xs: "100%", md: "48%" }}>
                  <Label>{t("new_password")}</Label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    placeholder="password"
                  />
                </Box>

                <Box width={{ xs: "100%", md: "48%" }}>
                  <Label>{t("repeat_new_password")}</Label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    placeholder="password"
                  />
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{ width: 150, height: 40, my: 3, borderRadius: "4px" }}
              >
                {t("save")}
              </Button>

              <Box display={"flex"} flexDirection={"row-reverse"}>
                <Button sx={{ width: 150, height: 40, borderRadius: "4px" }}>
                  {t("delete_account")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
