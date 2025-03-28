import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryProvider = (props: PropsWithChildren) => {
    const { children } = props;

    const queryClientConfig = new QueryClient({});

    return <QueryClientProvider client={queryClientConfig}>{children}</QueryClientProvider>;
};

export default QueryProvider;
