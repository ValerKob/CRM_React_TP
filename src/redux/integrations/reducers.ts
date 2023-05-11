// constants
import { IntegrationsActionTypes } from './constants';

const INIT_STATE = {
    mails: null,
    messengers: null,
    loading: false,
    error: '',
    success: '',
};

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

interface IntegrationsActionType {
    type:
    | IntegrationsActionTypes.API_RESPONSE_SUCCESS
    | IntegrationsActionTypes.API_RESPONSE_ERROR
    | IntegrationsActionTypes.GET_INTEGRATIONS
    | IntegrationsActionTypes.CONNECT_INTEGRATION
    | IntegrationsActionTypes.DISCONNECT_INTEGRATION;
    payload: {
        actionType?: string;
        data?: IntegrationsInt;
        error?: string;
    };
}

interface State {
    mails?: IntegrationInt[] | null;
    messengers?: IntegrationInt[] | null;
    loading?: boolean;
    error?: string;
    success?: string;
}

const Integrations = (state: State = INIT_STATE, action: IntegrationsActionType): any => {
    switch (action.type) {
        case IntegrationsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case IntegrationsActionTypes.GET_INTEGRATIONS: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        mails: action.payload.data?.mails,
                        messengers: action.payload.data?.messengers,
                        loading: false,
                    };
                }
                case IntegrationsActionTypes.CONNECT_INTEGRATION: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        mails: action.payload.data?.mails,
                        messengers: action.payload.data?.messengers,
                        loading: false,
                    };
                }
                case IntegrationsActionTypes.DISCONNECT_INTEGRATION: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        mails: action.payload.data?.mails,
                        messengers: action.payload.data?.messengers,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }

        case IntegrationsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case IntegrationsActionTypes.GET_INTEGRATIONS:
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                case IntegrationsActionTypes.CONNECT_INTEGRATION:
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                case IntegrationsActionTypes.DISCONNECT_INTEGRATION:
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                default:
                    return { ...state };
            }

        case IntegrationsActionTypes.GET_INTEGRATIONS:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Integrations;
