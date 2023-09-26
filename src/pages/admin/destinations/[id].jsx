import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { show, update } from "@/store/DestinationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";
import { useRouter } from "next/router";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState({});
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState({});
  const { countries } = useSelector(({ countries }) => countries);
  const { destination } = useSelector(({ destinations }) => destinations);

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      setImage(URL.createObjectURL(e.target.files[0]));
      setItem({
        ...item,
        [e.target.name]: await handleImageChange(e.target.files[0]),
      });
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    dispatch(update(item));
  };

  useEffect(() => {
    if (!destination.id) {
      dispatch(show(id));
    }

    if (destination.id) {
      if (destination.id == id) {
        setImage(destination.image_url);
        setItem(destination);
      } else {
        dispatch(show(id));
      }
    }
    if (countries.length === 0) {
      dispatch(fetchCountriesAndCites());
    }
  }, [id, destination]);

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
        <h1 style={style}>{t("destination_create")}</h1>
        <Typography variant="h6">{t("name_ar")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_ar}
          name="name_ar"
          fullWidth
        />

        <Typography variant="h6">{t("name_en")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_en}
          name="name_en"
          fullWidth
        />

        <Typography variant="h6">{t("url")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.url}
          name="url"
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
              defaultValue={countries.find((c) => c.id == item?.country_id)}
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

        <Typography variant="h6">{t("city")}</Typography>

        {item?.city_id && (
          <>
            <Autocomplete
              options={
                countries.find((city) => country?.id === city?.id)?.cities || []
              }
              getOptionLabel={(option) => option.name}
              fullWidth
              sx={style}
              defaultValue={countries
                .find((con) => con.id === item?.country_id)
                ?.cities.find((c) => c.id === item?.city_id)}
              onChange={(e, val) =>
                handleChange({
                  target: { name: "city_id", value: val?.id },
                })
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </>
        )}

        <Typography variant="h6">{t("image")}</Typography>

        <input
          type="file"
          name="image"
          style={style}
          required
          onChange={handleChange}
          accept="image/*"
        />

        {image && (
          <Box sx={style}>
            <img
              src={image}
              alt="Selected Image"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>
        )}

        <Typography variant="h6">{t("owner")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.image_owner}
          name="image_owner"
          fullWidth
        />
        <Typography variant="h6">{t("source_link")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.image_source_link}
          name="image_source_link"
          fullWidth
        />

        <Typography variant="h6">{t("is_popular")}</Typography>

        <FormControl fullWidth>
          <Select
            native
            name="is_popular"
            value={item?.is_popular}
            sx={style}
            onChange={handleChange}
          >
            <option value="0">{t("not_popular")}</option>
            <option value="1">{t("popular")}</option>
          </Select>
        </FormControl>
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
