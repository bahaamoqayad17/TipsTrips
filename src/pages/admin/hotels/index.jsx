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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import DataTable from "@/components/Admin/DataTable";
import { index } from "@/store/HotelSlice";
import { useRouter } from "next/router";

const Page = () => {
  const { count, all, loading } = useSelector(({ hotels }) => hotels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getPagination = (page, limit) => {
    page++;
    dispatch(index({ page }));
  };
  const router = useRouter();

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
        <title>{`${process.env.APP_NAME} | Hotels`}</title>
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
                {t("all_hotels")}
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  onClick={() => router.push("hotels/create")}
                  color="primary"
                  variant="contained"
                >
                  {t("add_hotel")}
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
                      placeholder={t("search_hotels")}
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
              model={"hotels"}
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
