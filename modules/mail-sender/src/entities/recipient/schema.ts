import { IYup, yup } from '@packages/utils';

const recipientSchema = yup.object({
    username: yup.string().required(),
    mail: yup.string().email().required(),
});

type RecipientType = IYup.InferType<typeof recipientSchema>;

export { recipientSchema };
export type { RecipientType };
