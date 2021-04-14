import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    username: null,
    role: null,
    roles: [],
    error: false
};

const authRegister = (state, action) => {
    return updateObject(state, {error: false});
}

const authFail = (state, action) => {
    return updateObject(state, {error: true});
}

const authLogin = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        role: action.role,
        error: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        role: null,
        error: false
    })
}

const getRoles = (state, action) => {
    return updateObject(state, {
        roles: action.roles,
        error: false
    })
}

const getRolesError = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return authRegister(state, action);
        case actionTypes.REGISTER_ERROR:
            return authFail(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return authLogin(state, action);
        case actionTypes.LOGIN_ERROR:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.GET_ROLES_SUCCESS:
            return getRoles(state, action);
        case actionTypes.GET_ROLES_ERROR:
            return getRolesError(state, action);
        default:
            return state;
    }
};

export default authReducer;
