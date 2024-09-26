import "./styles.css";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { VscCloudUpload, VscTrash } from "react-icons/vsc";

const DropZone = ({
  onChange,
  customWidth,
  isDisabled,
  validateSize,
}: {
  onChange: (img: string) => void;
  customWidth?: string;
  isDisabled?: boolean;
  validateSize?: { show: boolean; size: number };
}) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles.length > 0) {
      // Validate type
      const typeAccepts = "image/jpg,image/png,image/jpeg";
      const typeFile = acceptedFiles[0]?.type;
      const sizeFile = acceptedFiles[0].size / 1024 / 1024; //Convert to MB

      if (validateSize && validateSize.show && sizeFile > validateSize.size) {
        setImage("");
        onChange("");
        alert("Size is too large");
        return;
      }

      if (!typeAccepts.includes(typeFile)) {
        setImage("");
        onChange("");
        alert("Invalid format");
        return;
      }

      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();
        const type = file.type;
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result;
          const imgBase64 = String(base64)?.replace(`data:${type};base64,`, "");
          onChange(imgBase64);
          setImage(String(base64));
        };
      });
    }
  }, []);

  const deleteImage = () => {
    setImage("");
    onChange("");
  };

  const onError = useCallback((error: Error) => {
    alert(error.message);
  }, []);

  useEffect(() => {
    if (image) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [image]);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    onError,
    disabled: isDisabled ?? disabled,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: image ? "transparent" : "var(--bg-color-sign)",
        border: image ? "none" : "1px solid var(--gray-color)",
      }}
      className="custom_content_drop"
    >
      {image && (
        <div className="content_tools_drop">
          <div onClick={deleteImage} className="tool_drop">
            <VscTrash size={18} strokeWidth={0} />
          </div>
        </div>
      )}
      <div
        {...getRootProps()}
        style={{
          height: image ? "200px" : "190px",
          width: customWidth ?? "260px",
          backgroundImage: image ? `url(${image})` : "none",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          cursor: image ? "auto" : "pointer",
        }}
        className="content_drop_securityscanner dropzone_ui"
      >
        <input {...getInputProps()} />
        {!image && (
          <div style={{ textAlign: "center" }}>
            <VscCloudUpload
              size={28}
              style={{ color: "var(--light-black-color)" }}
            />
            <p
              style={{
                fontSize: "clamp(0.8rem, 0.83rem, 0.88rem)",
                color: "var(--light-black-color)",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "600",
              }}
            >
              Drag or upload images
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
