/**
 * Initial  modal
 */
const initialModal = {
  color: "",
  content: "",
  isChecked: false,
  open: false,
  title: "",
};

const labelsVerify = {
  notice: "Aviso",
  noticeTitle: "Tu verificación ha sido enviada a la mesa de expertos.",
  noticeDescription:
    "Y los resultados de tu verificación estarán disponibles en cuanto se liberen.",
  error: "Error",
  errorTitle: "¡Oh, no! Algo salió mal.",
  errorDescription: "Por favor, vuelve a intentarlo más tarde.",
  warningTitle: "La verificación ha tomado más tiempo de lo esperado.",
  warningDescription: "Revisa el panel de registros.",
  ok: "Ok",
  red: "red",
  green: "green",
  orange: "orange",
  checkmark: "checkmark",
  warning: "warning",
  waitingDescription: "Esto puede tardar unos segundos.",
  errorTitleSameId: "El íd ingresado ya existe",
  errorDescriptionSameId:
    "Intente ingresar un nuevo id y continue con el proceso",
};

export { initialModal, labelsVerify };
