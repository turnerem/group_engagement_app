import React from "react";

export const CurrentUserContext = React.createContext({
  signedInUser: "",
  signUserIn: username => {
    if (username) this.signedInUser = username;
  }
});
