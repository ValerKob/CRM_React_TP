import { APICore } from './apiCore';
import config from '../../config';
const api = new APICore();

interface Staff {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
}
// staff
function getStaff() {
    const baseUrl = `${config.API}/api/employee`;
    return api.fetchAuthenticatedGet(`${baseUrl}`);
}

function addStaff(params: { data: Staff }) {
    const baseUrl = `${config.API}/api/employee`;
    return api.fetchAuthentificated(`${baseUrl}`, {firstName:params.data.name,lastName:params.data.secondName,email:params.data.email,password:'11111111',password_confirmation:'11111111'}, "POST");
}

function removeStaff(params: { data: Staff }) {
    const baseUrl = `${config.API}/api/employee/${params.data.id}`;
    return api.fetchAuthentificated(`${baseUrl}`, {}, "DELETE");
}

export { getStaff, addStaff, removeStaff };
