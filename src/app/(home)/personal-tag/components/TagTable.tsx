'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import { Stack } from '@mui/joy';
import {
    Search as SearchIcon,
    ListFilter as FilterAltIcon,
    Tag as TagIcon,
} from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import {
    useGetPersonalTagList,
    useDeletePersonalTag,
    PersonalTag,
} from '@/app/hooks/api/usePersonalTag';

export default function TagTable() {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const { data: rows = [], isLoading } = useGetPersonalTagList();
    const { mutate: deletePersonalTag, isPending: isDeleting } = useDeletePersonalTag();

    const handleDelete = (tag: PersonalTag) => {
        deletePersonalTag(tag.id);
    };

    const isEmpty = !isLoading && rows.length === 0;

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<FilterAltIcon />}
                >
                    Filters
                </Button>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for tag</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                </FormControl>
            </Box>

            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 40, padding: '12px 6px', textAlign: 'center' }}>
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={rows.length > 0 && selected.length === rows.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked
                                                ? rows.map((row) => String(row.id))
                                                : [],
                                        );
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />
                            </th>
                            <th style={{ width: 120, padding: '12px 6px' }}>Name</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Color</th>
                            <th style={{ maxWidth: 120, width: 140, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td className="text-center">
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(String(row.id))}
                                        color={selected.includes(String(row.id)) ? 'primary' : undefined}
                                        onChange={(event) => {
                                            setSelected((ids) =>
                                                event.target.checked
                                                    ? ids.concat(String(row.id))
                                                    : ids.filter((itemId) => itemId !== String(row.id)),
                                            );
                                        }}
                                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                    />
                                </td>
                                <td>
                                    <Typography level="body-sm">{row.name}</Typography>
                                </td>
                                <td>
                                    <ColorPicker value={row.color} readonly />
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                                        <Button variant="plain" color="primary" disabled>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="plain"
                                            color="danger"
                                            onClick={() => handleDelete(row)}
                                            loading={isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEmpty && (
                    <Stack
                        spacing={2}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            py: 6,
                        }}
                    >
                        <div className="w-14">
                            <TagIcon className="w-full h-auto" />
                        </div>
                        <Typography level="h2" sx={{ fontSize: 'xl', fontWeight: 'bold' }}>
                            No Tags
                        </Typography>
                        <Typography level="body-md">
                            You don't have any tags yet.
                        </Typography>
                    </Stack>
                )}
            </Sheet>
        </React.Fragment>
    );
}
