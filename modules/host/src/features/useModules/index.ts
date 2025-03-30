import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const staleMin = 5;

function useModules() {
    const getAvailableModules = () => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            queryFn: async () => {
                const { data } = await axios.get(`https://localhost/api/available_modules`);

                return data;
            },
        });
    };

    return { getAvailableModules };
}

export default useModules;
