import { useNavigate } from 'react-router-dom';

import { IBaseFields } from './interfaces';

function useAuth() {
    const navigate = useNavigate();

    const login = (data: IBaseFields) => {
        navigate('/workspace');
    };

    return { login };
}

export default useAuth;
