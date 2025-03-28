import { useNavigate } from 'react-router-dom';

function useAccount() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/auth');
    };

    return { login };
}

export default useAccount;
