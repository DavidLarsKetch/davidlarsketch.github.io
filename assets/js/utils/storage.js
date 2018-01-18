"use strict";

module.exports.retrieve = key => {
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  return data;
};

module.exports.save = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

module.exports.delete = key => {
  localStorage.removeItem(key);
};
