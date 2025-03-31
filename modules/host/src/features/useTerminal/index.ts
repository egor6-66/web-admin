import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const staleMin = 5;

function useTerminal() {
    const url = window.location.hostname;

    const sendCommand = () => {
        return useMutation({
            mutationFn: async (command: string) => {
                await axios.post(`https://${url}/api/command`, command);

                return {};
            },
        });
    };

    return { sendCommand };
}

export default useTerminal;
