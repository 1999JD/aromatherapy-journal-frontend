import { Box, IconButton, Input, Typography } from "@mui/joy";
import { Search } from 'lucide-react';
import RenderList from "./components/RenderLIst";
export default function EssentialOilList() {
    return (
        <div className="container mx-auto py-8 px-4 ">
            <Typography level="h1" sx={{ marginBottom: '1rem' }} >Essential Oils</Typography>
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
            <RenderList />


        </div>
    );
}
