import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountry } from "@/store/CountrySlice";
import { useRouter } from "next/router";
const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const { countries } = useSelector(({ countries }) => countries);
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(countries.find((item) => item.id == id));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(addCountry(item));
  };

  return (
    <>
      <Box
        sx={{
          p: { md: 8, xs: 4 },
          backgroundColor: "#fff",
          borderRadius: "15px",
          my: 5,
        }}
      >
        <h1 style={style}>{t("country_update")}</h1>

        <Typography variant="h6">{t("name_ar")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_ar}
          name="name_ar"
          required
          fullWidth
        />

        <Typography variant="h6">{t("name_en")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_en}
          name="name_en"
          required
          fullWidth
        />

        <Typography variant="h6">{t("code")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.code}
          name="code"
          required
          fullWidth
        />

        <Button variant="contained" onClick={handleSubmit}>
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
