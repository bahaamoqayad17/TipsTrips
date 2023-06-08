import Head from "next/head";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";

const Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Dashboard`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {t("test")}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
