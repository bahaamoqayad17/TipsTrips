import { closeModal } from "@/store/RootSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import EditOwner from "./modals/EditOwner";
import EditItenary from "./modals/EditItenary";
import EditTransport from "./modals/EditTransport";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function DynamicModal(props) {
  const { closeAllModals } = useSelector(({ root }) => root);
  const dispatch = useDispatch();
  const handleCloseModal = () => props.setOpenModal(false);

  if (closeAllModals) {
    handleCloseModal();
    dispatch(closeModal(false));
  }
  const componentsName = {
    owners: EditOwner,
    itenaries: EditItenary,
    transports: EditTransport,
  };

  const DynamicComponentName = componentsName[props.model];
  return (
    <>
      <Modal
        open={props.open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={style}>
          <DynamicComponentName
            propertyId={props?.propertyId}
            setDays={props?.setDays}
            image={props?.image}
            setOwners={props?.setOwners}
            item={props?.item}
            handleCloseModal={handleCloseModal}
            owners={props?.owners}
            dayIndex={props?.dayIndex}
            days={props?.days}
          />
        </Box>
      </Modal>
    </>
  );
}
