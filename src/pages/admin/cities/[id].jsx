import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries } from "@/store/CountrySlice";
import { useRouter } from "next/router";
import { getCity, updateCity } from "@/store/CitySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const { city, loading } = useSelector(({ cities }) => cities);
  const { countries } = useSelector(({ countries }) => countries);
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(city || {});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateCity(item));
  };

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, []);

  useEffect(() => {
    if (!city.id) {
      dispatch(getCity(id));
    }

    if (city.id) {
      if (city.id == id) {
        setItem(city);
      } else {
        dispatch(getCity(id));
      }
    }
  }, [id, city]);

  return (
    <>
      {!loading && (
        <>
          <Box
            sx={{
              p: { md: 8, xs: 4 },
              backgroundColor: "#fff",
              borderRadius: "15px",
              my: 5,
            }}
          >
            <h1 style={style}>{t("city_update")}</h1>

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

            {item?.country_id && (
              <>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  sx={style}
                  defaultValue={countries?.find(
                    (c) => c.id == item?.country_id
                  )}
                  onChange={(e, val) => {
                    setCountry(val);
                    handleChange({
                      target: { name: "country_id", value: val?.id },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </>
            )}

            <Button variant="contained" onClick={handleSubmit}>
              {t("save")}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
