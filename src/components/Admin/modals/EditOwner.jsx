import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

export default function EditOwner(props) {
  const { t } = useTranslation();
  const [item, setItem] = useState(props.image);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.setOwners((prevOwners) =>
      prevOwners.map((owner) =>
        owner.image === props.image ? { ...owner, ...item } : owner
      )
    );
    props.handleCloseModal();
  };

  return (
    <>
      <TextField
        sx={style}
        label={t("source_link")}
        onChange={handleChange}
        value={item?.source_link}
        name="source_link"
        fullWidth
      />
      <TextField
        sx={style}
        label={t("owner")}
        onChange={handleChange}
        value={item?.owner}
        name="owner"
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        {t("save")}
      </Button>
    </>
  );
}
