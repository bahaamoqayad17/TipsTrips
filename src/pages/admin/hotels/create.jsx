import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { create } from "@/store/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { handleImageChange } from "@/lib/Base64EnCode";
import CKEditor from "@/lib/CKEditor";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const stars = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
];

const suitable_for = [
  {
    label: "couples_and_families",
    value: 1,
  },
  {
    label: "couples_only",
    value: 2,
  },
];

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const [image, setImage] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [country, setCountry] = useState({});
  const { countries } = useSelector(({ countries }) => countries);

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
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
    dispatch(create(item));
  };

  useEffect(() => {
    setEditorLoaded(true);
    dispatch(fetchCountriesAndCites());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>{t("hotel_create")}</h1>
        <Typography variant="h6">{t("name_ar")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_en}
          name="name_ar"
          fullWidth
        />

        <Typography variant="h6">{t("name_en")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_ar}
          name="name_en"
          fullWidth
        />

        <Typography variant="h6">{t("stars")}</Typography>

        <FormControl fullWidth>
          <Select
            native
            name="stars"
            value={item?.stars}
            sx={style}
            onChange={handleChange}
          >
            {stars?.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </Select>
        </FormControl>

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

        <Typography variant="h6">{t("suitable_for")}</Typography>

        <FormControl fullWidth>
          <Select
            native
            name="suitable"
            sx={style}
            value={item?.suitable}
            onChange={handleChange}
          >
            {suitable_for?.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6">{t("url")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          required
          value={item?.url}
          name="url"
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

        <Typography variant="h6">{t("published_draft")}</Typography>

        <FormControl fullWidth>
          <Select native name="is_draft" sx={style} onChange={handleChange}>
            <option value="0">{t("published")}</option>
            <option value="1">{t("draft")}</option>
          </Select>
        </FormControl>

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
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
