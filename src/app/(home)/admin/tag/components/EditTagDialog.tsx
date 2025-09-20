'use client';
import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import ColorPicker from '@/components/ColorPicker';
import useForm from '@/app/hooks/useForm';
import { useUpdateTag } from '@/app/hooks/api/useTag';
import type { Tag } from '@/app/hooks/api/useTag';
import { defaultTagFormValues, type TagFormValues } from './tagForm';

type EditTagDialogProps = {
    open: boolean;
    tag: Tag | null;
    onClose: () => void;
};

export default function EditTagDialog({ open, tag, onClose }: EditTagDialogProps) {
    const { form, handleChange, reset, setForm } = useForm<TagFormValues>(defaultTagFormValues);
    const [error, setError] = React.useState<string | null>(null);
    const updateMutation = useUpdateTag();

    React.useEffect(() => {
        if (open && tag) {
            setForm({
                name: tag.name,
                color: tag.color ?? defaultTagFormValues.color,
            });
            setError(null);
            return;
        }

        if (!open) {
            reset();
            setError(null);
        }
    }, [open, tag]);

    const handleClose = React.useCallback(
        (_event?: {}, _reason?: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => {
            if (updateMutation.isPending) return;
            onClose();
        },
        [onClose, updateMutation.isPending],
    );

    if (!tag) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (updateMutation.isPending) return;

        const trimmedName = form.name.trim();
        if (!trimmedName) {
            setError('Tag name is required.');
            return;
        }

        setError(null);
        try {
            await updateMutation.mutateAsync({
                id: tag.id,
                payload: {
                    name: trimmedName,
                    color: form.color || defaultTagFormValues.color,
                },
            });
            handleClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update tag.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog component="form" onSubmit={handleSubmit} aria-labelledby="edit-tag-title">
                <ModalClose disabled={updateMutation.isPending} onClick={() => handleClose()} />
                <DialogTitle id="edit-tag-title">Edit Tag</DialogTitle>
                <DialogContent>Update the selected tag.</DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <FormControl required>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" value={form.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Color</FormLabel>
                        <ColorPicker
                            name="color"
                            value={form.color}
                            onChange={(value) => setForm((prev) => ({ ...prev, color: value }))}
                        />
                    </FormControl>
                    {error && (
                        <Alert color="danger" variant="soft">
                            {error}
                        </Alert>
                    )}
                    <DialogActions>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => handleClose()}
                            disabled={updateMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" loading={updateMutation.isPending}>
                            Save changes
                        </Button>
                    </DialogActions>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
