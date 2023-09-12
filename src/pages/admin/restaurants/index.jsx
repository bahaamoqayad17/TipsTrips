import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Search from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/RestaurantSlice";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import DataTable from "@/components/Admin/DataTable";
import { useRouter } from "next/router";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const Page = () => {
  const { count, all, loading } = useSelector(({ restaurants }) => restaurants);
  const { countries } = useSelector(({ countries }) => countries);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [country, setCountry] = useState({});

  const getPagination = (page, limit) => {
    page++;
    dispatch(index({ page, per_page: limit }));
  };

  const search = (e) => {
    const value = e.target.value;
    if (value) {
      setTimeout(() => {
        dispatch(index({ name: value }));
      }, 500);
    } else {
      dispatch(index());
    }
  };

  useEffect(() => {
    dispatch(index());
    dispatch(fetchCountriesAndCites());
  }, []);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Restaurants`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                mb: 5,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h3">
                {t("all_restaurants")}
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  onClick={() => router.push("restaurants/create")}
                  color="primary"
                  variant="contained"
                >
                  {t("add_restaurant")}
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={{ xs: "column", md: "row" }}
                  >
                    <TextField
                      onChange={(e) => search(e)}
                      fullWidth
                      sx={{ my: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder={t("search_restaurants")}
                      variant="outlined"
                    />
                    &nbsp; &nbsp; &nbsp;
                    <Autocomplete
                      sx={{ my: 1 }}
                      fullWidth
                      options={countries}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        setCountry(value);
                        dispatch(index({ country_id: value?.id }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("country")}
                          variant="outlined"
                        />
                      )}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <Autocomplete
                      fullWidth
                      sx={{ my: 1 }}
                      options={
                        countries.find((item) => country?.id === item.id)
                          ?.cities || []
                      }
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        dispatch(index({ city_id: value?.id }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("city")}
                          variant="outlined"
                        />
                      )}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel>{t("published")}</InputLabel>
                      <Select
                        native
                        name="is_draft"
                        onChange={(e) => {
                          dispatch(index({ is_draft: e.target.value }));
                        }}
                        label={t("published")}
                      >
                        <option value="0">{t("published")}</option>
                        <option value="1">{t("draft")}</option>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <DataTable
              getPagination={getPagination}
              model={"restaurants"}
              loading={loading}
              items={all}
              count={count}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
