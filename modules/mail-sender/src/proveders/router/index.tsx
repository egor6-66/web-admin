import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

const RouterProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
