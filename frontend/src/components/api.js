import axios from "axios";

const baseURL = "http://192.168.100.131:5000/api";

export const getSessions = signedInUser => {
  return axios.get(`${baseURL}/${signedInUser}`).then(({ data }) => {
    return data.sessions;
  });
};

export const postNewUser = username => {
  console.log("attemping post w");
  return axios.post(`${baseURL}`, { user_name: username }).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const postNewSession = signedInUser => {
  return axios.post(`${baseURL}/${signedInUser}`).then(({ data }) => {
    return data;
  });
};
