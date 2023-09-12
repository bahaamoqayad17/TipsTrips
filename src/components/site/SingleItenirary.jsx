import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTranslation } from "react-i18next";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Heart } from "@/icons/Heart";
import { HeartFilled } from "@/icons/HeartFilled";

export default function SingleItenirary() {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const handleCheckBox = () => {
    setChecked(!checked);
  };
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "16px",
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,10%)",
      }}
    >
      <CardMedia sx={{ height: 295 }} component="img" image="/test1.svg" />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          color={"black"}
          mb={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            <LocationOnOutlinedIcon fontSize="small" /> Egypt, Cairo
          </Box>
        </Typography>
        <Typography mb={2} variant="h5" fontWeight={"bold"}>
          Itinerart 6 days in Amsterdam and the Dutch countryside
        </Typography>
        <Typography variant="body2" fontWeight={"bold"}>
          Estimate Itinerary Cost:
        </Typography>
        <Typography variant="caption" fontSize={"14px"} color={"primary"}>
          Free
        </Typography>

        <Box
          sx={{
            position: "absolute",
            top: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#ADEDB1",
              borderRadius: "40px",
              outline: "2px solid #fff",
              p: 1,
              px: 2,
            }}
          >
            <Typography variant="body1" color={"black"} fontWeight={"bold"}>
              6 {t("days")}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "40px",
              outline: "2px solid #ADEDB1",
              p: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              ml: 2,
            }}
          >
            <img src="./3square.svg" alt="" />
            <Typography
              variant="body1"
              ml={"5px"}
              mt={"2px"}
              color={"black"}
              fontWeight={"bold"}
            >
              75
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 7,
            right: 10,
          }}
        >
          <Checkbox
            checked={checked}
            onChange={handleCheckBox}
            icon={
              <Heart
                fontSize="large"
                // sx={{ width: "50px", height: "50px" }}
              />
            }
            checkedIcon={
              <HeartFilled
                fontSize="large"
                // sx={{ width: "50px", height: "50px" }}
              />
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
}
