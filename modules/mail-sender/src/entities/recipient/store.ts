import useZustand, { StoreTypes } from 'react-use-zustand';

import { RecipientType } from './schema';

interface IStore {
    recipients: Array<RecipientType>;
}

const recipientStore = useZustand<IStore>({
    keys: ['recipients'],
    default: {
        recipients: [],
    },
});

export type RecipientStoreTypes = StoreTypes<typeof recipientStore.use>;
export default recipientStore;
