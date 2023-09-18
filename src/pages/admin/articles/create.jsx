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
import CKEditor from "@/lib/CKEditor";
import Button from "@mui/material/Button";
import { create } from "@/store/ArticleSlice";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const { countries } = useSelector(({ countries }) => countries);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [headImageUrl, setHeadImageUrl] = useState(null);

  const [editorLoaded, setEditorLoaded] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "head_image" || name === "image") {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setItem({ ...item, [name]: await handleImageChange(file) });
      if (name === "image") {
        setFeaturedImageUrl(imageUrl);
      } else {
        setHeadImageUrl(imageUrl);
      }
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
    if (countries.length === 0) dispatch(fetchCountriesAndCites());
  }, []);

  const handleSubmit = () => {
    dispatch(create(item));
  };

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
        <h1 style={style}>{t("article_create")}</h1>
        <Typography variant="h6">{t("name_ar")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name_ar}
          name="name_ar"
          required
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
        <Typography variant="h6">{t("seo_description_en")}</Typography>
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="seo_description_en"
          multiline
          minRows={5}
          fullWidth
          value={item?.seo_description_en}
        />
        <Typography variant="h6">{t("seo_description_ar")}</Typography>
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="seo_description_ar"
          multiline
          minRows={5}
          fullWidth
          value={item?.seo_description_ar}
        />
        <Typography variant="h6">{t("seo_title_en")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.seo_title_en}
          name="seo_title_en"
          fullWidth
        />
        <Typography variant="h6">{t("seo_title_ar")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.seo_title_ar}
          name="seo_title_ar"
          fullWidth
        />
        <Typography variant="h6">{t("countries")}</Typography>
        <Autocomplete
          id="tags-outlined"
          options={countries}
          required
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => {
            setItem({ ...item, country_id: value?.id });
          }}
          style={style}
          filterSelectedOptions
          name="country"
          renderInput={(params) => (
            <TextField {...params} required name="country" />
          )}
        />

        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("content")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, content: v })}
          />
        </Box>
        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("content_ar")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, content_ar: v })}
          />
        </Box>
        <Box>
          <Typography variant="h6">{t("image")}</Typography>

          <input
            type="file"
            name="image"
            style={style}
            onChange={handleChange}
            accept="image/*"
          />

          {featuredImageUrl && (
            <Box sx={style}>
              <img
                src={featuredImageUrl}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}

          <Typography variant="h6">{t("owner_image")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.image_owner}
            name="image_owner"
            fullWidth
          />

          <Typography variant="h6">{t("source_link_image")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.image_source_link}
            name="image_source_link"
            fullWidth
          />
          <Typography variant="h6">{t("head_image")}</Typography>

          <input
            type="file"
            name="head_image"
            style={style}
            onChange={handleChange}
            accept="image/*"
          />

          {headImageUrl && (
            <Box sx={style}>
              <img
                src={headImageUrl}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}

          <Typography variant="h6">{t("owner_head")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.head_image_owner}
            name="head_image_owner"
            fullWidth
          />

          <Typography variant="h6">{t("source_link_head")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.head_image_source_link}
            name="head_image_source_link"
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
        <Button variant="contained" onClick={handleSubmit}>
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
