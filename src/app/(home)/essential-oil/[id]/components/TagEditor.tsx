'use client'
import { useGetEssentialOilList } from '@/app/hooks/api/useEssentialOil'
import { TagVO, useGetTagList } from '@/app/hooks/api/useTag'
import { Box, Button, Chip, FormControl, FormHelperText, FormLabel, IconButton, Input, Typography } from "@mui/joy";
import ChipDelete from '@mui/joy/ChipDelete';




export default function TagEditor({
    tags = [],
    editable = false
}: {
    tags: TagVO[]
    editable?: boolean
}) {

    return (
        <Box >
            <Box sx={{ marginBottom: 1 }} >
                {tags.map((tag) =>
                    <Chip
                        key={tag.name}
                        endDecorator={
                            editable &&
                            <ChipDelete onDelete={() => alert('Delete')} />}
                        sx={(theme) => ({
                            margin: 0.5,
                            backgroundColor: tag.color || theme.vars.palette.primary.softBg
                        })}
                    >
                        {tag.name}
                    </Chip>
                )}
            </Box>
        </Box >
    )
}