import SiteLayout from "@/components/site/SiteLayout";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SingleArticle from "@/components/site/SingleArticle";

const Route = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 18,
  fontWeight: 400,
  marginBottom: 10,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Date = styled("p")(({ theme }) => ({
  color: "#757575",
  fontSize: 14,
  fontWeight: 600,
}));

const SubTitle = styled("h3")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 28,
  fontWeight: 700,
}));

const Title = styled("h1")(({ theme }) => ({
  color: "#2C2C2C",
  fontSize: 40,
  fontWeight: 700,
  marginBottom: 30,
  lineHeight: 1.3,
}));
const Content = styled("p")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  marginTop: 20,
  color: "#000",
  marginBottom: 20,
}));

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Container>
          <Route>
            {t("home")} / {t("articles")}
          </Route>
          <Grid container>
            <Grid xs={12} md={8}>
              <Title>
                5 Reasons Why Every Designer Should Be Familiar With Wireframing
              </Title>

              <Date>Joan Doe-Smith • Mar 15, 2022</Date>
              <img width={"100%"} src="/article.svg" alt="" />

              <Content>
                Wireframing is an essential step in the web and app design
                process. It allows designers and developers to map out the
                structure and functionality of a digital product before diving
                into the visual design. Here are 5 reasons why every designer
                should be familiar with wireframing:
              </Content>

              <SubTitle>1. Plan the User Experience</SubTitle>

              <Content>
                A wireframe is a low-fidelity sketch of a user interface,
                showing the layout of elements such as buttons, text fields, and
                navigation menus. By creating a wireframe, designers can plan
                the user flow and ensure that the final product is intuitive and
                easy to use. This helps to create a positive user experience,
                which is essential for the success of any digital product.
              </Content>

              <SubTitle>2. Communicate Ideas Clearly</SubTitle>

              <Content>
                Wireframes are a great tool for communicating design ideas to
                clients, stakeholders, and team members. They provide a clear
                visual representation of the user interface, allowing others to
                understand the design concept and provide feedback. This can
                help to ensure that everyone is on the same page and that the
                final product meets the needs of the target audience.
              </Content>

              <SubTitle>3. Save Time and Resources</SubTitle>

              <Content>
                Wireframing can save a lot of time and resources by identifying
                potential design issues early in the process. By testing the
                wireframe with users, designers can identify problems and make
                changes before moving on to the visual design phase. By catching
                design problems early on, designers can avoid spending time and
                resources on designs that won't work, and focus on creating a
                product that meets the needs of the users.
              </Content>

              <img width={"100%"} src="/article.svg" alt="" />

              <SubTitle>4. Collaborate with Other Team Members</SubTitle>

              <Content>
                Wireframing allows designers to collaborate with other team
                members, such as developers and content strategists. It provides
                a common language and framework for discussing the design, and
                helps ensure that everyone is on the same page. It improves
                communication and coordination within the design team, resulting
                in a better final product. By using wireframes to guide
                discussions, designers can make sure that everyone is working
                towards the same goal, and that the final design is coherent and
                consistent.
              </Content>

              <SubTitle>5. Test Different Design Concepts</SubTitle>

              <Content>
                Because wireframes are quick and easy to create, designers can
                experiment with multiple design concepts and compare the
                results. This can help identify the best solution for the
                product, and ensure that the final design is user-friendly and
                effective.
              </Content>

              <Box
                display={"flex"}
                alignItems={"center"}
                fontSize={"20px"}
                justifyContent={"space-between"}
                maxWidth={180}
                mt={5}
                fontWeight={600}
              >
                {t("share")}
                <img src="/mail.svg" alt="" />
                <img src="/share.svg" alt="" />
                <img src="/facebook.svg" alt="" />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ pt: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "20px", md: "36px" },
                mb: { xs: 2, md: 2 },
              }}
              fontWeight={700}
            >
              {t("latest_articles")}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <SingleArticle />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SingleArticle />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SingleArticle />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SingleArticle />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
    </>
  );
};

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Page;
