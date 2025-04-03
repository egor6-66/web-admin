import { useApi } from '@packages/hooks';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query/build/modern/index';

function useSender() {
    const { externalApi } = useApi();

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
