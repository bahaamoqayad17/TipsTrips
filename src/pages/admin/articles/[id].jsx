import DashboardLayout from "@/components/Admin/DashboardLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import CKEditor from "@/lib/CKEditor";
import { Button } from "@mui/material";
import { update, show } from "@/store/ArticleSlice";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const { article, loading } = useSelector(({ articles }) => articles);
  const { countries } = useSelector(({ countries }) => countries);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(article);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(item?.image_url);
  const [headImageUrl, setHeadImageUrl] = useState(item?.head_image_url);

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
    if (!article.id) {
      dispatch(show(id));
    }

    if (article.id) {
      if (article.id == id) {
        setEditorLoaded(true);
        setFeaturedImageUrl(article.image_url);
        setHeadImageUrl(article.head_image_url);
        setItem(article);
      } else {
        dispatch(show(id));
      }
    }
    if (countries.length === 0) {
      dispatch(fetchCountriesAndCites());
    }
  }, [id, article]);

  const handleSubmit = () => {
    dispatch(update(item));
  };

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
            <h1 style={style}>{t("article_update")}</h1>

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

            <Typography variant="h6">{t("country")}</Typography>

            {item?.country_id && (
              <>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  sx={style}
                  defaultValue={countries.find((c) => c.id == item?.country_id)}
                  onChange={(e, val) => {
                    handleChange({
                      target: { name: "country_id", value: val?.id },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
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
                value={item?.content}
              />
            </Box>
            <Box sx={style}>
              <Typography variant="h6" sx={{ my: 5 }}>
                {t("content_ar")}
              </Typography>

              <CKEditor
                editorLoaded={editorLoaded}
                onChange={(v) => setItem({ ...item, content_ar: v })}
                value={item?.content_ar}
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
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
