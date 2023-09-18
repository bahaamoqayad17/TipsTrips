import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { show, update } from "@/store/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { handleImageChange } from "@/lib/Base64EnCode";
import { fetchCountriesAndCites } from "@/store/CountrySlice";
import { useRouter } from "next/router";

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
  const { hotel, loading } = useSelector(({ hotels }) => hotels);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(hotel || {});
  const [image, setImage] = useState(item?.image_url);
  const { t } = useTranslation();
  const [country, setCountry] = useState({});
  const { countries } = useSelector(({ countries }) => countries);

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      setImage(URL.createObjectURL(e.target.files[0]));
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
    dispatch(update(item));
  };

  useEffect(() => {
    if (!hotel.id) {
      dispatch(show(id));
    }

    if (hotel.id) {
      if (hotel.id == id) {
        setImage(hotel.image_url);
        setItem(hotel);
      } else {
        dispatch(show(id));
      }
    }
    if (countries.length === 0) {
      dispatch(fetchCountriesAndCites());
    }
  }, [id, hotel]);

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
            <h1 style={style}>{t("hotel_update")}</h1>
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

            <Typography variant="h6">{t("description_ar")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.description_ar}
              name="description_ar"
              multiline
              rows={4}
              fullWidth
            />

            <Typography variant="h6">{t("description_en")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              value={item?.description_en}
              name="description_en"
              multiline
              rows={4}
              fullWidth
            />

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

            <Typography variant="h6">{t("affiliate_url")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              required
              value={item?.url}
              name="url"
              fullWidth
            />

            <Typography variant="h6">{t("thumbnail_url")}</Typography>

            <TextField
              sx={style}
              onChange={handleChange}
              required
              value={item?.thumbnail_url}
              name="thumbnail_url"
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
                    setCountry(val);
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

            <Typography variant="h6">{t("city")}</Typography>

            {item?.city_id && (
              <>
                <Autocomplete
                  options={
                    countries.find((city) => country?.id === city?.id)
                      ?.cities || []
                  }
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  sx={style}
                  defaultValue={countries
                    .find((con) => con.id === item?.country_id)
                    ?.cities.find((c) => c.id === item?.city_id)}
                  onChange={(e, val) =>
                    handleChange({
                      target: { name: "city_id", value: val?.id },
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </>
            )}

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

            <Typography variant="h6">{t("published_draft")}</Typography>

            <FormControl fullWidth>
              <Select
                native
                value={item?.is_draft}
                name="is_draft"
                sx={style}
                onChange={handleChange}
              >
                <option value="0">{t("published")}</option>
                <option value="1">{t("draft")}</option>
              </Select>
            </FormControl>
            <Button onClick={FormSubmit} variant="contained">
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
