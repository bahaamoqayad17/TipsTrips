import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const style = {
  marginBottom: "30px",
};

export default function EditOwner(props) {
  const { t } = useTranslation();
  const [item, setItem] = useState(props.item);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.setOwners((prevOwners) =>
      prevOwners.map((owner) => {
        if (owner.image == props.item.image) {
          return { ...owner, ...item };
        } else {
          return owner;
        }
      })
    );
    props.handleCloseModal();
  };

  return (
    <>
      <TextField
        sx={style}
        label={t("source_link")}
        onChange={handleChange}
        value={item?.image_source_link}
        name="image_source_link"
        fullWidth
      />
      <TextField
        sx={style}
        label={t("owner")}
        onChange={handleChange}
        value={item?.image_owner}
        name="image_owner"
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        {t("save")}
      </Button>
    </>
  );
}
