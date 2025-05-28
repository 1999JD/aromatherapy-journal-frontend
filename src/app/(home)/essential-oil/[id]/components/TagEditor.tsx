'use client'
import { useGetEssentialOilList } from '@/app/hooks/api/useEssentialOil'
import { TagVO, useGetTagList } from '@/app/hooks/api/useTag'
import { Box, Button, Chip, FormControl, FormHelperText, FormLabel, IconButton, Input, Typography } from "@mui/joy";
import ChipDelete from '@mui/joy/ChipDelete';


import { Search, Plus } from 'lucide-react';


function AddForm() {
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


export default function TagEditor({
    tags = []
}: {
    tags: TagVO[]
}) {

    return (
        <Box >
            <Box sx={{ marginBottom: 1 }} >
                {tags.map((tag) =>
                    <Chip
                        key={tag.name}
                        endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
                        sx={(theme) => ({
                            margin: 0.5,
                            backgroundColor: tag.color || theme.vars.palette.primary.softBg
                        })}
                    >
                        {tag.name}
                    </Chip>
                )}
            </Box>
            <AddForm />
        </Box >
    )
}