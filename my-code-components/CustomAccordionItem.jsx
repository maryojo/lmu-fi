import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const CustomAccordionItem = ({ summary, children, className, expandIcon }) => {
   const [expanded, setExpanded] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation(); // prevent full summary toggle
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion className={className}>
      <AccordionSummary>
        <div onClick={handleToggle} style={{ flexGrow: 1 }}>{summary}</div>
        <div style={{ cursor: "pointer" }}>
          {expandIcon}
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordionItem;
