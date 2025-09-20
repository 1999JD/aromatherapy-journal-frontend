import { Box, Typography } from "@mui/joy";
import TagTable from "./components/TagTable";

export default function AdminTag() {
    return (
        <div className="container mx-auto py-8 px-4 ">
            <Typography level="h1" sx={{ marginBottom: '1rem' }} >Manage Global Tags</Typography>
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
                    <TagTable />
                </Box>
            </Box>
        </div >
    );
}
