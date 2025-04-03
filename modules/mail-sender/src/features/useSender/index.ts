import { api } from '@packages/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

function useSender() {
    const { externalApi } = api;

    const add = () => {
        return useMutation({
            mutationFn: async (config: string) => {
                await externalApi.put(`/mail/sender/configuration`, config);

                return {};
            },
        });
    };

    const get = (id: string) => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * 5,
            queryFn: async () => {
                const { data } = await externalApi.get(`/mail/sender/configuration/${id}`);

                return data;
            },
        });
    };

    const remove = () => {
        return useMutation({
            mutationFn: async (id: string) => {
                await externalApi.delete(`/mail/sender/configuration/${id}`);

                return {};
            },
        });
    };

    return { add, get, remove };
}

export default useSender;
