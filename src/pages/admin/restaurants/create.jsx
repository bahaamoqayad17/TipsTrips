import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { create } from "@/store/RestaurantSlice";
import Dropzone from "@/lib/Dropzone";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [item, setItem] = useState({});
  const [owners, setOwners] = useState([]);
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState({});

  const { countries } = useSelector(({ countries }) => countries);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "featured_image") {
      setImage(URL.createObjectURL(files[0]));
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleSubmit = () => {
    dispatch(create(item));
  };

  useEffect(() => {
    setItem({ ...item, images: owners });
  }, [owners]);

  useEffect(() => {
    if (countries.length === 0) dispatch(fetchCountriesAndCites());
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
        <h1 style={style}>{t("restaurant_create")}</h1>

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

        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          fullWidth
          sx={style}
          onChange={(e, val) => {
            setCountry(val);
            handleChange({ target: { name: "country_id", value: val?.id } });
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />

        <Typography variant="h6">{t("city")}</Typography>

        <Autocomplete
          options={
            countries.find((item) => country?.id === item.id)?.cities || []
          }
          getOptionLabel={(option) => option.name}
          fullWidth
          sx={style}
          onChange={(e, val) =>
            handleChange({ target: { name: "city_id", value: val?.id } })
          }
          renderInput={(params) => <TextField {...params} variant="outlined" />}
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
          sx={style}
          onChange={handleChange}
          value={item?.description_ar}
          name="description_ar"
          multiline
          rows={5}
          fullWidth
        />

        <Typography variant="h6">{t("description_en")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.description_en}
          name="description_en"
          multiline
          rows={5}
          fullWidth
        />

        <Typography variant="h6">{t("halal")}</Typography>

        <FormControl fullWidth sx={{ my: 1 }}>
          <Select native name="is_halal" sx={style} onChange={handleChange}>
            <option value="1">{t("halal")}</option>
            <option value="0">{t("not_halal")}</option>
          </Select>
        </FormControl>

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

        <Button onClick={handleSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
