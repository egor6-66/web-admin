import Pages from '../pages';
import { InitProvider, QueryProvider, RouterProvider } from '../proveders';

const App = () => {
    return (
        <InitProvider>
            <Pages />
        </InitProvider>
    );
};

export const Standalone = () => {
    return (
        <InitProvider>
            <RouterProvider>
                <QueryProvider>
                    <Pages />
                </QueryProvider>
            </RouterProvider>
        </InitProvider>
    );
};

export default App;
