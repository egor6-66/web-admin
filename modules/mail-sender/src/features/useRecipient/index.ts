import { api } from '@packages/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

function useRecipient() {
    const { externalApi } = api;

    const add = () => {
        return useMutation({
            mutationFn: async (data: { email: string }) => {
                await externalApi.put(`/recipient`, data);

                return {};
            },
        });
    };

    const get = (id: string) => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * 5,
            queryFn: async () => {
                const { data } = await externalApi.get(`/recipient/${id}`);

                return data;
            },
        });
    };

    const edit = () => {
        return useMutation({
            mutationFn: async (id: string) => {
                await externalApi.put(`/recipient/${id}`);

                return {};
            },
        });
    };

    const remove = () => {
        return useMutation({
            mutationFn: async (id: string) => {
                await externalApi.delete(`/recipient/${id}`);

                return {};
            },
        });
    };

    return { add, get, edit, remove };
}

export default useRecipient;
