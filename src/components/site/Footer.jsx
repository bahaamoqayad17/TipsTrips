import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
  {
    id: 1,
    name: "Egypt",
  },
];

// ... (previous imports and code)

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer style={{ backgroundColor: "#F5F5F5", paddingBottom: "20px" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              sx={{ order: { xs: 4, sm: 4, md: 1 } }}
            >
              <img src="/logo.png" alt="logo" width={"200px"} />
              <Typography variant="body1" color="black">
                {t("copy_right")}
              </Typography>
              <Typography variant="body1" color="black">
                {t("policy")}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ order: { xs: 3, sm: 2, md: 2 } }} // Reverse order for mobile
            >
              <Typography variant="h4" fontSize={20} mb={1.5}>
                {t("destinations")}
              </Typography>

              <Box>
                {destinations.map((item, i) => (
                  <React.Fragment key={i}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        textTransform: "uppercase",
                        fontSize: 17,
                      }}
                      href="/destinations"
                    >
                      {item.name} &nbsp; &nbsp;
                    </Link>
                    {(i + 1) % 3 === 0 && i !== destinations.length - 1 && (
                      <br />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              sx={{ order: { xs: 2, sm: 3, md: 3 } }} // Reverse order for mobile
            >
              <Typography variant="h4" fontSize={20} mb={1.5}>
                {t("social")}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <FacebookIcon />
                <Typography mb={1} fontWeight={"normal"} fontSize={17}>
                  {t("facebook")}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              sx={{ order: { xs: 1, sm: 1, md: 4 } }} // Reverse order for mobile
            >
              <Typography variant="h4" fontSize={20} mb={1.5}>
                {t("about")}
              </Typography>
              <ul>
                <Typography mb={1} fontSize={"17px"} color={"black"}>
                  {t("about_us")}
                </Typography>
                <Typography mb={1} fontSize={"17px"} color={"black"}>
                  {t("contact")}
                </Typography>
                <Typography mb={1} fontSize={"17px"} color={"black"}>
                  {t("terms_of_use")}
                </Typography>
                <Typography mb={1} fontSize={"17px"} color={"black"}>
                  {t("privacy_policy")}
                </Typography>
              </ul>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  );
}
