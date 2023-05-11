import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// apicore
import { APICore } from '../../helpers/api/apiCore';

// helpers
import {
    login as loginApi,
    logout as logoutApi,
    forgotPassword as forgotPasswordApi,
    resetForgotPassword as resetForgotPasswordApi,
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions';

// constants
import { AuthActionTypes } from './constants';

interface UserData {
    payload: {
        username: string;
        password: string;
        fullname: string;
        email: string;
    };
    type: string;
}

interface UserChangePass {
    payload: {
        password: string;
        confirm: string;
        token: string | null;
        email: string | null
    };
    type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password }, type }: UserData): SagaIterator {
    const response = yield call(loginApi, { username, password });
    // NOTE - You can change this according to response format from your api
    if (response.error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, response.error));
        api.setLoggedInUser(null);
    } else {
        api.setLoggedInUser(response);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, response));
    }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
    try {
        const response = yield call(forgotPasswordApi, { username });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, "Пользователь с таким логином не найден!"));
    }
}

function* resetForgotPassword({ payload: { password, confirm, token, email } }: UserChangePass): SagaIterator {
    try {
        const response = yield call(resetForgotPasswordApi, { password, confirm, token, email });
        yield put(authApiResponseSuccess(AuthActionTypes.RESET_FORGOT_PASSWORD, response));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.RESET_FORGOT_PASSWORD, "Пользователь с таким логином не найден!"));
    }

}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchChangeForgotPassword(): any {
    yield takeEvery(AuthActionTypes.RESET_FORGOT_PASSWORD, resetForgotPassword);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout), fork(watchForgotPassword), fork(watchChangeForgotPassword)]);
}

export default authSaga;
