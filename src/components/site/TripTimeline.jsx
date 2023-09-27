import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Box from "@mui/material/Box";
import SingleProperty from "./properties/SingleProperty";
import Transport from "./properties/Transport";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const Mark = styled("div")(({ theme }) => ({
  width: 33,
  height: 39,
  backgroundImage: "url(/mark.svg)",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: 24,
    height: 26,
  },
}));

const Number = styled("span")(({ theme }) => ({
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  fontWeight: 600,
  fontSize: 18,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

const Image = styled("img")(({ theme }) => ({
  width: 32,
  height: 32,
  [theme.breakpoints.down("sm")]: {
    width: 24,
    height: 24,
  },
}));

export default function TripTimeline() {
  return (
    <Box>
      <Timeline
        sx={{
          "& .MuiTimelineDot-root": {
            width: 32,
            height: 32,
          },
          "& .css-f07dfy-MuiTypography-root-MuiTimelineContent-root": {
            padding: "13px 16px",
          },
          "& .css-ha3bif-MuiTimelineItem-root::before": {
            display: "none",
          },
          "& .css-1ami7lv-MuiTimelineConnector-root": {
            backgroundColor: "inherit",
            backgroundImage:
              "linear-gradient(#B9B9B9 70%, rgba(255,255,255,0) 0%)",
            backgroundPosition: "right",
            backgroundSize: "2px 20px",
            backgroundRepeat: "repeat-y",
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent color="primary">
            Start Day, Stay safe and enjoy :)
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <Mark>
              <Number>1</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/car.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box maxWidth={300} mb={3}>
              <Typography fontSize={18} fontWeight={400} color="black">
                3.5 km - 25 minutest by car
              </Typography>
              <Box display={"flex"}>
                <img src="/warning.svg" alt="" />
                &nbsp; &nbsp; &nbsp;
                <Typography fontSize={16} fontWeight={400} color={"black"}>
                  The best and easy road driving from Como to Interlaken...
                </Typography>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <Mark>
              <Number>2</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/walking.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box maxWidth={300} mb={3}>
              <Typography fontSize={18} fontWeight={400} color="black">
                3.5 km - 10 minutest by walking
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/parking.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Transport />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/walking.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box maxWidth={300} mb={3}>
              <Typography fontSize={18} fontWeight={400} color="black">
                3.5 km - 10 minutest by walking
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/ship.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Transport />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/ship.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Transport />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/ship.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Transport />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <Mark>
              <Number>3</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/bus.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box maxWidth={300} mb={3}>
              <Typography fontSize={18} fontWeight={400} color="black">
                3.5 km - 10 minutest by walking
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/ship.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Transport />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <Mark>
              <Number>4</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <Image src="/train.svg" alt="" />

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box maxWidth={300} mb={3}>
              <Typography fontSize={18} fontWeight={400} color="black">
                3.5 km - 10 minutest by walking
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />

            <Mark>
              <Number>5</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />

            <Mark>
              <Number>6</Number>
            </Mark>

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SingleProperty />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent color="primary">
            <Typography component={"span"} fontWeight={600}>
              End Day,
            </Typography>
            <Typography component={"span"}>We hope you enjoyed :)</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
