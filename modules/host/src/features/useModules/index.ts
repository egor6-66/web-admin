import { useMutation, useQuery } from '@tanstack/react-query';
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

    const downloadModule = () => {
        return useMutation<any>({
            mutationFn: async (data: any) => {
                for (const [name, value] of data) {
                    console.log(value);
                }

                await axios.post(`https://localhost/api/build`, data);

                return {};
            },
        });
    };

    const getModule = (name?: string) => {
        return useQuery<any>({
            queryKey: ['module', name],
            staleTime: 1000 * 60 * staleMin,
            enabled: !!name,
            queryFn: async () => {
                const { data } = await axios.get(`https://localhost/api/module`, {
                    params: {
                        name,
                    },
                });

                return data;
            },
        });
    };

    return { getAvailableModules, downloadModule, getModule };
}

export default useModules;
