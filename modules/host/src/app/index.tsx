import Pages from '../pages';
import { AuthProvider, InitProvider, QueryProvider, RouterProvider } from '../proveders';

const App = () => {
    return (
        <InitProvider>
            <QueryProvider>
                <RouterProvider>
                    <AuthProvider>
                        <Pages />
                    </AuthProvider>
                </RouterProvider>
            </QueryProvider>
        </InitProvider>
    );
};

export default App;
