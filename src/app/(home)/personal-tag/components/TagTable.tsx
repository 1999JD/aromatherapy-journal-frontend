'use client'
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import {
    Ellipsis as MoreHorizRoundedIcon,
    Check as CheckRoundedIcon,
    X as BlockIcon,
    Search as SearchIcon,
    RotateCw as AutorenewRoundedIcon,
    ArrowRight as KeyboardArrowRightIcon,
    ArrowLeft as KeyboardArrowLeftIcon,
    ListFilter as FilterAltIcon,
    ChevronDown as ArrowDropDownIcon
} from 'lucide-react'
import ColorPicker from '@/components/ColorPicker';

import { useGetTagList } from '@/app/hooks/api/useTag';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function TagTable() {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const { data: rows = [] } = useGetTagList()




    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                >
                    <FilterAltIcon />
                </IconButton>

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
                            <th style={{ width: 40, padding: '12px 6px', textAlign: 'center' }} >
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows?.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked ? rows.map((row) => row.id) : [],
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
                            <th style={{ width: 120, padding: '12px 6px' }}>
                                Name
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Color</th>
                            <th style={{ maxWidth: 120, width: 140, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...rows].map((row) => (
                            <tr key={row.id}>
                                <td className="text-center" >
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(row.id)}
                                        color={selected.includes(row.id) ? 'primary' : undefined}
                                        onChange={(event) => {
                                            setSelected((ids) =>
                                                event.target.checked
                                                    ? ids.concat(row.id)
                                                    : ids.filter((itemId) => itemId !== row.id),
                                            );
                                        }}
                                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                    />
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.name}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">
                                        <ColorPicker value={row.color} readonly={true} />
                                    </Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                                        <Button variant="plain" color="primary" >Edit</Button>
                                        <Button variant="plain" color="danger">Delete</Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={Number(page) ? 'outlined' : 'plain'}
                        color="neutral"
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment >
    );
}