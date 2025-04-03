import { addMethod, InferType, number, NumberSchema, object, Schema, string, StringSchema } from 'yup';

import validators from './validators';

Object.entries(validators).forEach(([key, val]) => {
    addMethod(string, key, val);
});

export type { InferType, NumberSchema, Schema, StringSchema };

interface IString extends StringSchema<string, any, undefined, ''> {
    ipv4: (msg?: string) => IString;
}

interface IYup {
    string: () => IString;
    number: any;
    object: any;
}

const yup = {
    string,
    number,
    object,
} as IYup;

export default yup;
