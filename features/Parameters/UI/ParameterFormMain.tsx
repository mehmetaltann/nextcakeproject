import ParameterForm from "./ParameterForm";
import ParameterTable from "./ParameterTable";
import Grid from "@mui/material/Grid2";
import { Paper, Typography } from "@mui/material";
import { ParameterContent } from "@/lib/types/all";

interface ParameterFormMainProps {
  title1: string;
  title2: string;
  parameterId: string;
  tableWidth: number;
  data: ParameterContent[];
}

const ParameterFormMain = ({
  title1,
  title2,
  parameterId,
  tableWidth,
  data,
}: ParameterFormMainProps) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{ p: 1, mb: 1 }}
        >
          {title1}
        </Typography>
        <Paper sx={{ p: 2, elevation: 3 }}>
          <ParameterForm parameterId={parameterId} />
        </Paper>
      </Grid>
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          {title2}
        </Typography>
        <Paper sx={{ p: 2, elevation: 3 }}>
          <ParameterTable
            tableWidth={tableWidth}
            data={data}
            parameterId={parameterId}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ParameterFormMain;
