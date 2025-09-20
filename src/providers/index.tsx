'use client'
import {
    createTheme,
    ThemeProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import NProgressContext from './NProgressContext'
import QueryClientPlugin from './QueryClientOlugin';
import { AuthProvider } from './AuthProvider';
import CssBaseline from '@mui/material/CssBaseline';


const materialTheme = createTheme();

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientPlugin>
            <AuthProvider>
                <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
                    <JoyCssVarsProvider disableTransitionOnChange>
                        <CssBaseline enableColorScheme />
                        <NProgressContext >
                            {children}
                        </NProgressContext>
                    </JoyCssVarsProvider>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientPlugin >

    );
}