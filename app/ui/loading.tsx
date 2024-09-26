import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SpinnerModal from "./spinner"; // Components
import { initialModal } from "../fixtures/ui.fixture";

const ModalLoading = ({
  isLoading,
  titleWaiting,
  titleDialog,
  contentDialog,
  subContentDialog,
  button,
  isOpen,
  setModalState,
}: {
  isLoading: boolean;
  button: string;
  titleDialog: string;
  contentDialog: string;
  isOpen: boolean;
  subContentDialog?: string;
  titleWaiting?: string;
  setModalState?: Dispatch<SetStateAction<unknown>>;
}) => {
  const [open, setOpen] = useState<boolean>(isOpen || false);

  const onConfirmHandler = () => {
    setOpen(false);

    if (setModalState) {
      setModalState(initialModal);

      return;
    }

    window.location.reload();
  };

  if (!isLoading && !isOpen) return;

  return isLoading ? (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        open={isLoading}
        id="modalRevision"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <SpinnerModal title={titleWaiting} />
      </Modal>
    </div>
  ) : (
    <div>
      <Dialog
        keepMounted
        onClose={() => setOpen(false)}
        open={isOpen || open}
        id="modalRevision"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <DialogTitle className="content_main_title_dialog">
          {titleDialog}
        </DialogTitle>
        <DialogContent>
          <div
            className="content_main_info_dialog"
            style={{ padding: "1.9rem 1rem" }}
          >
            <p>{contentDialog}</p>
            {subContentDialog && <p>{subContentDialog}</p>}
          </div>
        </DialogContent>
        <DialogActions className="content_main_actions_dialog">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="button"
            className="btns_actions_with_background_purple"
            sx={{ textAlign: "center" }}
            onClick={onConfirmHandler}
          >
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalLoading;
