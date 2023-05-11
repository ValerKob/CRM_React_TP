// constants
import { IntegrationsActionTypes } from './constants';

export interface IntegrationsActionType {
    type:
    | IntegrationsActionTypes.API_RESPONSE_SUCCESS
    | IntegrationsActionTypes.API_RESPONSE_ERROR
    | IntegrationsActionTypes.GET_INTEGRATIONS
    | IntegrationsActionTypes.CONNECT_INTEGRATION
    | IntegrationsActionTypes.DISCONNECT_INTEGRATION;
    payload: {} | string;
}

interface IntegrationInt {
    id: number;
    name: string;
    img: string;
    status: number;
    link?: string;
}

interface IntegrationInfo {
    category?: string;
    key?: string;
}

interface IntegrationsInt {
    mails: IntegrationInt[];
    messengers: IntegrationInt[];
}

// common success
export const integrationsApiResponseSuccess = (actionType: string, data: IntegrationsInt): IntegrationsActionType => ({
    type: IntegrationsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const integrationsApiResponseError = (actionType: string, error: string): IntegrationsActionType => ({
    type: IntegrationsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getIntegrations = (userid: string | number): IntegrationsActionType => ({
    type: IntegrationsActionTypes.GET_INTEGRATIONS,
    payload: { userid },
});

export const disconnectIntegration = (client: IntegrationInt, data: IntegrationInfo): IntegrationsActionType => ({
    type: IntegrationsActionTypes.DISCONNECT_INTEGRATION,
    payload: { client, data },
});

export const connectIntegration = (client: IntegrationInt, data: IntegrationInfo): IntegrationsActionType => ({
    type: IntegrationsActionTypes.CONNECT_INTEGRATION,
    payload: { client, data },
});
