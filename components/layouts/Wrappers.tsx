import { Box, Container } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface PageWrapperProps {
  children: React.ReactNode;
  conSx?: SxProps<Theme>;
  [key: string]: any;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  conSx,
  ...rest
}) => {
  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container
        fixed
        sx={{ mt: 2, width: { xs: "100%", xl: "90%" }, ...conSx }}
        {...rest}
      >
        {children}
      </Container>
    </Box>
  );
};
