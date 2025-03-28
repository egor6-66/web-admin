type Storages = 'localStorage' | 'sessionStorage';

export const storageManager = (storage: Storages) => ({
    get(key: string) {
        const data = window[storage].getItem(key);

        return data && JSON.parse(data).value;
    },
    set(key: string, value: unknown) {
        window[storage].setItem(key, JSON.stringify({ value }));
    },

    remove(key: string) {
        window[storage].removeItem(key);
    },
});
