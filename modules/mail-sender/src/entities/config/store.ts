import useZustand, { StoreTypes } from 'react-use-zustand';

import { ConfigType } from './schema';

interface IStore {
    configs: Array<ConfigType>;
}

const configStore = useZustand<IStore>({
    keys: ['configs'],
    default: {
        configs: [],
    },
});

export type ConfigStoreTypes = StoreTypes<typeof configStore.use>;
export default configStore;
