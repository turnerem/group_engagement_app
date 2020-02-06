import axios from "axios";

// const baseURL = "http://192.168.100.117:5000/api";
// const baseURL = "http://192.168.100.99:5000/api";
// // Paula's Macbook Air is 192.168.100.99
const baseURL = "https://anonymask.herokuapp.com/api";

// "http://192.168.100.127:5000/api" = alex

// http://192.168.100.140:5000/api   = dougs laptop
//  192.168.100.117 = emily

export const getSessions = signedInUser => {
  console.log("in get sessions");
  return axios
    .get(`${baseURL}/${signedInUser}`)
    .then(({ data }) => {
      console.log(data);
      return data.sessions;
    })
    .catch(err => {
      console.dir(err);
    });
};

export const getSingleSession = (signedInUser, sessionName) => {
  // console.log(
  //   `making api request for ${baseURL}/${signedInUser}/${sessionName}`
  // );
  return axios
    .get(`${baseURL}/${signedInUser}/${sessionName}`)
    .then(({ data }) => {
      console.log(data, "<<<<<<<data!");
      return data;
    }); // TODO: add catch block here
};

export const postNewUser = username => {
  return axios.post(`${baseURL}`, { user_name: username }).then(({ data }) => {
    return data;
  }); // TODO: add catch block here
};

export const postNewSession = (signedInUser, session_name, questions) => {
  return axios
    .post(`${baseURL}/${signedInUser}`, { session_name, questions })
    .then(({ data }) => {
      return data;
    }); // TODO: add catch block here
};
