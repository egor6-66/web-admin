import { useLocation, useNavigate } from 'react-router-dom';

import { Params } from './interfaces';

function useRouting() {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateWithParam = (path: string, key: Params, value: string) => {
        navigate(`${path}${key}/${value}`);
    };

    const getParams = (): Record<Params, string> => {
        const params: Record<Params, string> = {
            module: '',
        };

        const pathArr = location.pathname.split('/') as Array<Params>;

        return pathArr.reduce((acc, segment, index) => {
            if (segment in params) {
                params[segment] = pathArr[index + 1];
            }

            return params;
        }, params);
    };

    const getSegment = (index: number) => {
        return location.pathname.split('/')[index];
    };

    return { navigate, navigateWithParam, location, getParams, getSegment };
}

export default useRouting;
