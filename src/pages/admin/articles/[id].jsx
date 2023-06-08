import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { useDispatch, useSelector } from "react-redux";
import CKEditor from "@/lib/CKEditor";
import { Button } from "@mui/material";
import { create, update, show } from "@/store/ArticleSlice";
import { handleImageChange } from "@/lib/Base64EnCode";

const style = {
  marginBottom: "30px",
};
const img = { width: "100px", height: "100%", display: "block" };

const Page = () => {
  const { t } = useTranslation();
  const { one } = useSelector(({ articles }) => articles);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(id === "create" ? {} : one);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [headImageUrl, setHeadImageUrl] = useState(null);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "head_image" || name === "featured_image") {
      const file = files[0];
      setItem({ ...item, [name]: await handleImageChange(file) });
      const imageUrl = URL.createObjectURL(file);
      if (name === "featured_image") {
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
    if (id === "create") {
    } else {
      dispatch(show(id))
        .then((response) => {
          setItem(response.payload.Article);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, dispatch]);

  const handleAutocompleteChange = (event, value) => {
    const selectedCountries = value.map((option) => option.label).join(",");
    setItem({ ...item, country: selectedCountries });
  };

  const handleSubmit = () => {
    if (item?.id) {
      dispatch(update(item));
    } else {
      dispatch(create(item));
    }
  };

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>
          {id === "create" ? t("article_create") : t("article_update")}
        </h1>
        <Typography variant="h6">{t("article_name")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.title}
          name="title"
          required
          fullWidth
        />
        <Typography variant="h6">{t("article_name_ar")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.title_ar}
          name="title_ar"
          fullWidth
        />
        <Typography variant="h6">{t("seo_description")}</Typography>
        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-multiline-flexible"
          name="seo_description"
          multiline
          minRows={5}
          fullWidth
          value={item?.seo_description}
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
        <Typography variant="h6">{t("seo_title")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.seo_title}
          name="seo_title"
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
        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("content")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, content: v })}
            // value={one?.content}
          />
        </Box>
        <Box sx={style}>
          <Typography variant="h6" sx={{ my: 5 }}>
            {t("content_ar")}
          </Typography>

          <CKEditor
            editorLoaded={editorLoaded}
            onChange={(v) => setItem({ ...item, content_ar: v })}
            // value={one?.content_ar}
          />
        </Box>
        <Box>
          <Typography variant="h6">{t("featured_image")}</Typography>

          <input
            type="file"
            name="featured_image"
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

          <Typography variant="h6">{t("owner_featured")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.owner_featured}
            name="owner_featured"
            fullWidth
          />

          <Typography variant="h6">{t("source_link_featured")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.source_link_featured}
            name="source_link_featured"
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
          {/* 
          {item?.head_image && (
            <Box sx={style}>
              <img
                src={item?.head_image}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )} */}

          {headImageUrl && (
            <Box sx={style}>
              <img
                src={featuredImageUrl}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}

          <Typography variant="h6">{t("owner_head")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.owner_head}
            name="owner_head"
            fullWidth
          />

          <Typography variant="h6">{t("source_link_head")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.source_link_head}
            name="source_link_head"
            fullWidth
          />
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
