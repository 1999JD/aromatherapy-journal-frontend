import Box from '@mui/joy/Box'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { useState } from 'react'

export default function ColorPicker({
    value,
    onChange,
    label,
    error,
    helperText,
    name,
    readonly
}: {
    value?: string
    onChange?: (value: string) => void
    label?: string
    error?: boolean
    name?: string
    helperText?: string
    readonly?: boolean
}) {


    return (
        readonly ?
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <div className="w-6 h-6"
                    style={{
                        backgroundColor: value,
                    }} >
                </div>
                <p>{value}</p>
            </Box>
            :
            <input
                type="color"
                name={name}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                style={{
                    flexShrink: 0,
                    display: 'block',
                    border: 'none',
                    padding: 0,
                    background: 'none',
                }}
            />
    );
}
