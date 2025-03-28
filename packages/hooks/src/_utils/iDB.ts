export function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}

export function createStore(dbName: string, storeName: string): UseStore {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);

    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}

export type UseStore = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>;

let defaultGetStoreFunc: UseStore | undefined;

function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }

    return defaultGetStoreFunc;
}

export function get<T = any>(key: IDBValidKey, customStore = defaultGetStore()): Promise<T | undefined> {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}

export function set(key: IDBValidKey, value: any, customStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store) => {
        store.put(value, key);

        return promisifyRequest(store.transaction);
    });
}

export function setMany(entries: [IDBValidKey, any][], customStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));

        return promisifyRequest(store.transaction);
    });
}

export function getMany<T = any>(keys: IDBValidKey[], customStore = defaultGetStore()): Promise<T[]> {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}

export function update<T = any>(key: IDBValidKey, updater: (oldValue: T | undefined) => T, customStore = defaultGetStore()): Promise<void> {
    return customStore(
        'readwrite',
        (store) =>
            // Need to create the promise manually.
            // If I try to chain promises, the transaction closes in browsers
            // that use a promise polyfill (IE10/11).
            new Promise((resolve, reject) => {
                store.get(key).onsuccess = function () {
                    try {
                        store.put(updater(this.result), key);
                        resolve(promisifyRequest(store.transaction));
                    } catch (err) {
                        reject(err);
                    }
                };
            })
    );
}

export function del(key: IDBValidKey, customStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store) => {
        store.delete(key);

        return promisifyRequest(store.transaction);
    });
}

export function delMany(keys: IDBValidKey[], customStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store: IDBObjectStore) => {
        keys.forEach((key: IDBValidKey) => store.delete(key));

        return promisifyRequest(store.transaction);
    });
}

export function clear(customStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store) => {
        store.clear();

        return promisifyRequest(store.transaction);
    });
}

function eachCursor(store: IDBObjectStore, callback: (cursor: IDBCursorWithValue) => void): Promise<void> {
    store.openCursor().onsuccess = function () {
        if (!this.result) return;
        callback(this.result);
        this.result.continue();
    };

    return promisifyRequest(store.transaction);
}

export function keys<KeyType extends IDBValidKey>(customStore = defaultGetStore()): Promise<KeyType[]> {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys() as unknown as IDBRequest<KeyType[]>);
        }

        const items: KeyType[] = [];

        return eachCursor(store, (cursor) => items.push(cursor.key as KeyType)).then(() => items);
    });
}

export function values<T = any>(customStore = defaultGetStore()): Promise<T[]> {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAll) {
            return promisifyRequest(store.getAll() as IDBRequest<T[]>);
        }

        const items: T[] = [];

        return eachCursor(store, (cursor) => items.push(cursor.value as T)).then(() => items);
    });
}

export function entries<KeyType extends IDBValidKey, ValueType = any>(customStore = defaultGetStore()): Promise<[KeyType, ValueType][]> {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        // (although, hopefully we'll get a simpler path some day)
        if (store.getAll && store.getAllKeys) {
            return Promise.all([
                promisifyRequest(store.getAllKeys() as unknown as IDBRequest<KeyType[]>),
                promisifyRequest(store.getAll() as IDBRequest<ValueType[]>),
            ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
        }

        const items: [KeyType, ValueType][] = [];

        return customStore('readonly', (store) => eachCursor(store, (cursor) => items.push([cursor.key as KeyType, cursor.value])).then(() => items));
    });
}
