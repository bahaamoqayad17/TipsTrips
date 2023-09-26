import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { create } from "@/store/PropertiesSlice";
import Dropzone from "@/lib/Dropzone";
import { Button } from "@mui/material";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [owners, setOwners] = useState([]);
  const [image, setImage] = useState("");
  const [country, setCountry] = useState({});
  const { countries } = useSelector(({ countries }) => countries);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };
  const handleSubmit = () => {
    setItem({ ...item, images: owners });
    dispatch(create(item));
  };

  useEffect(() => {
    setItem({ ...item, images: owners });
  }, [owners]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountriesAndCites());
    }
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
        <h1 style={style}>{t("property_create")}</h1>

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

        <Typography variant="h6">{t("live_camera_url")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.live_camera_url}
          name="live_camera_url"
          fullWidth
        />

        <Typography variant="h6">{t("countries")}</Typography>
        <Autocomplete
          id="tags-outlined"
          options={countries}
          required
          sx={style}
          getOptionLabel={(option) => option.name}
          onChange={(e, val) => {
            setCountry(val);
            setItem({ ...item, country_id: val.id });
          }}
          filterSelectedOptions
          name="country"
          renderInput={(params) => (
            <TextField {...params} required name="country" />
          )}
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

        <Typography variant="h6">{t("ticket_url")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.ticket_url}
          name="ticket_url"
          fullWidth
        />

        <Typography variant="h6">{t("child_entry_price_from")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.child_entry_price_from}
          name="child_entry_price_from"
          type="number"
          fullWidth
        />

        <Typography variant="h6">{t("child_entry_price_to")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.child_entry_price_to}
          name="child_entry_price_to"
          type="number"
          fullWidth
        />

        <Typography variant="h6">{t("adult_entry_price_from")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.adult_entry_price_from}
          name="adult_entry_price_from"
          type="number"
          fullWidth
        />

        <Typography variant="h6">{t("adult_entry_price_to")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.adult_entry_price_to}
          name="adult_entry_price_to"
          type="number"
          fullWidth
        />

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

        <Typography variant="h6">{t("duration_visit_hours")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.duration_visit_hours}
          name="duration_visit_hours"
          type="number"
          fullWidth
        />

        <Typography variant="h6">{t("duration_visit_minutes")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.duration_visit_minutes}
          name="duration_visit_minutes"
          type="number"
          fullWidth
        />

        <Typography variant="h6">{t("notes_ar")}</Typography>
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="notes_ar"
          multiline
          minRows={5}
          fullWidth
          value={item?.notes_ar}
        />

        <Typography variant="h6">{t("notes_en")}</Typography>
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="notes_en"
          multiline
          minRows={5}
          fullWidth
          value={item?.notes_en}
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

        <Box>
          <Typography variant="h6">{t("image")}</Typography>

          <input
            type="file"
            name="image"
            multiple
            style={style}
            onChange={handleChange}
            accept="image/*"
          />

          {image && (
            <Box sx={style}>
              <img
                src={URL.createObjectURL(image)}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}

          <br />

          <Typography variant="h6">{t("image_source_link")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.image_source_link}
            name="image_source_link"
            fullWidth
          />

          <Typography variant="h6">{t("image_owner")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.image_owner}
            name="image_owner"
            fullWidth
          />
        </Box>

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
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
