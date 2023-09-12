import SiteLayout from "@/components/site/SiteLayout";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { useTranslation } from "react-i18next";
import SingleArticle from "@/components/site/SingleArticle";
import styled from "@emotion/styled";

const LoadMore = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: 30,
  marginBottom: 30,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#EDEDED",
  borderRadius: 4,
  padding: "16px 10px",
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 600,
  width: "367px",
}));

const Page = () => {
  const options = useMemo(() => countryList().getData(), []);

  const [selectedCountries, setSelectedCountries] = useState([
    "France",
    "Italy",
    "Palestine",
    "Sweden",
    "Spain",
  ]);

  const handleDelete = (country) => {
    setSelectedCountries(selectedCountries.filter((val) => val !== country));
  };

  const handleChange = (event) => {
    setSelectedCountries([...selectedCountries, event.target.value]);
  };

  const { t } = useTranslation();

  const Route = styled("p")(({ theme }) => ({
    color: "#757575",
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 56,
  }));

  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("articles")}
          </Route>
          <FormControl
            sx={{
              width: 140,
              backgroundColor: "#EDEDED",
              mb: 7,
            }}
          >
            <InputLabel
              sx={{ color: "#2C2C2C", fontSize: "20px", fontWeight: "700" }}
              id="demo-simple-select-label"
            >
              {t("country")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label={t("country")}
              sx={{ "& fieldset": { border: "none" } }}
              onChange={handleChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" flexWrap={"wrap"} mb={5} spacing={1}>
            {selectedCountries.map((country) => (
              <Chip
                label={country}
                variant="outlined"
                sx={{ fontSize: "20px", border: "1.5px solid #EDEDED" }}
                onDelete={() => handleDelete(country)}
              />
            ))}
          </Stack>

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

          <LoadMore>{t("load_more_articles")}</LoadMore>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
