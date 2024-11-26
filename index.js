require("dotenv").config();
const express = require("express");
const userData = require("./db/UserDb");
require("./db/DB");
const cors = require("cors");
const app = express();
const { Auth } = require("./middleware/Auth");
app.use(cors());
app.use(express.json());
const {
  createNote,
  findNotesById,
  findeNotesByTitle,
  findeNotesByTitleDescription,
  updateTitle,
  updateTitleDecripition,
  delteNote,
} = require("./controllers/NotesController");
const {
  deleteUser,
  findUserById,
  updateName,
  updatePassword,
  login,
  signup,
  googleLogin,
} = require("./controllers/UserController");

const port = process.env.PORT || 4000;

//login
app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  const current_user = await login(username, password);
  if (!current_user) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }
  res.json({ message: "Login Successful", data: { current_user } });
});
//signup
app.post("/api/v1/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const user = await signup(email, username, password);
  res.json({ message: "User Created", data: { user } });
});

//user update password
app.put("/api/v1/update-password", async (req, res) => {
  const { email, password, newPassword } = req.body;
  await updatePassword(email, password, newPassword);
  res.json({ message: "Password Change", data: { userData } });
});

//update user name
app.put("/api/v1/update-username", async (req, res) => {
  const { email, password, newName } = req.body;
  await updateName(email, password, newName);
  res.json({ message: "username Changed", data: { userData } });
});

//get user by id
app.get("/api/v1/user", Auth, async (req, res) => {
  const { userid } = req.query;
  if (userid) {
    const user = await findUserById(userid);
    res.json({ message: "Found", data: { user } });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});

// delete user
app.delete("/api/v1/delete-user", async (req, res) => {
  const { userid } = req.query;
  const new_user = await deleteUser(userid);
  res.json({ message: "User Delete", data: { new_user } });
});

//creating notes
app.post("/api/v1/create-notes", async (req, res) => {
  const { title, decripition, userId, Date } = req.body;
  const new_note = await createNote(title, decripition, userId, Date);
  res.json({ message: "Notes saved", data: { new_note } });
});

//getting notes by id
app.get("/api/v1/note", Auth, async (req, res) => {
  const { noteid } = req.query;
  const new_note = await findNotesById(noteid);
  res.json({ message: "Found", data: { new_note } });
});

//update note title
app.put("/api/v1/update-title", async (req, res) => {
  const { username, noteid, title } = req.body;
  const new_data = await updateTitle(username, noteid, title);
  res.json({ message: "Title Updated", data: { new_data } });
});

//update title and description
app.put("/api/v1/update-note", async (req, res) => {
  const { username, noteid, title, decripition } = req.body;
  const new_data = await updateTitleDecripition(
    username,
    noteid,
    title,
    decripition
  );
  res.json({ message: "updated", data: { new_data } });
});

//delete note
app.delete("/api/v1/delete-note", async (req, res) => {
  const { noteid } = req.query;
  await delteNote(noteid);
  res.json({ message: "Deleted" });
});

app.post("/api/v1/google-user", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await googleLogin(username, email, password);
  res.json({ message: "Login Sucessfull", data: user });
});

app.get("/api/v1/active", (req, res) => {
  res.json({ message: "welcome" });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
