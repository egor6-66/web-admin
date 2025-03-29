import { useNavigate } from 'react-router-dom';

import { IBaseFields } from './interfaces';

function useAuth() {
    const navigate = useNavigate();

    const login = (data: IBaseFields) => {
        navigate('/workspace');
    };

    const logout = () => {
        navigate('/auth');
    };

    return { login, logout };
}

export default useAuth;
