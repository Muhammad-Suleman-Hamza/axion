const emojis = require('../../public/emojis.data.json');

module.exports = {
  id: {
    path: "id",
    type: "string",
    length: { min: 1, max: 50 },
  },

  username: {
    path: "username",
    type: "string",
    custom: "username",
    length: { min: 3, max: 20 },
  },

  password: {
    path: "password",
    type: "string",
    length: { min: 8, max: 100 },
  },

  email: {
    path: "email",
    type: "string",
    length: { min: 3, max: 100 },
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  title: {
    path: "title",
    type: "string",
    length: { min: 3, max: 300 },
  },

  label: {
    path: "label",
    type: "string",
    length: { min: 3, max: 100 },
  },

  shortDesc: {
    path: "desc",
    type: "string",
    length: { min: 3, max: 300 },
  },

  longDesc: {
    path: "desc",
    type: "string",
    length: { min: 3, max: 2000 },
  },

  url: {
    path: "url",
    type: "string",
    length: { min: 9, max: 300 },
  },

  emoji: {
    path: "emoji",
    type: "array",
    items: {
      type: "string",
      length: { min: 1, max: 10 },
      oneOf: emojis.value,
    },
  },

  price: {
    path: "price",
    type: "number",
    min: 0,
  },

  avatar: {
    path: "avatar",
    type: "string",
    length: { min: 8, max: 100 },
  },

  text: {
    path: "text",
    type: "string",
    length: { min: 3, max: 15 },
  },

  longText: {
    path: "longText",
    type: "string",
    length: { min: 3, max: 250 },
  },

  paragraph: {
    path: "paragraph",
    type: "string",
    length: { min: 3, max: 10000 },
  },

  phone: {
    path: "phone",
    type: "string",
    regex: /^[0-9+\-() ]{8,20}$/,
  },

  number: {
    path: "number",
    type: "number",
    min: 1,
    max: 999999,
  },

  arrayOfStrings: {
    path: "arrayOfStrings",
    type: "array",
    items: {
      type: "string",
      length: { min: 3, max: 100 },
    },
  },

  obj: {
    path: "obj",
    type: "object",
  },

  bool: {
    path: "bool",
    type: "boolean",
  },

  schoolname: {
    path: "schoolname",
    type: "string",
    length: { min: 3, max: 100 },
  },

  role: {
    path: "role",
    type: "string",
    oneOf: ["superadmin", "admin"],
  },

  admins: {
    path: "admins",
    type: "array",
    items: {
      type: "string",
      length: { min: 3, max: 100 },
    },
  },

  schools: {
    path: "schools",
    type: "array",
    items: {
      type: "string",
      length: { min: 3, max: 100 },
    },
  },

  classroomname: {
    path: "classroomname",
    type: "string",
    length: { min: 3, max: 100 },
  },

  studentname: {
    path: "studentname",
    type: "string",
    length: { min: 3, max: 100 },
  },

  schoolid: {
    path: "schoolid",
    type: "string",
    length: { min: 3, max: 100 },
  },

  classroomid: {
    path: "classroomid",
    type: "string",
    length: { min: 3, max: 100 },
  },
};