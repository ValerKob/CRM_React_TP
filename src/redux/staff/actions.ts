// constants
import { StaffActionTypes } from './constants';

export interface StaffActionType {
    type:
    | StaffActionTypes.API_RESPONSE_SUCCESS
    | StaffActionTypes.API_RESPONSE_ERROR
    | StaffActionTypes.GET_STAFF
    | StaffActionTypes.ADD_STAFF
    | StaffActionTypes.REMOVE_STAFF;
    payload: {} | string;
}

interface StaffData {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
}

// common success
export const staffApiResponseSuccess = (actionType: string, data: StaffData): StaffActionType => ({
    type: StaffActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const staffApiResponseError = (actionType: string, error: string): StaffActionType => ({
    type: StaffActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getStaff = (): StaffActionType => ({
    type: StaffActionTypes.GET_STAFF,
    payload: {},
});

export const addStaff = (data: StaffData): StaffActionType => ({
    type: StaffActionTypes.ADD_STAFF,
    payload: { data },
});

export const removeStaff = (data: StaffData): StaffActionType => ({
    type: StaffActionTypes.REMOVE_STAFF,
    payload: { data },
});