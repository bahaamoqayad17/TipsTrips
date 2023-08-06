import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { show, update } from "@/store/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useRouter } from "next/router";
import { handleImageChange } from "@/lib/Base64EnCode";

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
    label: "Suitable For Couples And Families",
    value: "Suitable for couples and families",
  },
  {
    label: "Suitable For Couples Only",
    value: "Suitable for couples only",
  },
];

const Page = () => {
  const { t } = useTranslation();
  const { all } = useSelector(({ hotels }) => hotels);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(all.find((item) => item.id == id));
  const [image, setImage] = useState(item?.image);

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

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>{t("hotel_update")}</h1>
        <Typography variant="h6">{t("name")}</Typography>
        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.name}
          name="name"
          required
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

        <Typography variant="h6">{t("location")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.location}
          name="location"
          required
          fullWidth
        />

        <Typography variant="h6">{t("location_ar")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          value={item?.location_ar}
          name="location_ar"
          fullWidth
        />

        <Typography variant="h6">{t("stars")}</Typography>

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.stars}
          required
          select
          fullWidth
          name="stars"
          autoComplete="stars"
        >
          {stars?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6">{t("suitable_for")}</Typography>

        <TextField
          onChange={handleChange}
          sx={style}
          id="outlined-select-currency"
          value={item?.suitable_for}
          required
          select
          fullWidth
          name="suitable_for"
          autoComplete="suitable_for"
        >
          {suitable_for?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="h6">{t("url")}</Typography>

        <TextField
          sx={style}
          onChange={handleChange}
          required
          value={item?.url}
          name="url"
          fullWidth
        />

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
        <Button onClick={FormSubmit} variant="contained">
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
