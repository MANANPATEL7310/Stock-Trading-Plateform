import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import supportData from "../data/supportData";

export default function SupportAccordion() {
  return (
    <Box className="w-full max-w-lg space-y-3">
      {supportData.map(section => (
        <Accordion
          key={section.slug}
          disableGutters
          sx={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "none",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              background: "#fafafa",
              borderRadius: "8px",
              "& .MuiAccordionSummary-content": {
                display: "flex",
                alignItems: "center",
                gap: "8px",
              },
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              {section.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ paddingLeft: "25px", paddingTop: "6px" }}>
            <List disablePadding sx={{ paddingBottom: 1 }}>
              {section.items.map(item => (
                <ListItem key={item.slug} disableGutters sx={{ paddingY: 0.5 }}>
                  <MuiLink
                    component={Link}
                    to={`/support/section/${section.slug}`}
                    underline="hover"
                    sx={{
                      fontSize: "15px",
                      color: "#1976d2",
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
