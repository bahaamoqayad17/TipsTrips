import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function SingleArticle() {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: "none" }}>
      <CardMedia component="img" height="250" image="./test1.svg" />
      <CardContent>
        <Typography gutterBottom fontSize={20} fontWeight={"bold"}>
          How to Overcome Creative Blocks & Find Inspiration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          TipsTrips • Mar 15, 2022
        </Typography>
      </CardContent>
    </Card>
  );
}
