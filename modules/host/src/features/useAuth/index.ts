import { useRouting } from '@packages/hooks';

import { IBaseFields } from './interfaces';

function useAuth() {
    const { navigate } = useRouting();

    const login = async (data: IBaseFields) => {
        if (data.login === 'ADMIN' && data.pass === '12345') {
            navigate('/workspace');
        } else {
            throw Error('неверный логин или пароль');
        }
    };

    const logout = () => {
        navigate('/auth');
    };

    return { login, logout };
}

export default useAuth;
