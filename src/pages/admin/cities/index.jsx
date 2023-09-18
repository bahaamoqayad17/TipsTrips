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
import { fetchCities } from "@/store/CitySlice";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import DataTable from "@/components/Admin/DataTable";
import Button from "@mui/material/Button";
import Router from "next/router";
const Page = () => {
  const { count, cities, loading } = useSelector(({ cities }) => cities);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getPagination = (page, limit) => {
    page++;
    dispatch(fetchCities({ page, per_page: limit }));
  };

  const search = (e) => {
    const value = e.target.value;
    if (value) {
      setTimeout(() => {
        dispatch(fetchCities({ name: value }));
      }, 500);
    } else {
      dispatch(fetchCities());
    }
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Cities`}</title>
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
                {t("all_cities")}
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  onClick={() => Router.push("cities/create")}
                  color="primary"
                  variant="contained"
                >
                  {t("add_city")}
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
                      placeholder={t("search_cities")}
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
              model={"cities"}
              loading={loading}
              items={cities}
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
