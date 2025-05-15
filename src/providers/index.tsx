import { CssVarsProvider } from '@mui/joy/styles';
import NProgressContext from './NProgressContext'
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <NProgressContext >
                {children}
            </NProgressContext>
        </CssVarsProvider>

    );
}