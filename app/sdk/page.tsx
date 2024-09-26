"use client";

import { useEffect, useState } from "react";
import { WebVerification } from "vdid-sdk-web";

const Sdk = () => {
  const [container, setContainer] = useState<JSX.Element>();
  const [images, setImages] = useState(null);

  useEffect(() => {
    window.addEventListener("message", (ev) => {
      if (typeof ev.data !== "object") return;
      if (!ev.data.images) return;

      setImages(ev.data.images);
    });
  }, []);

  const onClickHandler = async () => {
    try {
      const publicApiKey =
        "pk_test_ElTXm0vy1O1D44zIemBiniFqQzYPnMiURuo2tFkRHyY=";
      const vdid = new WebVerification(publicApiKey);
      const url = vdid.getUrl({ uuid: "" });
      console.log(url);

      setContainer(
        <iframe
          src={url}
          title="Sdk VDID"
          allow="camera; microphone"
          width="400"
          height="600"
        />
      );
    } catch (error) {
      setContainer(<p style={{ color: "red" }}>ERROR</p>);
      console.log({ error });
    }
  };

  console.log(images);

  return (
    <div className="Sdk">
      <div className="Sdk-header">
        <button className="Sdk-button" onClick={onClickHandler}>
          Test Me
        </button>
      </div>
      <div className="Sdk-container">{container}</div>
    </div>
  );
};

export default Sdk;
