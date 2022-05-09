import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Input,
  TextareaAutosize,
} from "@mui/material";

//material icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";

//components
import MarkdownText from "../Markdown/Markdown";

import "./Cards.css";
import { useContext, useEffect, useState } from "react";
import Context from "../../context";

function Cards(props) {
  const [editable, setEditable] = useState(false);
  const [card, setCard] = useContext(Context);
  const [cardError, setCardError] = useState(false);

  const editCard = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    setCardError(false);
  }, [card.title, card.body]);

  const checkValues = (e) => {
    if (card.title == "" || card.body == "") {
      setCardError(true);
      return;
    }
    props.onClickUpdate(e);
    setEditable(false);
  };

  var types = ["ToDo", "Doing", "Done"];

  return (
    <>
      {!editable ? (
        <Paper className={`card-container ${props.list}`} elevation={4}>
          <Grid container>
            {props.list == types[0] ? null : (
              <Grid container flex={0.1}>
                <Button
                  id="previous"
                  className="card-button"
                  onClick={(e) => props.previousStatus(e)}
                >
                  <Typography className="switch-status">{"<"}</Typography>
                </Button>
              </Grid>
            )}
            <Grid
              container
              flex={1}
              justifyContent={`${
                props.list == "ToDo"
                  ? "flex-end"
                  : props.list == types[types.length - 1]
                  ? "flex-start"
                  : "center"
              }`}
              pl={1}
              pr={1}
              alignItems="center"
            >
              <Typography className="card-header">{props.header}</Typography>
            </Grid>
            {props.list == types[types.length - 1] ? null : (
              <Grid container flex={0.1} justifyContent="flex-end">
                <Button
                  id="next"
                  className="card-button"
                  onClick={(e) => props.nextStatus(e)}
                >
                  <Typography className="switch-status">{">"}</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            flex={1}
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Grid className="markdown-body">
              <MarkdownText value={`${props.body}`} />
            </Grid>
          </Grid>
          <Grid
            container
            flex={1}
            className="card-hoverable"
            justifyContent="space-between"
          >
            <DeleteForeverIcon
              className="card-icon"
              sx={{ color: "red" }}
              fontSize="large"
              onClick={(e) => {
                props.onClickDelete(e);
              }}
            />
            <EditIcon
              className="card-icon"
              fontSize="large"
              onClick={() => {
                editCard();
              }}
            />
          </Grid>
        </Paper>
      ) : (
        <Paper className={`card-container ${props.list}`} elevation={2}>
          <Grid container>
            <Grid
              container
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <Input
                className="card-header"
                placeholder="Novo título da tarefa"
                value={
                  card.title || card.title == "" ? card.title : props.header
                }
                inputProps={{ style: { textAlign: "center" } }}
                onChange={(e) => {
                  setCard({ ...card, title: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            flex={1}
            justifyContent="center"
            flexDirection="column"
          >
            <Grid className="markdown-body markdown-body-editable">
              <TextareaAutosize
                className="TextArea"
                minRows={8}
                placeholder="Alteração da tarefa"
                value={card.body || card.body == "" ? card.body : props.body}
                onChange={(e) => {
                  setCard({ ...card, body: e.target.value });
                }}
              />
            </Grid>
            {cardError ? (
              <Box className="error">
                <span>Por favor preencha todos os campos corretamente</span>
              </Box>
            ) : null}
          </Grid>
          <Grid
            container
            flex={1}
            className="card-hoverable editable"
            justifyContent="space-between"
          >
            <CancelOutlinedIcon
              className="card-icon"
              fontSize="large"
              sx={{ color: "red" }}
              onClick={() => {
                setEditable(false);
                setCardError(false);
                setCard({ title: "", body: "" });
              }}
            />
            <CheckIcon
              className="card-icon"
              fontSize="large"
              sx={{ color: "rgb(22, 83, 212)" }}
              onClick={(e) => {
                checkValues(e);
              }}
            />
          </Grid>
        </Paper>
      )}
    </>
  );
}

export default Cards;
