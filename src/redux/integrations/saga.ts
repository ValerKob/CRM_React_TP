import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getIntegrations as integrationsApi,
    disconnectIntegration as disconnectApi,
    connectIntegration as connectApi
} from '../../helpers/';

// apicore
//import { APICore } from '../../helpers/api/apiCore';

// actions
import { integrationsApiResponseSuccess, integrationsApiResponseError } from './actions';

// constants
import { IntegrationsActionTypes } from './constants';


interface IntegrationInt {
    id: number;
    name: string;
    img: string;
    status: number;
    link?: string;
}

interface IntegrationsInt {
    mails: IntegrationInt[];
    messengers: IntegrationInt[];
}

interface IntegrationsData {
    payload: {
        userid: string | number;
        data: IntegrationsInt
    };
    type: string;
}

interface IntegrationInfo {
    category?: string;
    key?: string;
}

interface DisconnectData {
    payload: {
        data: IntegrationInfo;
        client: IntegrationInt
    };
    type: string;
}



function* getIntegrations({ payload: { userid } }: IntegrationsData): SagaIterator {
    try {
        const response = yield call(integrationsApi, { userid });
        yield put(integrationsApiResponseSuccess(IntegrationsActionTypes.GET_INTEGRATIONS, response));
    } catch (error: any) {
        yield put(integrationsApiResponseError(IntegrationsActionTypes.GET_INTEGRATIONS, "Oops!"));
    }
}

function* disconnectIntegrations({ payload: { data, client } }: DisconnectData): SagaIterator {
    try {
        const response = yield call(disconnectApi, { data, client });
        yield put(integrationsApiResponseSuccess(IntegrationsActionTypes.DISCONNECT_INTEGRATION, response.data));
    } catch (error: any) {
        yield put(integrationsApiResponseError(IntegrationsActionTypes.DISCONNECT_INTEGRATION, "Oops!"));
    }
}

function* connectIntegrations({ payload: { data, client } }: DisconnectData): SagaIterator {
    try {
        const response = yield call(connectApi, { data, client });
        yield put(integrationsApiResponseSuccess(IntegrationsActionTypes.CONNECT_INTEGRATION, response.data));
    } catch (error: any) {
        yield put(integrationsApiResponseError(IntegrationsActionTypes.CONNECT_INTEGRATION, "Oops!"));
    }
}

export function* watchGetIntegrations(): any {
    yield takeEvery(IntegrationsActionTypes.GET_INTEGRATIONS, getIntegrations);
}

export function* watchDisconnectIntegrations(): any {
    yield takeEvery(IntegrationsActionTypes.DISCONNECT_INTEGRATION, disconnectIntegrations);
}

export function* watchConnectIntegrations(): any {
    yield takeEvery(IntegrationsActionTypes.CONNECT_INTEGRATION, connectIntegrations);
}


function* integrationsSaga() {
    yield all([fork(watchGetIntegrations), fork(watchDisconnectIntegrations), fork(watchConnectIntegrations)]);
}

export default integrationsSaga;
