export default (obj) => {
  if (obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  return obj;
};
