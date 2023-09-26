import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { getSettings, updateSetting } from "@/store/SettingSlice";
import { useSelector } from "react-redux";
import { handleImageChange } from "@/lib/Base64EnCode";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "30px",
};

const Page = () => {
  const { t } = useTranslation();
  const { loading } = useSelector(({ settings }) => settings);
  const [item, setItem] = useState({});
  const [mobileImage, setMobileImage] = useState(null);
  const [webImage, setWebImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings()).then((res) => {
      setMobileImage(res.payload.data.data.image_mobile_url);
      setWebImage(res.payload.data.data.image_web_url);
      setItem({
        ...res.payload.data.data,
        image_web: null,
        image_mobile: null,
      });
    });
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image_web") {
      setWebImage(URL.createObjectURL(files[0]));
      setItem({
        ...item,
        [name]: await handleImageChange(files[0]),
      });
    } else if (name === "image_mobile") {
      setMobileImage(URL.createObjectURL(files[0]));
      setItem({
        ...item,
        [name]: await handleImageChange(files[0]),
      });
    } else
      setItem({
        ...item,
        [name]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSetting(item));
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
            <h1 style={style}>{t("site_settings")}</h1>

            <Typography variant="h6">{t("first_title_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title1_ar}
              name="title1_ar"
              required
              fullWidth
            />

            <Typography variant="h6">{t("first_title_en")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title1_en}
              name="title1_en"
              required
              fullWidth
            />

            <Typography variant="h6">{t("second_title_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title2_ar}
              name="title2_ar"
              required
              fullWidth
            />

            <Typography variant="h6">{t("second_title_en")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title2_en}
              name="title2_en"
              required
              fullWidth
            />

            <Typography variant="h6">{t("third_title_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title3_ar}
              name="title3_ar"
              required
              fullWidth
            />

            <Typography variant="h6">{t("third_title_en")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.title3_en}
              name="title3_en"
              required
              fullWidth
            />

            <Typography variant="h6">{t("analytics_code")}</Typography>

            <TextField
              sx={style}
              multiline
              rows={4}
              onChange={handleChange}
              value={item?.analytics_code}
              name="analytics_code"
              required
              fullWidth
            />

            <Typography variant="h6">{t("search_console_code")}</Typography>

            <TextField
              sx={style}
              multiline
              rows={4}
              onChange={handleChange}
              value={item?.search_console_code}
              name="search_console_code"
              required
              fullWidth
            />

            <Typography variant="h6">{t("js_code")}</Typography>

            <TextField
              sx={style}
              multiline
              rows={4}
              onChange={handleChange}
              value={item?.js_code}
              name="js_code"
              required
              fullWidth
            />

            <Typography variant="h6">{t("image_web")}</Typography>

            <input
              type="file"
              name="image_web"
              style={style}
              required
              onChange={handleChange}
              accept="image/*"
            />
            <br />

            {webImage && (
              <Box sx={style}>
                <img
                  src={webImage}
                  alt="Selected Image"
                  style={{ width: "100px", height: "auto" }}
                />
              </Box>
            )}

            <Typography variant="h6">{t("image_mobile")}</Typography>

            <input
              type="file"
              name="image_mobile"
              style={style}
              required
              onChange={handleChange}
              accept="image/*"
            />
            <br />

            {mobileImage && (
              <Box sx={style}>
                <img
                  src={mobileImage}
                  alt="Selected Image"
                  style={{ width: "100px", height: "auto" }}
                />
              </Box>
            )}
            <br />

            <Button onClick={handleSubmit} variant="contained">
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
