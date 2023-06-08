import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { create, show, update } from "@/store/PropertiesSlice";
import Dropzone from "@/lib/Dropzone";
import { Button } from "@mui/material";
import { handleImageChange } from "@/lib/Base64EnCode";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const { one } = useSelector(({ properties }) => properties);
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;
  const options = useMemo(() => countryList().getData(), []);
  const [item, setItem] = useState(id === "create" ? {} : one);
  const [owners, setOwners] = useState([]);
  const [image, setImage] = useState("");

  const handleAutocompleteChange = (event, value) => {
    const selectedCountries = value.map((option) => option.label).join(",");
    setItem({ ...item, country: selectedCountries });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "featured_image") {
      setImage(files[0]);
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  useEffect(() => {
    if (id === "create") {
    } else {
      dispatch(show(id))
        .then((response) => {
          setItem(response.payload.Properties);
          setOwners(one?.datee);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, dispatch]);
  const handleSubmit = () => {
    // const updatedOwners = owners.map(({ image, ...rest }) => rest);

    if (item?.id) {
      dispatch(update({ item, id: item?.id }));
    } else {
      setItem({ ...item, datee: owners });
      dispatch(create(item));
    }
  };

  useEffect(() => {
    const updatedOwners = owners?.map(({ image, ...rest }) => rest);
    setItem({ ...item, datee: updatedOwners });
    if (one?.datee) {
      setOwners(one?.datee);
      setItem({ ...item, datee: owners });
    }
  }, [owners]);

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>
          {id === "create" ? t("property_create") : t("property_update")}
        </h1>

        <Typography variant="h6">{t("property_name")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.title}
          name="title"
          fullWidth
        />

        <Typography variant="h6">{t("property_name_ar")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.title_ar}
          name="title_ar"
          fullWidth
        />

        {!one?.country && (
          <>
            <Typography variant="h6">{t("countries")}</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={options}
              required
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              style={style}
              defaultValue={one?.country
                ?.split(",")
                .map((value) => ({ label: value.trim() }))}
              filterSelectedOptions
              name="country"
              renderInput={(params) => (
                <TextField {...params} required name="country" />
              )}
            />
          </>
        )}
        {one?.country && (
          <>
            <Typography variant="h6">{t("countries")}</Typography>

            <Autocomplete
              multiple
              id="tags-outlined"
              options={options}
              required
              getOptionLabel={(option) => option.label}
              onChange={handleAutocompleteChange}
              style={style}
              defaultValue={one?.country
                ?.split(",")
                .map((value) => ({ label: value.trim() }))}
              filterSelectedOptions
              name="country"
              renderInput={(params) => (
                <TextField {...params} required name="country" />
              )}
            />
          </>
        )}

        <Typography variant="h6">{t("city")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.city}
          name="city"
          fullWidth
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
          asd
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

        <Typography variant="h6">{t("duration")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.duration_of_the_visit}
          name="duration_of_the_visit"
          fullWidth
        />

        <Typography variant="h6">{t("notes")}</Typography>

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="notes_for_things_to_do"
          multiline
          minRows={5}
          fullWidth
          value={item?.notes_for_things_to_do}
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

        <Box>
          <Typography variant="h6">{t("gallery")}</Typography>

          <Dropzone setOwners={setOwners} owners={owners} />
        </Box>

        <Box>
          <Typography variant="h6">{t("featured_image")}</Typography>

          <input
            type="file"
            name="featured_image"
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
          {/* 
          {item?.featured_image && (
            <Box sx={style}>
              <img
                src={item?.featured_image}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )} */}

          <br />

          <Typography variant="h6">{t("source_link")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.source_link}
            name="source_link"
            fullWidth
          />

          <Typography variant="h6">{t("owner")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.owner}
            name="owner"
            fullWidth
          />
        </Box>
        <Button onClick={handleSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
