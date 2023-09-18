import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Box from "@mui/material/Box";
import SingleProperty from "./properties/SingleProperty";

export default function TripTimeline() {
  return (
    <Box>
      <SingleProperty />
      {/* <Timeline
        sx={{
          "& .MuiTimelineDot-root": {
            width: "24px !important",
            height: 24,
          },
          "& .css-f07dfy-MuiTypography-root-MuiTimelineContent-root": {
            padding: "13px 16px",
          },
        }}
      >
        <TimelineItem
          sx={{
            "&::before": {
              display: "none",
            },
          }}
        >
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector
              sx={{
                backgroundColor: "inherit",
                border: "1.5px dashed #B9B9B9",
              }}
            />
          </TimelineSeparator>
          <TimelineContent color="primary">
            Start Day, Stay safe and enjoy :)
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          sx={{
            "&::before": {
              display: "none",
            },
          }}
        >
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector
              sx={{
                backgroundColor: "inherit",
                border: "1.5px dashed #B9B9B9",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            <p>Code</p>
            Code
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          sx={{
            "&::before": {
              display: "none",
            },
          }}
        >
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
      </Timeline> */}
    </Box>
  );
}
