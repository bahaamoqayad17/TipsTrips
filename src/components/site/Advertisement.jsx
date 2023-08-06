import React from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const Advertisement = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box className="advertisement">{t("advertisement")}</Box>
    </>
  );
};

export default Advertisement;
