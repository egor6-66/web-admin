import { iDB } from '../_utils';

import { IProps } from './interfaces';

function useIndexDB(props?: IProps) {
    const get = async (key?: string) => {
        return iDB.get(props?.key || key);
    };

    const set = async (value: any, key?: string) => {
        return iDB.set(value, props?.key || key);
    };

    return { get, set };
}

export default useIndexDB;
