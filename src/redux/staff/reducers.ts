// constants
import { StaffActionTypes } from './constants';

const INIT_STATE = {
    staff: null,
    loading: false,
    error: '',
    success: '',
};

interface StaffData {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
}


interface StaffActionType {
    type:
    | StaffActionTypes.API_RESPONSE_SUCCESS
    | StaffActionTypes.API_RESPONSE_ERROR
    | StaffActionTypes.GET_STAFF
    | StaffActionTypes.ADD_STAFF
    | StaffActionTypes.REMOVE_STAFF;
    payload: {
        actionType?: string;
        data?: StaffData[];
        error?: string;
    };
}

interface State {
    staff?: StaffData[] | null;
    loading?: boolean;
    value?: boolean;
    error?: string;
}

const Staff = (state: State = INIT_STATE, action: StaffActionType): any => {
    switch (action.type) {
        case StaffActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case StaffActionTypes.GET_STAFF: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        staff: action.payload.data,
                        loading: false,
                    };
                }
                case StaffActionTypes.ADD_STAFF: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        staff: action.payload.data,
                    };
                }
                case StaffActionTypes.REMOVE_STAFF: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        staff: action.payload.data,
                    };
                }
                default:
                    return { ...state };
            }

        case StaffActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case StaffActionTypes.GET_STAFF:
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                case StaffActionTypes.ADD_STAFF:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case StaffActionTypes.REMOVE_STAFF:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };
            }

        case StaffActionTypes.GET_STAFF: {
            return { ...state, loading: true };
        }
        default:
            return { ...state };
    }
};

export default Staff;
