import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { create, show, update } from "@/store/DestinationSlice";
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
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(create(item));
  };

  const handleAutocompleteChange = (event, value) => {
    const selectedCountries = value.map((option) => option.label).join(",");
    setItem({ ...item, country: selectedCountries });
  };

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>{t("destination_create")}</h1>

        <Typography variant="h6">{t("name")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name}
          name="name"
          fullWidth
        />

        <Typography variant="h6">{t("name_ar")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_ar}
          name="name_ar"
          fullWidth
        />

        <Typography variant="h6">{t("countries")}</Typography>

        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          required
          getOptionLabel={(option) => option.label}
          onChange={handleAutocompleteChange}
          style={style}
          filterSelectedOptions
          name="country"
          renderInput={(params) => (
            <TextField {...params} required name="country" />
          )}
        />

        <Typography variant="h6">{t("city")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.city}
          name="city"
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

        <Typography variant="h6">{t("owner")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.owner}
          name="owner"
          fullWidth
        />

        <Typography variant="h6">{t("source_link")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.source_link}
          name="source_link"
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
