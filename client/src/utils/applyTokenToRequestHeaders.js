import axios from "axios";
const setHeader = token => {
  //Token exists on users's browser
  if (token) axios.defaults.headers.common["Authorization"] = token;
  //Remove token from further requests
  else delete axios.defaults.headers.common["Authorization"];
};

export default setHeader;
