import { CssVarsProvider } from '@mui/joy/styles';
import NProgressContext from './NProgressContext'
import QueryClientPlugin from './QueryClientOlugin';
import { AuthProvider } from './AuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientPlugin>
            <AuthProvider>
                <CssVarsProvider disableTransitionOnChange>
                    <NProgressContext >
                        {children}
                    </NProgressContext>
                </CssVarsProvider>
            </AuthProvider>
        </QueryClientPlugin>

    );
}