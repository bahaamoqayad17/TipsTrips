import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SiteLayout from "@/components/site/SiteLayout";
import Button from "@mui/material/Button";

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <section style={{ paddingTop: "50px" }}>
        <Container>
          <h1>{t("my_subscription")}</h1>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      boxShadow: "none",
                      padding: "16px",
                    }}
                  >
                    <h1 style={{ marginTop: 0 }}>{t("current_plan")}</h1>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #F00",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box>
                          <Typography
                            component={"span"}
                            fontSize={18}
                            fontWeight={700}
                          >
                            {t("yearly")}
                          </Typography>
                          <Typography
                            component={"span"}
                            fontSize={16}
                            fontWeight={700}
                            color={"#F00"}
                            sx={{
                              backgroundColor: "#E0F0E1",
                              padding: "2px 16px",
                              borderRadius: "50px",
                              ml: 2,
                            }}
                          >
                            {t("expired")}
                          </Typography>
                        </Box>
                        <Typography
                          color={"#FF1010"}
                          fontSize={20}
                          fontWeight={700}
                        >
                          $ 50.03
                        </Typography>
                      </Box>

                      <Typography color={"#2c2c2c"} fontSize={20} my={1}>
                        {t("once_per_year")}
                      </Typography>

                      <Button
                        sx={{ borderRadius: "50px", fontWeight: 500 }}
                        variant="contained"
                      >
                        {t("renew")}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      boxShadow: "none",
                      padding: "16px",
                    }}
                  >
                    <h1 style={{ marginTop: 0 }}>{t("current_plan")}</h1>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #44A44C",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box>
                          <Typography
                            component={"span"}
                            fontSize={18}
                            fontWeight={700}
                          >
                            {t("yearly")}
                          </Typography>
                          <Typography
                            component={"span"}
                            fontSize={16}
                            fontWeight={700}
                            color={"#F00"}
                            sx={{
                              backgroundColor: "#E0F0E1",
                              padding: "2px 16px",
                              borderRadius: "50px",
                              ml: 2,
                              color: "#44A44C",
                            }}
                          >
                            {t("active")}
                          </Typography>
                        </Box>
                        <Typography
                          color={"#44A44C"}
                          fontSize={20}
                          fontWeight={700}
                        >
                          $ 50.03
                        </Typography>
                      </Box>

                      <Typography color={"#2c2c2c"} fontSize={20} my={1}>
                        {t("once_per_year")}
                      </Typography>

                      <Typography color={"#44A44C"} fontSize={18}>
                        Your subsciription will expire In join -19 - 2023
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
