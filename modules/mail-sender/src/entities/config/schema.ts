import { IYup, yup } from '@packages/utils';

const configSchema = yup.object({
    password: yup.string().required(),
    username: yup.string().required(),
    port: yup.number().required().positive().integer(),
    host: yup.string().ipv4().required(),
});

type ConfigType = IYup.InferType<typeof configSchema>;

export { configSchema };
export type { ConfigType };
