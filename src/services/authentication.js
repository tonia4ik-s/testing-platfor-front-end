import authenticationService from "../api/authentication";
import { store } from "../store";
import {setAccess, logout} from "../reduxActions/auth"
import tokenService from "./tokens"

export function register(values, history) {
  const model = {
    username: values.userName,
    email: values.email,
    password: values.password
  };

  authenticationService
    .register(model)
    .then(
      (response) => {
        store.dispatch(setAccess(response.data));
        history.push("/");
        window.location.reload()
      }
    )
}

export function login(values, history) {
  const model = {
    email: values.email,
    password: values.password
  };

  authenticationService
    .login(model)
    .then(
      (response) => {
        store.dispatch(setAccess(response.data));
        history.push("/");
        window. location. reload()
      }
    )
}

export function logoutUser() {
  const model = {
    refreshToken: tokenService.getLocalRefreshToken()
  };

  authenticationService
    .logout(model)
    .then(
      () => {
        store.dispatch(logout());
      }
    )
}
