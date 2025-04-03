import axiosBase from 'axios';

export const baseUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.WEB_CONTAINER_PORT}`;

export const containerApi = axiosBase.create({
    baseURL: `${baseUrl}/api`,
    timeout: 4000,
});

export const externalApi = axiosBase.create({
    baseURL: `${baseUrl}/external`,
    timeout: 4000,
});
