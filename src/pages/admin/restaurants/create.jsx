import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { create } from "@/store/RestaurantSlice";
import { useRouter } from "next/router";
import Dropzone from "@/lib/Dropzone";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";
import CKEditor from "@/lib/CKEditor";

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
  const [editorLoaded, setEditorLoaded] = useState(false);

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
    setItem({ ...item, datee: owners });
  }, [owners]);

  useEffect(() => {
    setEditorLoaded(true);
    dispatch(fetchCountriesAndCites());
  }, []);

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
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

        <Typography variant="h6">{t("countries")}</Typography>

        <Autocomplete
          multiple
          id="tags-outlined"
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={(e, val) => {
            setCountry(val);
            handleChange({
              target: {
                name: "country_id",
                value: val?.map((item) => item.id),
              },
            });
          }}
          style={style}
          name="country"
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} name="country" />}
        />

        <Typography variant="h6">{t("cities")}</Typography>

        <Autocomplete
          multiple
          id="tags-outlined"
          options={
            countries.find((item) => country.find((con) => con.id == item.id))
              ?.cities || []
          }
          getOptionLabel={(option) => option.name}
          onChange={(e, val) => {
            setCountry(val);
            handleChange({
              target: {
                name: "city_id",
                value: val?.map((item) => item.id),
              },
            });
          }}
          style={style}
          name="country"
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} name="country" />}
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

        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("description_ar")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, description_ar: v })}
          />
        </Box>
        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("description_en")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, description_en: v })}
          />
        </Box>

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

        <Typography variant="h6">{t("featured_image")}</Typography>

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
