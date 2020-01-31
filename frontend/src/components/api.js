import axios from "axios";

const baseURL = "http://192.168.100.131:5000/api/JessJelly";

export const getSessions = () => {
  return axios.get(`${baseURL}`).then(({ data }) => {
    return data.sessions;
  });
};
