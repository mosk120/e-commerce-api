import {Cookies} from "quasar";

export const setToken =  (state, token) => {
  state.token = token;
  state.isAuthenticated = true;
  Cookies.set('token', JSON.stringify(token));
}

export const removeToken =  (state, token) => {
  state.token = null;
  state.me = null;
  state.isAuthenticated = false;
  Cookies.remove('token');
  Cookies.remove('user');
}

export const setMe =  (state, me) => {
  state.me = me;
  Cookies.set('user', JSON.stringify(me));
}
