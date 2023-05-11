import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getProfile as profileApi,
    updateProfile as profileUpdateApi,
    updateProfilePassword as profileUpdatePasswordApi
} from '../../helpers/';

// apicore
import { APICore } from '../../helpers/api/apiCore';

// actions
import { profileApiResponseSuccess, profileApiResponseError } from './actions';

// constants
import { ProfileActionTypes } from './constants';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    post: string;
    birthday: Date;
}

interface ProfilePassData {
    password: string;
    confirm: string;
    oldPassword: string;
}

interface UserData {
    payload: {
        userid: string | number;
        data: UserProfile
    };
    type: string;
}

interface UserPasswordData {
    payload: {
        data: ProfilePassData
    };
    type: string;
}

const api = new APICore();

function* getProfile(): SagaIterator {
    try {
        const response = yield call(profileApi);
        yield put(profileApiResponseSuccess(ProfileActionTypes.GET_PROFILE, response));
    } catch (error: any) {
        yield put(profileApiResponseError(ProfileActionTypes.GET_PROFILE, "Пользователь с таким id не найден!"));
    }
}

function* updateProfile({ payload: { data } }: UserData): SagaIterator {
    const response = yield call(profileUpdateApi, { data });
    if (!response?.success) {
        yield put(profileApiResponseError(ProfileActionTypes.UPDATE_PROFILE, response));
    } else {
        let user = api.getLoggedInUser();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        api.setLoggedInUser(user);
        yield put(profileApiResponseSuccess(ProfileActionTypes.UPDATE_PROFILE, response));

    }
}

function* updateProfilePassword({ payload: { data } }: UserPasswordData): SagaIterator {
    const response = yield call(profileUpdatePasswordApi, { data });
    if (response?.success) {
        yield put(profileApiResponseSuccess(ProfileActionTypes.UPDATE_PROFILE_PASSWORD, response));
    } else {
        yield put(profileApiResponseError(ProfileActionTypes.UPDATE_PROFILE_PASSWORD, "Заполните все поля формы корректно!"));
    }
}


export function* watchGetProfile(): any {
    yield takeEvery(ProfileActionTypes.GET_PROFILE, getProfile);
}

export function* watchUpdateProfile(): any {
    yield takeEvery(ProfileActionTypes.UPDATE_PROFILE, updateProfile);
}

export function* watchUpdateProfilePassword(): any {
    yield takeEvery(ProfileActionTypes.UPDATE_PROFILE_PASSWORD, updateProfilePassword);
}

function* profileSaga() {
    yield all([fork(watchGetProfile), fork(watchUpdateProfile), fork(watchUpdateProfilePassword)]);
}

export default profileSaga;
