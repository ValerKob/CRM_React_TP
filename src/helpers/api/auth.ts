import { APICore } from './apiCore';
import config from '../../config';
const api = new APICore();

// account
function login(data: { username: string; password: string }) {
    const baseUrl = `${config.API}/api/auth/login`;
    return api.create(`${baseUrl}`, { email: data.username, password: data.password });
}

function logout() {
    const baseUrl = `${config.API}/api/auth/logout`;
    return api.fetchAuthentificated(`${baseUrl}`, {}, "POST");
}

function forgotPassword(params: { username: string }) {
    const baseUrl = `${config.API}/api/forgot-password`;
    return api.create(`${baseUrl}`, { email: params.username });
}

function resetForgotPassword(params: { password: string, confirm: string, token: string | null, email: string | null }) {
    const baseUrl = `${config.API}/api/reset-password`;
    return api.create(`${baseUrl}`, { email: params.email, password: params.password, password_confirmation: params.confirm, token: params.token });
}

export { login, logout, forgotPassword, resetForgotPassword };
