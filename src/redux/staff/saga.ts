import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getStaff as staffApi,
    addStaff as staffAddApi,
    removeStaff as staffRemoveApi
} from '../../helpers/';


// actions
import { staffApiResponseError, staffApiResponseSuccess } from './actions';

// constants
import { StaffActionTypes } from './constants';

interface Staff {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
}

interface StaffData {
    payload: {
        data: Staff
    };
    type: string;
}

function* getStaff(): SagaIterator {
    try {
        const response = yield call(staffApi);
        const staffArray: Staff= response.data.map((staffData: any) => ({
            id: staffData.id,
            name: staffData.firstName,
            secondName: staffData.lastName,
            email: staffData.email,
            created_date: staffData.created_at
          }));

        yield put(staffApiResponseSuccess(StaffActionTypes.GET_STAFF, staffArray));
    } catch (error: any) {
        yield put(staffApiResponseError(StaffActionTypes.GET_STAFF, "Пользователь с таким id не найден!"));
    }
}

function* addStaff({ payload: { data } }: StaffData): SagaIterator {
    try {
        const response = yield call(staffAddApi, { data });
    
        const staffArray: Staff= response.data.map((staffData: any) => ({
            id: staffData.id,
            name: staffData.firstName,
            secondName: staffData.lastName,
            email: staffData.email,
            created_date: staffData.created_at
          }));

        yield put(staffApiResponseSuccess(StaffActionTypes.ADD_STAFF,staffArray ));
    } catch (error: any) {
        yield put(staffApiResponseError(StaffActionTypes.ADD_STAFF, "Пользователь с таким id не найден!"));
    }
}

function* removeStaff({ payload: { data } }: StaffData): SagaIterator {
    try {
        const response = yield call(staffRemoveApi, { data });
        yield put(staffApiResponseSuccess(StaffActionTypes.REMOVE_STAFF, response.data));
    } catch (error: any) {
        yield put(staffApiResponseError(StaffActionTypes.REMOVE_STAFF, "Заполните все поля формы корректно!"));
    }
}


export function* watchGetStaff(): any {
    yield takeEvery(StaffActionTypes.GET_STAFF, getStaff);
}

export function* watchAddStaff(): any {
    yield takeEvery(StaffActionTypes.ADD_STAFF, addStaff);
}

export function* watchRemoveStaff(): any {
    yield takeEvery(StaffActionTypes.REMOVE_STAFF, removeStaff);
}

function* profileSaga() {
    yield all([fork(watchGetStaff), fork(watchAddStaff), fork(watchRemoveStaff)]);
}

export default profileSaga;
