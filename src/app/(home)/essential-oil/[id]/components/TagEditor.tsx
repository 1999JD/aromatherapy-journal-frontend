'use client'
import type { Tag } from '@/app/hooks/api/useTag';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Box from '@mui/joy/Box';

export default function TagEditor({
    tags = [],
    editable = false,
}: {
    tags: Tag[];
    editable?: boolean;
}) {
    return (
        <Box>
            <Box sx={{ marginBottom: 1 }}>
                {tags.map((tag) => (
                    <Chip
                        key={`${tag.id}-${tag.name}`}
                        endDecorator={
                            editable && <ChipDelete onDelete={() => alert('Delete')} />
                        }
                        sx={(theme) => ({
                            margin: 0.5,
                            backgroundColor: tag.color || theme.vars.palette.primary.softBg,
                        })}
                    >
                        {tag.name}
                    </Chip>
                ))}
            </Box>
        </Box>
    );
}
