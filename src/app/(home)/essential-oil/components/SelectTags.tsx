'use client'
import * as React from 'react';
import { X as Close } from 'lucide-react'
import { Autocomplete, Box, Chip } from '@mui/joy';
import { useGetTagList } from '@/app/hooks/api/useTags';
import './index.css'

export default function SelectMultipleAppearance() {
    const { data: option } = useGetTagList()


    return (
        <Autocomplete
            multiple
            id="tags-default"
            placeholder="Select tags"
            className={'select-tags'}
            options={option || []}
            getOptionLabel={(option) => option.name}
            renderTags={(tags, getTagProps) =>
                tags.map((item, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        variant="solid"
                        color="primary"
                        endDecorator={<Close className="w-4" />}
                        sx={{
                            backgroundColor: item.color,
                            color: 'black'
                        }}
                        key={item.name}
                    >
                        {item.name}
                    </Chip>
                ))}
        />

    );
}