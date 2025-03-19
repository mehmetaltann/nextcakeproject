import React from "react";
import ModalButton from "./modals/ModalButton";
import { Paper, Stack, Typography } from "@mui/material";

interface PageFormContainerProps {
  children: React.ReactNode;
  title: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalHeight?: string;
}

const PageFormContainer: React.FC<PageFormContainerProps> = ({
  children,
  title,
  modalOpen,
  setModalOpen,
  modalHeight,
}) => {
  return (
    <Paper>
      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
        spacing={{ xs: 2, md: 0 }}
        sx={{ p: 2, pl: 3 }}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography color={"secondary"}>{title}</Typography>
          <ModalButton
            title={title}
            height={{ md: modalHeight, xs: modalHeight }}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            size="medium"
          >
            {children}
          </ModalButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PageFormContainer;
