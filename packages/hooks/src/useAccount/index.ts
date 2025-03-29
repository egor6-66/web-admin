import { useNavigate } from 'react-router-dom';

function useAccount() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/config-editor');
    };

    return { login };
}

export default useAccount;
