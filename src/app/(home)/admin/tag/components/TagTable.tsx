'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import CircularProgress from '@mui/joy/CircularProgress';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import { Pagination } from '@mui/material';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { ListFilter as FilterAltIcon, Plus, Search as SearchIcon } from 'lucide-react';
import ColorPicker from '@/components/ColorPicker';
import { useGetTagList } from '@/app/hooks/api/useTag';
import type { Tag } from '@/app/hooks/api/useTag';
import CreateTagDialog from './CreateTagDialog';
import DeleteTagDialog from './DeleteTagDialog';
import EditTagDialog from './EditTagDialog';

const pageSizeOptions = [5, 10, 20, 50];


export default function TagTable() {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [createOpen, setCreateOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [activeTag, setActiveTag] = React.useState<Tag | null>(null);

    const queryParams = React.useMemo(() => ({ pageNumber: page, pageSize }), [page, pageSize]);
    const { data, isLoading, isFetching } = useGetTagList(queryParams);

    const rows = React.useMemo(() => data?.items ?? [], [data?.items]);
    const totalCount = data?.totalCount ?? 0;
    const totalPages = data?.totalPages ?? 0;


    React.useEffect(() => {
        setSelected((ids) => ids.filter((id) => rows.some((row) => String(row.id) === id)));
    }, [rows]);

    React.useEffect(() => {
        if (totalPages > 0 && page > totalPages) {
            setPage(totalPages);
        }
        if (totalPages === 0 && page !== 1 && !isLoading) {
            setPage(1);
        }
    }, [page, totalPages, isLoading]);

    const handleSelectAll = (checked: boolean) => {
        setSelected(checked ? rows.map((row) => String(row.id)) : []);
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        setSelected((ids) =>
            checked ? ids.concat(String(id)) : ids.filter((itemId) => itemId !== String(id))
        );
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        if (totalPages === 0) {
            return;
        }
        setPage(value);
    };

    const handlePageSizeChange = (
        _: React.SyntheticEvent | null,
        value: number | null,
    ) => {
        if (value) {
            setPageSize(value);
            setPage(1);
        }
    };

    const startIndex = rows.length ? (page - 1) * pageSize + 1 : 0;
    const endIndex = rows.length ? startIndex + rows.length - 1 : 0;

    const openCreateModal = () => {
        setCreateOpen(true);
    };

    const closeCreateModal = () => {
        setCreateOpen(false);
    };

    const openEditModal = (tag: Tag) => {
        setActiveTag(tag);
        setEditOpen(true);
    };

    const closeEditModal = () => {
        setEditOpen(false);
        setActiveTag(null);
    };

    const openDeleteModal = (tag: Tag) => {
        setActiveTag(tag);
        setDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteOpen(false);
        setActiveTag(null);
    };

    const handleDeleteSuccess = (tagId: number) => {
        setSelected((ids) => ids.filter((id) => id !== String(tagId)));
    };

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                <IconButton size="sm" variant="outlined" color="neutral">
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

            <Box
                sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <Typography level="title-lg">Global Tags</Typography>
                <Button
                    size="sm"
                    startDecorator={<Plus size={16} />}
                    onClick={openCreateModal}
                >
                    New Tag
                </Button>
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
                                    onChange={(event) => handleSelectAll(event.target.checked)}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                    disabled={isLoading || rows.length === 0}
                                />
                            </th>
                            <th style={{ width: 120, padding: '12px 6px' }}>Name</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Color</th>
                            <th style={{ maxWidth: 140, width: 140, padding: '12px 6px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            py: 4,
                                        }}
                                    >
                                        <CircularProgress size="sm" />
                                    </Box>
                                </td>
                            </tr>
                        ) : rows.length > 0 ? (
                            rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="text-center">
                                        <Checkbox
                                            size="sm"
                                            checked={selected.includes(String(row.id))}
                                            color={
                                                selected.includes(String(row.id)) ? 'primary' : undefined
                                            }
                                            onChange={(event) =>
                                                handleRowSelect(row.id, event.target.checked)
                                            }
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 1,
                                                alignItems: 'center',
                                                width: '100%',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                color="primary"
                                                onClick={() => openEditModal(row)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="plain"
                                                color="danger"
                                                onClick={() => openDeleteModal(row)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            py: 4,
                                        }}
                                    >
                                        <Typography level="body-sm" color="neutral">
                                            No tags found.
                                        </Typography>
                                    </Box>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1.5,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                    alignItems: 'center',
                }}
            >
                <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                    {totalCount > 0
                        ? `Showing ${startIndex}-${endIndex} of ${totalCount}`
                        : 'No data'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography level="body-sm">Rows per page:</Typography>
                    <Select
                        size="sm"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        disabled={isLoading}
                    >
                        {pageSizeOptions.map((option) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                </Box>
                <Box sx={{ flex: 1 }} />
                {totalPages > 0 && (
                    <div>
                        <Pagination variant="outlined" count={Math.max(totalPages, 1)} page={totalPages > 0 ? page : 1} onChange={handlePageChange} disabled={totalPages === 0} />
                    </div>
                )}
                {isFetching && !isLoading && <CircularProgress size="sm" sx={{ ml: 1 }} />}
            </Box>

            <CreateTagDialog open={createOpen} onClose={closeCreateModal} />
            <EditTagDialog open={editOpen} tag={activeTag} onClose={closeEditModal} />
            <DeleteTagDialog
                open={deleteOpen}
                tag={activeTag}
                onClose={closeDeleteModal}
                onDeleted={handleDeleteSuccess}
            />
        </React.Fragment>
    );
}





