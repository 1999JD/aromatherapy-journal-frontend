'use client'
import ChipDelete from '@mui/joy/ChipDelete';
export default function ChipDeleteIcon() {

    return (
        <ChipDelete onDelete={() => alert('Delete')} />
    )
}