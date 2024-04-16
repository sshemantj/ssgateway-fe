import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProps {
  summaryJsx: JSX.Element;
  detailsJsx: JSX.Element;
  summarySx?: React.CSSProperties;
  style?: React.CSSProperties;
}

const AccordionCustom = (props: IProps) => {
  const { summaryJsx, detailsJsx, summarySx = {}, style = {} } = props;

  return (
    <div style={{ width: "100%", ...style }}>
      <Accordion>
        <AccordionSummary
          sx={{
            "& .MuiAccordionSummary-content": { margin: "0", ...summarySx },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          {summaryJsx}
        </AccordionSummary>
        <AccordionDetails>{detailsJsx}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionCustom;
