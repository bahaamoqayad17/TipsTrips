import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { create, show } from "@/store/HotelSlice";
import { update } from "@/store/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
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
  const { one } = useSelector(({ hotels }) => hotels);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(id === "create" ? {} : one);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id === "create") {
    } else {
      dispatch(show(id))
        .then((response) => {
          setItem(response.payload.Hotels);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formFields = [
      "name",
      "name_ar",
      "location",
      "location_ar",
      "stars",
      "suitable_for",
      "owner",
      "source_link",
      "url",
    ];

    formFields.forEach((field) => {
      formData.append(field, item?.[field]);
    });

    formData.append("image", image);

    if (item?.id) {
      formData.append("id", item?.id);
      dispatch(update({ formData, id: item?.id }));
    } else {
      dispatch(create(formData));
    }
  };

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>
          {id === "create" ? t("hotel_create") : t("hotel_update")}
        </h1>
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
              src={URL.createObjectURL(image)}
              alt="Selected Image"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>
        )}

        {item?.image && (
          <Box sx={style}>
            <img
              src={item?.image}
              alt=""
              style={{ width: "100px", height: "100px" }}
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
