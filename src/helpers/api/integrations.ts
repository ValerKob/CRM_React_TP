import { APICore } from './apiCore';
import config from '../../config';
const api = new APICore();
interface IntegrationInt {
    link?: string;
    id: number;
    name: string;
    img: string;
    status: number;
}
interface IntegrationInfo {
    category?: string;
    key?: string;
}
// integrations
function getIntegrations(params: { userid: string | number }) {
    const baseUrl = `${config.API}/api/integrations`;
    return api.fetchAuthenticatedGet(`${baseUrl}`);
}

function disconnectIntegration(params: { client: IntegrationInt, data: IntegrationInfo }) {
    const baseUrl = `/settings/disconnect/`;
    return api.create(`${baseUrl}`, params);
}

function connectIntegration(params: { client: IntegrationInt, data: IntegrationInfo }) {
    const baseUrl = `/settings/connect/`;
    return api.create(`${baseUrl}`, params);
}

export { getIntegrations, disconnectIntegration, connectIntegration };
