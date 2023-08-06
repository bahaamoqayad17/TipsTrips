import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { create, show, update } from "@/store/RestaurantsSlice";
import { useRouter } from "next/router";
import Dropzone from "@/lib/Dropzone";
import { handleImageChange } from "@/lib/Base64EnCode";
import { CircularProgress } from "@mui/material";

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
  const { all } = useSelector(({ restaurants }) => restaurants);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { t } = useTranslation();
  const [item, setItem] = useState(all.find((item) => item.id == id));
  const [owners, setOwners] = useState(item?.datee);
  const [image, setImage] = useState({
    data: item?.featured_image,
    mime: "image/jpg",
  });
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "featured_image") {
      setImage({ data: URL.createObjectURL(files[0]) });
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleAutocompleteChange = (event, value) => {
    const selectedCountries = value.map((option) => option.label).join(",");
    setItem((prevItem) => ({
      ...prevItem,
      country: selectedCountries,
    }));
  };

  const handleSubmit = () => {
    dispatch(update(item));
  };

  useEffect(() => {
    setItem({ ...item, datee: owners });
  }, [owners]);

  useEffect(() => {}, [id, dispatch]);

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
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

        <Typography variant="h6">{t("countries")}</Typography>

        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={handleAutocompleteChange}
          style={style}
          defaultValue={item?.country
            ?.split(",")
            .map((value) => ({ label: value.trim() }))}
          name="country"
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} name="country" />}
        />

        <Typography variant="h6">{t("city")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.city}
          name="city"
          fullWidth
        />

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

        <Typography variant="h6">{t("featured_image")}</Typography>

        <input
          type="file"
          name="featured_image"
          style={style}
          onChange={handleChange}
          accept="image/*"
        />
        <br />

        {image && (
          <Box sx={style}>
            <img
              src={image?.data}
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
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
