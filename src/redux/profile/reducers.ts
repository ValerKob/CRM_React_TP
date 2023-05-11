// constants
import { ProfileActionTypes } from './constants';

const INIT_STATE = {
    profile: null,
    loading: false,
    error: '',
    errorPassword: '',
    updating: false,
    updatingPass: false,
    success: false,
    successPassword: false,
};

interface IProfile {
    firstName: string;
    lastName: string;
    email: string;
    post: string;
    birthday: Date;
}

interface ProfileData {
    profile: IProfile,
    success: boolean;
}

interface ProfileActionType {
    type:
    | ProfileActionTypes.API_RESPONSE_SUCCESS
    | ProfileActionTypes.API_RESPONSE_ERROR
    | ProfileActionTypes.GET_PROFILE
    | ProfileActionTypes.UPDATE_PROFILE
    | ProfileActionTypes.RESET_PROFILE_MESSAGES
    | ProfileActionTypes.UPDATE_PROFILE_PASSWORD
    | ProfileActionTypes.RESET_PROFILE;
    payload: {
        actionType?: string;
        data?: ProfileData;
        error?: string;
    };
}

interface State {
    profile?: ProfileData | null;
    loading?: boolean;
    value?: boolean;
    error?: string;
}

const Profile = (state: State = INIT_STATE, action: ProfileActionType): any => {
    switch (action.type) {
        case ProfileActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ProfileActionTypes.GET_PROFILE: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        profile: { ...action.payload.data },
                        loading: false,
                    };
                }
                case ProfileActionTypes.UPDATE_PROFILE: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        profile: { ...action.payload.data?.profile },
                        success: action.payload.data?.success,
                        updating: false
                    };
                }
                case ProfileActionTypes.UPDATE_PROFILE_PASSWORD: {
                    if (state?.error) {
                        state.error = '';
                    }
                    return {
                        ...state,
                        successPassword: action.payload.data?.success,
                        updatingPass: false
                    };
                }
                default:
                    return { ...state };
            }

        case ProfileActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ProfileActionTypes.GET_PROFILE:
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                case ProfileActionTypes.UPDATE_PROFILE:
                    return {
                        ...state,
                        error: action.payload.error,
                        updating: false
                    };
                case ProfileActionTypes.UPDATE_PROFILE_PASSWORD:
                    return {
                        ...state,
                        errorPassword: action.payload.error,
                        updatingPass: false
                    };

                default:
                    return { ...state };
            }

        case ProfileActionTypes.GET_PROFILE:
            return { ...state, loading: true };
        case ProfileActionTypes.UPDATE_PROFILE:
            return { ...state, updating: true };
        case ProfileActionTypes.UPDATE_PROFILE_PASSWORD:
            return { ...state, updatingPass: true };
        case ProfileActionTypes.RESET_PROFILE_MESSAGES:
            return {
                ...state,
                success: false,
                error: '',
                errorPassword: '',
                successPassword: false
            };
        case ProfileActionTypes.RESET_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                error: '',
                errorPassword: '',
                updating: false,
                updatingPass: false,
                success: false,
                successPassword: false,
            };
        default:
            return { ...state };
    }
};

export default Profile;
