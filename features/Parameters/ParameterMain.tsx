"use client";
import AddIcon from "@mui/icons-material/Add";
import NewParameter from "./NewParameter";
import OtherParameter from "./OtherParameter";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { Parameter } from "@/lib/types/all";
import { useState } from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

interface ParameterMainProps {
  allParameters: Parameter[];
}

const ParameterMain = ({ allParameters }: ParameterMainProps) => {
  const [parameterType, setParameterType] = useState<string>("Pasta Türü");

  return (
    <PageWrapper>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        spacing={4}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6">Parametreler</Typography>
        <ToggleButtonGroup
          value={parameterType}
          exclusive
          onChange={(e, newValue) => setParameterType(newValue)}
          aria-label="Platform"
        >
          {allParameters.map((item) => (
            <ToggleButton
              key={item._id}
              color="secondary"
              value={item.variant}
              sx={{ minWidth: "12ch", p: 0.8 }}
              size="small"
            >
              {item.variant}
            </ToggleButton>
          ))}

          <ToggleButton
            color="secondary"
            value="newParam"
            sx={{ minWidth: "12ch", p: 0.8 }}
            size="small"
          >
            <AddIcon fontSize="small" />
            Yeni / Sil
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {parameterType === "newParam" ? (
        <NewParameter allParameters={allParameters} />
      ) : (
        <OtherParameter
          allParameters={allParameters}
          parameterType={parameterType}
        />
      )}
    </PageWrapper>
  );
};

export default ParameterMain;
