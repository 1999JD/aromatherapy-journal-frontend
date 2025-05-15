
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import OrderTable from './components/OrderTable';

export default function AdminEssentialOil() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <div className="container py-8 px-4 ">

                <Typography level="h1"  sx={{marginBottom: '1rem'}} >Manage Essential Oils</Typography>

                <Box sx={{ display: 'flex' }}>
                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            gap: 1,
                        }}
                    >
                        <OrderTable />
                    </Box>
                </Box>
            </div>
        </CssVarsProvider>
    );
}