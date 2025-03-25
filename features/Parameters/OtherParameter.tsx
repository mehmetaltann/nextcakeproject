import ParameterFormMain from "./UI/ParameterFormMain";
import { Box } from "@mui/material";
import { Parameter } from "@/lib/types/all";
import { useMemo } from "react";

interface OtherParameterProps {
  allParameters: Parameter[];
  parameterType: string;
  tableWidth?: number;
}

const OtherParameter: React.FC<OtherParameterProps> = ({
  allParameters,
  parameterType,
  tableWidth = 400,
}) => {
  const filteredData = useMemo(
    () => allParameters.filter((item) => item.variant === parameterType),
    [allParameters, parameterType]
  );

  return (
    <Box>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <ParameterFormMain
            key={item._id}
            title1={`${item.variant} Ekle`}
            title2={`${item.variant} Listesi`}
            parameterId={item._id}
            tableWidth={tableWidth}
            data={item.content}
          />
        ))
      ) : (
        <Box textAlign="center" p={2}>
          <strong>{parameterType} için veri bulunamadı.</strong>
        </Box>
      )}
    </Box>
  );
};

export default OtherParameter;
