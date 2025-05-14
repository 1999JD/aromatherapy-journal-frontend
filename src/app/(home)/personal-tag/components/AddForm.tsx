'use client'
import { Box, Button, Chip, FormControl, FormHelperText, FormLabel, IconButton, Input, Typography } from "@mui/joy";
import { Search, Plus } from 'lucide-react';


export default function AddForm() {

    return (
        <form onSubmit={() => { }} id="demo">
            <FormControl>
                <Input
                    sx={{
                        '--Input-decoratorChildHeight': '45px',
                        width: '360px'
                    }}
                    placeholder="Tag Name"
                    required
                    endDecorator={
                        <Button
                            variant="solid"
                            color="primary"
                            type="submit"
                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            startDecorator={<Plus />}
                        >
                            Add New Tag
                        </Button>
                    }
                />
            </FormControl>
        </form>)
}