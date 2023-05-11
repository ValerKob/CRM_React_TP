import { APICore } from './apiCore';
import config from '../../config';
const api = new APICore();

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
// profile
function getProfile() {
    const baseUrl = `${config.API}/api/auth/me`;
    return api.fetchAuthentificated(`${baseUrl}`, {}, 'POST');
}

function updateProfile(params: { data: UserProfile }) {
    const baseUrl = `${config.API}/api/user/updateProfile`;
    return api.fetchAuthentificated(`${baseUrl}`, params.data, "PUT");
}

function updateProfilePassword(params: { data: ProfilePassData }) {
    const baseUrl = `${config.API}/api/user/updatePassword`;
    return api.fetchAuthentificated(`${baseUrl}`, { last_password: params.data.oldPassword, password: params.data.password, password_confirmation: params.data.confirm }, "PUT");
}

export { getProfile, updateProfile, updateProfilePassword };
