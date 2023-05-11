// constants
import { ProfileActionTypes } from './constants';

export interface ProfileActionType {
    type:
    | ProfileActionTypes.API_RESPONSE_SUCCESS
    | ProfileActionTypes.API_RESPONSE_ERROR
    | ProfileActionTypes.GET_PROFILE
    | ProfileActionTypes.UPDATE_PROFILE
    | ProfileActionTypes.RESET_PROFILE_MESSAGES
    | ProfileActionTypes.UPDATE_PROFILE_PASSWORD
    | ProfileActionTypes.RESET_PROFILE;
    payload: {} | string;
}

interface ProfileData {
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

// common success
export const profileApiResponseSuccess = (actionType: string, data: ProfileData): ProfileActionType => ({
    type: ProfileActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const profileApiResponseError = (actionType: string, error: string): ProfileActionType => ({
    type: ProfileActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProfile = (): ProfileActionType => ({
    type: ProfileActionTypes.GET_PROFILE,
    payload: {},
});

export const updateProfile = (data: ProfileData): ProfileActionType => ({
    type: ProfileActionTypes.UPDATE_PROFILE,
    payload: { data },
});

export const updateProfilePassword = (data: ProfilePassData): ProfileActionType => ({
    type: ProfileActionTypes.UPDATE_PROFILE_PASSWORD,
    payload: { data },
});

export const resetProfileMessages = (): ProfileActionType => ({
    type: ProfileActionTypes.RESET_PROFILE_MESSAGES,
    payload: {},
});

export const resetProfile = (): ProfileActionType => ({
    type: ProfileActionTypes.RESET_PROFILE,
    payload: {},
});
