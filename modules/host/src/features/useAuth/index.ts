import { useNavigate } from 'react-router-dom';

import { IBaseFields } from './interfaces';

function useAuth() {
    const navigate = useNavigate();

    const login = async (data: IBaseFields) => {
        if (data.login === 'ADMIN' && data.pass === '12345') {
            navigate('/workspace');
        } else {
            throw Error('неверный логин или пароль');
        }
    };

    const logout = () => {
        navigate('/config-editor');
    };

    return { login, logout };
}

export default useAuth;
