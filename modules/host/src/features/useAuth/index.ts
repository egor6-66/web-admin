import { useNavigate } from 'react-router-dom';

import { IBaseFields } from './interfaces';

function useAuth() {
    const navigate = useNavigate();

    const login = (data: IBaseFields) => {
        navigate('/workspace');
    };

    const logout = () => {
        navigate('/config-editor');
    };

    return { login, logout };
}

export default useAuth;
