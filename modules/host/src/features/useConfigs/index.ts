import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Variants } from './interfaces';
const staleMin = 5;

function useConfigs() {
    console.log(window.location);

    const getConfig = (variant: Variants) => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            queryFn: async () => {
                const { data } = await axios.get(`${window.location.hostname}/config`, {
                    params: {
                        variant,
                        current: '1.0.0',
                    },
                });

                return data;
            },
        });
    };

    return { getConfig };
}

export default useConfigs;
