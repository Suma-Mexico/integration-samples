import { VscCheck, VscError, VscInfo, VscWarning } from "react-icons/vsc";

const MessageCustom = ({
  type,
  message,
  customMargin,
  customPadding,
  showIcon = true,
  showBackgroundColor = true,
}: {
  message: string;
  showIcon?: boolean;
  customMargin?: string;
  customPadding?: string;
  showBackgroundColor?: boolean;
  type: "success" | "info" | "warning" | "error";
}) => (
  <div
    style={
      type === "error"
        ? {
            ...(showBackgroundColor && {
              backgroundColor: "var(--bg-tag-rejected)",
            }),
            color: "var(--color-tag-rejected)",
            margin: customMargin ? customMargin : "0 10px 14px 0",
            padding: customPadding ? customPadding : "0.5rem 0.7rem",
          }
        : type === "success"
        ? {
            ...(showBackgroundColor && {
              backgroundColor: "var(--bg-tag-approval)",
            }),
            color: "var(--color-tag-approval)",
            margin: customMargin ? customMargin : "0 10px 14px 0",
            padding: customPadding ? customPadding : "0.5rem 0.7rem",
          }
        : type === "warning"
        ? {
            ...(showBackgroundColor && {
              backgroundColor: "var(--bg-tag-sign-pending)",
            }),
            color: "var(--color-tag-sign-pending)",
            margin: customMargin ? customMargin : "0 10px 14px 0",
            padding: customPadding ? customPadding : "0.5rem 0.7rem",
          }
        : {
            ...(showBackgroundColor && {
              backgroundColor: "var(--bg-tag-sign-success)",
            }),
            color: "var(--color-tag-sign-success)",
            margin: customMargin ? customMargin : "0 10px 14px 0",
            padding: customPadding ? customPadding : "0.5rem 0.7rem",
          }
    }
    className="message_custom_form"
  >
    {showIcon ? (
      <>
        {type === "error" ? (
          <VscError size={16} />
        ) : type === "success" ? (
          <VscCheck size={16} />
        ) : type === "warning" ? (
          <VscWarning size={16} />
        ) : (
          <VscInfo size={16} />
        )}
      </>
    ) : null}
    <p
      style={{
        margin: "0",
        padding: "0",
        paddingLeft: "10px",
        letterSpacing: "0.3px",
        fontSize: "clamp(0.83rem, 0.84rem, 0.85rem)",
      }}
    >
      {message}
    </p>
  </div>
);

export default MessageCustom;
