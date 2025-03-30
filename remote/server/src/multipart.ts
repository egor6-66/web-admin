import Promise from 'bluebird';
import { Form } from 'multiparty';

export function parseRequest(req: any, options?: any) {
    return new Promise((resolve: any, reject: any) => {
        const form = new Form(options);
        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) {
                return reject(err);
            }

            return resolve({ fields, files });
        });
    });
}

export function getFile(body: any, field: any) {
    const bodyFile = body.files[field];
    const value = bodyFile ? bodyFile[0] : null;

    return value || null;
}
