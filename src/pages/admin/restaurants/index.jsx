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
import Search from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { index } from "@/store/RestaurantsSlice";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import DataTable from "@/components/Admin/DataTable";
import { useRouter } from "next/router";

const Page = () => {
  const { count, all, loading } = useSelector(({ restaurants }) => restaurants);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  const getPagination = (page, limit) => {
    page++;
    dispatch(index({ page }));
  };

  const search = (e) => {
    const value = e.target.value;
    if (value) {
      setTimeout(() => {
        dispatch(index({ searchbyjobname: value }));
      }, 500);
    } else {
      dispatch(index());
    }
  };

  useEffect(() => {
    dispatch(index());
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
                      placeholder={t("search_restaurants")}
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
