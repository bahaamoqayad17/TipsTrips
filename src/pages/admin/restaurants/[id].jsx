import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { show, update } from "@/store/RestaurantSlice";
import { useRouter } from "next/router";
import Dropzone from "@/lib/Dropzone";
import { handleImageChange } from "@/lib/Base64EnCode";

const style = {
  marginBottom: "30px",
};

const halals = [
  {
    label: "yes",
    value: "Yes",
  },
  {
    label: "no",
    value: "No",
  },
];

const Page = () => {
  const { restaurant, loading } = useSelector(({ restaurants }) => restaurants);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { t } = useTranslation();
  const [item, setItem] = useState(restaurant);
  const [owners, setOwners] = useState(item?.datee);
  const [image, setImage] = useState(item?.image_url);

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

            <Typography variant="h6">{t("reataurant_name")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title}
              name="title"
              fullWidth
            />

            <Typography variant="h6">{t("reataurant_name_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title_ar}
              name="title_ar"
              fullWidth
            />

            {/* <Typography variant="h6">{t("country")}</Typography>

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
        )} */}

            {/* <Typography variant="h6">{t("city")}</Typography>

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
        )} */}

            <Typography variant="h6">{t("geo_location")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.geo_location}
              name="geo_location"
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

            <Typography variant="h6">{t("description")}</Typography>

            <TextField
              onChange={handleChange}
              sx={style}
              id="outlined-multiline-flexible"
              name="description"
              multiline
              minRows={5}
              fullWidth
              value={item?.description}
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

            <Typography variant="h6">{t("halal")}</Typography>

            <TextField
              onChange={handleChange}
              sx={style}
              id="outlined-select-currency"
              value={item?.halal}
              select
              fullWidth
              name="halal"
              autoComplete="halal"
            >
              {halals?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </TextField>
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
