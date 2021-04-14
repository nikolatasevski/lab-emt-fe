import * as actionTypes from '../actionTypes';
import {API_DRIVER} from "../../config";

export const register = (username, password, role) => {
    return dispatch => {
        API_DRIVER.post("api/auth/register", {username: username, password: password, role: role})
            .then(response => {
                dispatch({type: actionTypes.REGISTER_SUCCESS})
            })
            .catch(error => {
                dispatch({type: actionTypes.REGISTER_ERROR})
            })
    }
}

export const login = (username, password) => {
    return dispatch => {
        API_DRIVER.post("api/auth/signIn", {username: username, password: password})
            .then(response => {
                const token = response.data.accessToken;
                const username = response.data.username;
                const role = response.data.roles;

                let storage = sessionStorage;
                storage.setItem('token', token);
                storage.setItem('username', username);
                storage.setItem('role', role);
                dispatch({type: actionTypes.LOGIN_SUCCESS, token: token, username: username, role: role})
            })
            .catch(error => {
                dispatch({type: actionTypes.LOGIN_ERROR})
            })
    }
}

export const logout = () => {
    let storage = sessionStorage;
    storage.removeItem('token');
    storage.removeItem('username');
    storage.removeItem('role');
    return {type: actionTypes.AUTH_LOGOUT}
}

export const getRoles = () => {
    return dispatch => {
        API_DRIVER.get("api/role")
            .then(response => {
                dispatch({type: actionTypes.GET_ROLES_SUCCESS, roles: response.data})
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_ROLES_ERROR})
            })
    }
}
