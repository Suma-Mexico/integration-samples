import "./styles.css";

const SpinnerModal = ({ title }: { title?: string }) => (
  <>
    <p style={{ color: "#fff", fontSize: "0.9rem", marginBottom: "1rem" }}>
      {title ?? "Loading"}
    </p>
    <div className="semipolar-spinner">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
    </div>
  </>
);

export default SpinnerModal;
