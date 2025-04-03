import { yup } from '@packages/utils';

export const configSchema = yup.object({
    password: yup.string().required(),
    username: yup.string().required(),
    port: yup.number().required().positive().integer(),
    host: yup.string().ipv4().required(),
});
