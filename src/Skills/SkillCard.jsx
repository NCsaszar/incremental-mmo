import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ExperienceBar from "./ExperienceBar";
import tree from "../skillpics/tree.png";
import rock from "../skillpics/rock.png";
import fish from "../skillpics/fish.png";
import hunt from "../skillpics/hunt.png";

const SkillCard = ({ skill }) => {
  let skillImage;
  if (skill.name == "Woodcutting") {
    skillImage = tree;
  } else if (skill.name == "Mining") {
    skillImage = rock;
  } else if (skill.name == "Fishing") {
    skillImage = fish;
  } else if (skill.name == "Hunting") {
    skillImage = hunt;
  }
  const gradientBackground =
    "radial-gradient(circle, rgba(187,187,187,1) 35%, rgba(11,251,241,1) 100%, rgba(69,89,93,1) 100%)";
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "300px",
        height: "300px",
        padding: "5px",
        margin: "10px",
        borderRadius: "25px",
        background: gradientBackground,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.8)", // Box shadow to create the pop-out effect
        transform: "translateY(-6px)", // Translation to make the card appear lifted
      }}
    >
      <Box sx={{ textAlign: "center", marginTop: "16px" }}>
        <Typography
          component="div"
          variant="h5"
          sx={{
            textAlign: "center",
            color: "green", // Custom text color
            fontWeight: "bold", // Custom font weight
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Custom text shadow
          }}
        >
          {skill.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <img
          src={skillImage}
          alt={skill.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100px",
            height: "100px",
          }}
        />
      </Box>
      <ExperienceBar experience={skill.experience} />
    </Card>
  );
};

export default SkillCard;
