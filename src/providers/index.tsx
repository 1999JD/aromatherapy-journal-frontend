import { CssVarsProvider } from '@mui/joy/styles';
import NProgressContext from './NProgressContext'
import QueryClientPlugin from './QueryClientOlugin';
export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientPlugin>
            <CssVarsProvider disableTransitionOnChange>
                <NProgressContext >
                    {children}
                </NProgressContext>
            </CssVarsProvider>
        </QueryClientPlugin>

    );
}