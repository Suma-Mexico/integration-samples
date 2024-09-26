"use client"

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

// Components
import DropZone from "../ui/drop";
import ModalLoading from "../ui/loading";

// Utils
import callToVerify from "../helpers/callToVerify";
import { initialModal, labelsVerify } from "../fixtures/ui.fixture";

const Endpoint = () => {
  const [anverso, setAnverso] = useState<string | null>(null);
  const [reverso, setReverso] = useState<string | null>(null);
  const [facial, setFacial] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState(initialModal);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  /** */
  const generateUUID = () => {
    const identifier = uuidv4();
    setIdentifier(identifier);
  };

  const handlerFrontImage = (img: string) => setAnverso(img);
  const handlerBackImage = (img: string) => setReverso(img);
  const handlerFaceImage = (img: string) => setFacial(img);

  const fields = [
    {
      onChange: handlerFrontImage,
      text: "Front Image",
      type: "front",
    },
    {
      onChange: handlerBackImage,
      text: "Back Image",
      type: "back",
    },
    {
      onChange: handlerFaceImage,
      text: "Face Image",
      type: "face",
    },
  ];

  const onClickHandlerVerify = async () => {
    await callToVerify({
      anverso,
      facial,
      identifier,
      reverso,
      setIsWaiting,
      setModalState,
      setLoading,
    });
  };

  return (
    <>
      <div style={{ margin: "0 0 2em 0" }}>
        <div style={{ marginBottom: "1.8rem" }}>
          <h1 className="h1_table_title">Upload files to verify</h1>
          <p
            style={{
              fontSize: "clamp(0.8rem, 0.9rem, 1rem)",
              color: "var(--text-color-description)",
            }}
          >
            Create ID
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <strong
              style={{
                fontSize: "0.85em",
                paddingBottom: "8px",
                color: "var(--text-color-description)",
              }}
            >
              Client ID
            </strong>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <input
                type="text"
                className="content_input_custom_text"
                placeholder={"Type an identifier"}
                style={{
                  padding: "0.65rem 0.6rem",
                  borderRadius: "4px 0 0 4px",
                }}
                value={identifier}
                onChange={(e) => {
                  const id = e?.target?.value;
                  setIdentifier(id?.replace(/\s/g, ""));
                }}
              />
              <Button
                onClick={generateUUID}
                variant="contained"
                color="secondary"
                size="medium"
                type="button"
                className="btns_actions_with_background_purple"
                style={{
                  textTransform: "capitalize",
                  height: "2.44rem",
                  borderRadius: "0 4px 4px 0",
                  border: "1px solid var(--secondary-color)",
                }}
              >
                Auto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Grid
        container
        spacing={2}
        style={{ marginTop: "1rem", marginBottom: "5rem" }}
      >
        {fields.map(({ onChange, text, type }) => (
          <Grid key={text}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <h4
                style={{
                  color: "var(--light-black-color)",
                  fontSize: "0.85rem",
                  marginBottom: "10px",
                }}
              >
                {text}
              </h4>
              <DropZone
                onChange={onChange}
                key={type}
                validateSize={{ show: type === "face", size: 6 }}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent={"center"}>
        <Button
          disabled={loading}
          onClick={onClickHandlerVerify}
          variant="contained"
          color="secondary"
          size="medium"
          type="button"
          className="btns_actions_with_background_purple"
          style={{
            textTransform: "capitalize",
            height: "2.44rem",
          }}
        >
          Verify
        </Button>
      </Grid>
      <ModalLoading
        isLoading={isWaiting}
        button={labelsVerify.ok}
        titleWaiting={labelsVerify.waitingDescription}
        isOpen={modalState.open}
        titleDialog={modalState.title}
        contentDialog={modalState.content}
      />
    </>
  );
};

export default Endpoint;
