import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import Search from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/store/CountrySlice";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import DataTable from "@/components/Admin/DataTable";
import Button from "@mui/material/Button";
import Router from "next/router";
const Page = () => {
  const { count, countries, loading } = useSelector(
    ({ countries }) => countries
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getPagination = (page, limit) => {
    page++;
    dispatch(fetchCountries({ page, per_page: limit }));
  };

  const search = (e) => {
    const value = e.target.value;
    if (value) {
      setTimeout(() => {
        dispatch(fetchCountries({ name: value }));
      }, 500);
    } else {
      dispatch(fetchCountries());
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Countries`}</title>
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
                {t("all_countries")}
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  onClick={() => Router.push("countries/create")}
                  color="primary"
                  variant="contained"
                >
                  {t("add_country")}
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      onChange={(e) => search(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder={t("search_countries")}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <DataTable
              getPagination={getPagination}
              model={"countries"}
              loading={loading}
              items={countries}
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
