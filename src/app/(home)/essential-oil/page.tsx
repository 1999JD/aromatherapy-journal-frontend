import { Box, Button, Input, Stack, Typography } from "@mui/joy";
import { Search } from 'lucide-react';
import RenderList from "./components/RenderLIst";
import FormControl from '@mui/joy/FormControl';
import SelectMultipleAppearance from "./components/SelectTags";
export default function EssentialOilList() {
    return (
        <div className="container mx-auto py-8 px-4 ">
            <Typography level="h1" sx={{ marginBottom: '1rem' }} >Essential Oils</Typography>
            <Box sx={{ marginBottom: 2 }} >
                <form action="">
                    <Stack spacing={2} direction={'row'} alignItems={'center'} >
                        <FormControl>
                            <Input
                                variant="outlined"
                                placeholder="Search keywords..."
                                startDecorator={<Search />}
                                sx={{
                                    alignSelf: 'center',
                                    display: {
                                        xs: 'none',
                                        sm: 'flex',
                                    },
                                    width: '360px'
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <SelectMultipleAppearance />
                        </FormControl>
                        <Button>送出</Button>
                    </Stack>
                </form>
            </Box>
            <RenderList />


        </div >
    );
}
