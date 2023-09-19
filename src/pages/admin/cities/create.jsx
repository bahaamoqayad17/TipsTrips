import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/store/CountrySlice";
import { addCity } from "@/store/CitySlice";
const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();

  const [item, setItem] = useState({});
  const { countries } = useSelector(({ countries }) => countries);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(addCity(item));
  };

  useEffect(() => {
    dispatch(fetchCountries({ page: -1 }));
  }, []);

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
        <h1 style={style}>{t("city_create")}</h1>

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
        <Typography variant="h6">{t("country")}</Typography>

        <Autocomplete
          sx={{ my: 1 }}
          fullWidth
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={(e, val) =>
            handleChange({ target: { name: "country_id", value: val?.id } })
          }
          renderInput={(params) => <TextField {...params} variant="outlined" />}
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
