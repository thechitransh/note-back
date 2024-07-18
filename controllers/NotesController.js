const { Notes } = require("../model/Notes");
const { User } = require("../model/User");
const userData = require("../db/UserDb");

const createNote = async (title, decripition, userId, Date) => {
  try {
    const note = await Notes.create({ title, decripition, Date });
    await User.findByIdAndUpdate(userId, {
      $push: { notes: note._id },
    });

    return note;
  } catch (error) {
    console.log(error);
  }
};

const findNotesById = (noteid, email) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email === email) {
      new_note = user.notes.filter((n) => n.noteid == +noteid);
    }
  });
  return new_note;
};

const findeNotesByTitle = (email, title) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email == email) {
      new_note = user.notes.filter((n) => n.title == title);
    }
  });
  return new_note;
};

const findeNotesByTitleDescription = (email, title, decripition) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email == email) {
      new_note = user.notes.filter(
        (n) => n.title == title && n.decripition == decripition
      );
    }
  });
  return new_note;
};

const updateTitle = (username, noteid, title) => {
  userData.map((user) => {
    if (user.name === username) {
      user.notes.map((note) => {
        if (note.noteid === noteid) {
          note.title = title;
        }
      });
    }
  });
  return userData;
};

const updateTitleDecripition = async (username, noteid, title, decripition) => {
  try {
    const userData = await Notes.findByIdAndUpdate(noteid, {
      $set: { title: title, decripition: decripition },
    });
    return userData;
  } catch (error) {
    console.log(error);
  }
};

const delteNote = async (noteid) => {
  const res = await Notes.findByIdAndDelete(noteid);
  await User.updateMany({ notes: noteid }, { $pull: { notes: noteid } });
  return res;
};

module.exports = {
  createNote,
  findNotesById,
  findeNotesByTitle,
  findeNotesByTitleDescription,
  updateTitle,
  updateTitleDecripition,
  delteNote,
};
