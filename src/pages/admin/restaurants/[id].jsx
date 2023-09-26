import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { show, update } from "@/store/RestaurantSlice";
import { useRouter } from "next/router";
import Dropzone from "@/lib/Dropzone";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { restaurant, loading } = useSelector(({ restaurants }) => restaurants);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { t } = useTranslation();
  const [item, setItem] = useState(restaurant);
  const [owners, setOwners] = useState([]);
  const [image, setImage] = useState(item?.image_url);
  const [country, setCountry] = useState({});
  const { countries } = useSelector(({ countries }) => countries);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(URL.createObjectURL(files[0]));
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleSubmit = () => {
    setItem({ ...item, images: owners });
    dispatch(update(item));
  };

  useEffect(() => {
    setItem({ ...item, images: owners });
  }, [owners]);

  useEffect(() => {
    if (!restaurant.id) {
      dispatch(show(id));
    }

    if (restaurant.id) {
      if (restaurant.id == id) {
        setImage(restaurant.image_url);
        setOwners(restaurant.images);
        setItem(restaurant);
      } else {
        dispatch(show(id));
      }
    }
    if (countries.length === 0) {
      dispatch(fetchCountriesAndCites());
    }
  }, [id, restaurant]);

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
            <h1 style={style}>{t("restaurant_update")}</h1>

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
                    countries.find((city) => country?.id === city?.id)
                      ?.cities || []
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

            <Typography variant="h6">{t("geo_location_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.geo_location_ar}
              name="geo_location_ar"
              fullWidth
            />

            <Typography variant="h6">{t("geo_location_en")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.geo_location_en}
              name="geo_location_en"
              fullWidth
            />

            <Typography variant="h6">{t("longitude")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.longitude}
              name="longitude"
              type="number"
              fullWidth
            />

            <Typography variant="h6">{t("latitude")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.latitude}
              name="latitude"
              type="number"
              fullWidth
            />

            <Typography variant="h6">{t("description_ar")}</Typography>

            <TextField
              onChange={handleChange}
              sx={style}
              id="outlined-multiline-flexible"
              name="description_ar"
              multiline
              minRows={5}
              fullWidth
              value={item?.description_ar}
            />

            <Typography variant="h6">{t("description_en")}</Typography>

            <TextField
              onChange={handleChange}
              sx={style}
              id="outlined-multiline-flexible"
              name="description_en"
              multiline
              minRows={5}
              fullWidth
              value={item?.description_en}
            />
            <Box>
              <Typography variant="h6">{t("gallery")}</Typography>

              <Dropzone setOwners={setOwners} owners={owners} />
            </Box>

            <Typography variant="h6">{t("image")}</Typography>

            <input
              type="file"
              name="image"
              style={style}
              onChange={handleChange}
              accept="image/*"
            />
            <br />

            {image && (
              <Box sx={style}>
                <img
                  src={image}
                  alt="Selected Image"
                  style={{ width: "100px", height: "auto" }}
                />
              </Box>
            )}

            <Typography variant="h6">{t("halal")}</Typography>

            <FormControl fullWidth sx={{ my: 1 }}>
              <Select native name="is_halal" sx={style} onChange={handleChange}>
                <option value="1">{t("halal")}</option>
                <option value="0">{t("not_halal")}</option>
              </Select>
            </FormControl>

            <Typography variant="h6">{t("published_draft")}</Typography>

            <FormControl fullWidth>
              <Select
                native
                name="is_draft"
                value={item?.is_draft}
                sx={style}
                onChange={handleChange}
              >
                <option value="1">{t("draft")}</option>
                <option value="0">{t("published")}</option>
              </Select>
            </FormControl>

            <Button onClick={handleSubmit} variant="contained">
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
