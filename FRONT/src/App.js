import {
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  Input,
  TextareaAutosize,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import axios from "axios";

//material icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";

//components
import Cards from "./components/Cards/Cards";

//context
import Context from "./context";

//styles
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [jwt, setJwt] = useState();
  const [modal, setModal] = useState({
    title: "",
    body: "",
  });
  const [card, setCard] = useState({ title: "", body: "" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [badge, setBadge] = useState({
    ToDo: 0,
    Doing: 0,
    Done: 0,
  });
  var types = ["ToDo", "Doing", "Done"];

  useEffect(() => {
    const initiateData = async () => {
      if (jwt) return;
      try {
        var token = await axios({
          method: "post",
          url: `http://localhost:5000/login`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: { login: "letscode", senha: "lets@123" },
        }).then((res) => {
          setJwt(res.data);
          return res.data;
        });
        getCards(token);
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    initiateData();
  }, []);

  useEffect(() => {
    setError(false);
  }, [modal.title, modal.body]);

  const handleClose = () => setOpen(false);

  const getCards = async (token) => {
    try {
      axios({
        method: "get",
        url: "http://localhost:5000/cards",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setBadge({
          ToDo: res.data.filter((e) => {
            return e.lista == "ToDo";
          }).length,
          Doing: res.data.filter((e) => {
            return e.lista == "Doing";
          }).length,
          Done: res.data.filter((e) => {
            return e.lista == "Done";
          }).length,
        });
        setTasks(res.data);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const addTask = async () => {
    if (!modal.body || !modal.title) {
      setError(true);
      return;
    }
    try {
      await axios({
        method: "post",
        url: "http://localhost:5000/cards",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        data: {
          titulo: modal.title,
          conteudo: `${modal.body}`,
          lista: "ToDo",
        },
      });
      getCards(jwt);
      setOpen(false);
      setModal({ title: "", body: "" });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const nextStatus = async (task) => {
    let index = types.indexOf(task.lista);
    if (types[index + 1]) {
      try {
        await axios({
          method: "put",
          url: `http://localhost:5000/cards/${task.id}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          data: {
            id: `${task.id}`,
            titulo: `${task.titulo}`,
            conteudo: `${task.conteudo}`,
            lista: `${types[index + 1]}`,
          },
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    getCards(jwt);
  };

  const previousStatus = async (task) => {
    let index = types.indexOf(task.lista);
    if (types[index - 1]) {
      try {
        await axios({
          method: "put",
          url: `http://localhost:5000/cards/${task.id}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          data: {
            id: `${task.id}`,
            titulo: `${task.titulo}`,
            conteudo: `${task.conteudo}`,
            lista: `${types[index - 1]}`,
          },
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    getCards(jwt);
  };

  const handleUpdate = async (task) => {
    try {
      await axios({
        method: "put",
        url: `http://localhost:5000/cards/${task.id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        data: {
          id: `${task.id}`,
          titulo: `${card.title}`,
          conteudo: `${card.body}`,
          lista: `${task.lista}`,
        },
      });
      setCard({ body: "", title: "" });
    } catch (error) {
      console.log(error);
      return error;
    }
    getCards(jwt);
  };

  const handleDelete = async (task) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/cards/${task.id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setAlert(true);
      setInterval(() => {
        setAlert(false);
      }, 6000);
    } catch (error) {
      console.log(error);
      return error;
    }
    getCards(jwt);
  };

  return (
    <Context.Provider value={[card, setCard]}>
      <Grid container className="container" justifyContent="space-between">
        <Grid className="add-task">
          <Button className="add-button" onClick={() => setOpen(true)}>
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
        {alert ? (
          <Alert
            className="alert"
            onClose={() => {
              setAlert(false);
            }}
          >
            Tarefa apagada com sucesso!
          </Alert>
        ) : null}
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box" display="flex" flexDirection="column">
            <Input
              className="modal-header"
              placeholder="Dê um nome para sua tarefa"
              value={
                modal.title || modal.title == "" ? modal.title : props.header
              }
              inputProps={{ style: { textAlign: "center" } }}
              onChange={(e) => {
                setModal({ ...modal, title: e.target.value });
              }}
              required
            />
            <TextareaAutosize
              required
              className="modal-textarea"
              minRows={8}
              placeholder="Qual a descrição da tarefa?"
              value={modal.body || modal.body == "" ? modal.body : props.body}
              onChange={(e) => {
                setModal({ ...modal, body: e.target.value });
              }}
            />
            {error ? (
              <Box className="error">
                <span>Por favor preencha todos os campos corretamente</span>
              </Box>
            ) : null}

            <Box mt={2} display="flex" justifyContent="space-between">
              <CancelOutlinedIcon
                className="card-icon"
                fontSize="large"
                sx={{ color: "red" }}
                onClick={() => {
                  setOpen(false);
                  setError(false);
                  setModal({ title: "", body: "" });
                }}
              />
              <CheckIcon
                className="card-icon"
                fontSize="large"
                sx={{ color: "rgb(22, 83, 212)" }}
                onClick={() => {
                  addTask();
                }}
              />
            </Box>
          </Box>
        </Modal>
        {types.map((type) => {
          return (
            <Grid className="accordion-container" key={type}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={`${type}-header`}
                >
                  <Typography className="accordion-header">
                    {type == "ToDo" ? "To do" : type}
                    <Badge
                      sx={{ margin: "-3px 0 0 20px" }}
                      badgeContent={badge[type]}
                      color="error"
                    ></Badge>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  {tasks.map((task) => {
                    if (type == task.lista) {
                      return (
                        <Cards
                          key={task.id}
                          body={`${task.conteudo}`}
                          list={`${type}`}
                          header={task.titulo}
                          onClickDelete={() => handleDelete(task)}
                          onClickUpdate={() => handleUpdate(task)}
                          nextStatus={() => nextStatus(task)}
                          previousStatus={() => previousStatus(task)}
                        />
                      );
                    }
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
    </Context.Provider>
  );
}

export default App;
