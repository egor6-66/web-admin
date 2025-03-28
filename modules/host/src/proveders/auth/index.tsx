import { PropsWithChildren } from 'react';

const AuthProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return children;
};

export default AuthProvider;
