import {api} from 'boot/axios'
import UserService from 'src/services/UserService'
import { Cookies } from 'quasar'
import { useQuasar } from 'quasar'
export const doLogin = async ({ commit }, payload) => {
  const response = await UserService.login(payload);
  const token = response.data.accessToken;
  commit('setToken', token);
  Cookies.set('token', token);

  commit('setMe', response.data);
  Cookies.set('user', response.data);
  api.defaults.headers.common.Authorization = 'JWT ' + token.access;
  return response;
}

export const signOut = async ({ commit }) => {
  api.defaults.headers.common.Authorization = null;
  Cookies.remove('token');
  commit('removeToken');
}

export const getMe = async ({ commit }) => {
  commit('setMe');
}

export const init = async ({ commit, dispatch }) => {
  const $q = useQuasar();
  const token = $q.cookies.get('token');
  const user = $q.cookies.get('user');

  if (token) {
    await commit('setToken', token);
    api.defaults.headers.common.Authorization = 'JWT ' + token;
  } else {
    commit('removeToken');
  }

  if (user) {
    console.log(user)
    await commit('setMe', user);
  } else {
    commit('removeToken');
  }
}
