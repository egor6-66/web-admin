import { api } from '@packages/utils';
import { useQuery } from '@tanstack/react-query';

const staleMin = 5;

function useModules() {
    const { containerApi } = api;

    const getAvailableModules = () => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            queryFn: async () => {
                const { data } = await containerApi.get(`/available_modules`);

                return data;
            },
        });
    };

    return { getAvailableModules };
}

export default useModules;
