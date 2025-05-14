import ItemCard from "./components/ItemCard";
import { Box, IconButton, Input, Typography } from "@mui/joy";
import { Search } from 'lucide-react';


export default function EssentialOilList() {
    return (
        <div className="container py-8 px-4 ">
            <Typography level="h1" className="mb-2" >Essential Oils</Typography>
            <Input
                size="sm"
                variant="outlined"
                placeholder="Search keywords..."
                startDecorator={<Search />}
                sx={{
                    alignSelf: 'center',
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    marginBottom: '1rem',
                    width: '360px'
                }}
            />

            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

                    <Box sx={{ gridColumn: 'span 4' }}>
                        <ItemCard />
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }}>
                        <ItemCard />
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }}>
                        <ItemCard />
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }}>
                        <ItemCard />
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }}>
                        <ItemCard />
                    </Box>
                </Box>

            </main>

        </div>
    );
}
