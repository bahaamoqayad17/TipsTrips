import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Router from "next/router";

export default function SingleArticle() {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: "none" }}>
      <CardMedia
        onClick={() => Router.push("/articles/5")}
        component="img"
        height="250"
        image="/test1.svg"
        sx={{ cursor: "pointer" }}
      />
      <CardContent sx={{ pl: 0 }}>
        <Typography
          sx={{ cursor: "pointer", paddingTop: "8px" }}
          onClick={() => Router.push("/articles/5")}
          gutterBottom
          fontWeight={"bold"}
          fontSize={{ xs: "1.3rem", md: "20px" }}
        >
          How to Overcome Creative Blocks & Find Inspiration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          TipsTrips • Mar 15, 2022
        </Typography>
      </CardContent>
    </Card>
  );
}
