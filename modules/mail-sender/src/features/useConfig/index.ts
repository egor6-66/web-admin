import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const staleMin = 5;

function useConfig() {
    const url = window.location.hostname;

    const getBuilds = (module_name?: string) => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            enabled: !!module_name,
            queryFn: async () => {
                const { data: buildsData } = await axios.get(`https://${url}/api/builds`, {
                    params: {
                        module_name,
                    },
                });

                return buildsData;
            },
        });
    };

    const getConfig = (variant?: string) => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            enabled: !!variant,
            queryFn: async () => {
                const { data } = await axios.get(`https://${url}/api/config`, {
                    params: {
                        variant,
                        current: '1.0.0',
                    },
                });

                return data;
            },
        });
    };

    return { getConfig, getBuilds };
}

export default useConfig;
