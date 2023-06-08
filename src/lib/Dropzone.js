import DynamicModal from "@/components/Admin/DynamicModal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { handleImageChange } from "./Base64EnCode";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  cursor: "pointer",
};

export default function Dropzone(props) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      const updatedOwners = await Promise.all(
        acceptedFiles.map(async (file) => {
          const base64 = await handleImageChange(file);
          return {
            gallery: base64,
            image: Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          };
        })
      );

      props.setOwners((prevOwners) => [...prevOwners, ...updatedOwners]);
    },
  });

  console.log(props.owners);

  const deleteFile = (fileName, fileGallery) => {
    if (fileName) {
      props.setOwners((prevOwners) =>
        prevOwners.filter((owner) => owner.image !== fileName)
      );
    }
    if (fileGallery) {
      props.setOwners((prevOwners) =>
        prevOwners.filter((owner) => owner.gellery.url !== fileGallery)
      );
    }
  };

  const handleOpenModal = (file) => {
    setSelectedFile(file);
    setOpenModal(true);
  };

  const thumbs = props?.owners?.map((file, index) => (
    <>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 15 }}>
        <DynamicModal
          setOwners={props.setOwners}
          setOpenModal={setOpenModal}
          open={openModal}
          model={"owners"}
          image={selectedFile}
          owners={props.owners}
        />
        <div style={thumb} key={file.source_link}>
          <div style={thumbInner}>
            <img
              src={
                file?.image?.preview ? file?.image?.preview : file?.gellery?.url
              }
              style={img}
              onClick={() => handleOpenModal(file.image)}
              alt="test"
            />
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => deleteFile(file.image, file?.gellery?.url)}
        >
          {t("delete")}
        </Button>
      </div>
    </>
  ));

  return (
    <section className="container">
      <div
        style={{ backgroundColor: "#ebebeb", padding: "30px" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p style={{ textAlign: "center" }}>{t("add_file")}</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
