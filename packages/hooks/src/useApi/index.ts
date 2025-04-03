import axiosBase from 'axios';

const baseUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.WEB_CONTAINER_PORT}`;

const containerApi = axiosBase.create({
    baseURL: `${baseUrl}/api`,
    timeout: 4000,
});

const externalApi = axiosBase.create({
    baseURL: `${baseUrl}/external`,
    timeout: 4000,
});

function useApi() {
    return { containerApi, externalApi, baseUrl };
}

export default useApi;
