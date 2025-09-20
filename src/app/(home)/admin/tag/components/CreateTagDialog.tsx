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
import { useCreateTag } from '@/app/hooks/api/useTag';
import { defaultTagFormValues, type TagFormValues } from './tagForm';

type CreateTagDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function CreateTagDialog({ open, onClose }: CreateTagDialogProps) {
    const { form, handleChange, reset, setForm } = useForm<TagFormValues>(defaultTagFormValues);
    const [error, setError] = React.useState<string | null>(null);
    const createMutation = useCreateTag();

    React.useEffect(() => {
        if (!open) {
            reset();
            setError(null);
        }
    }, [open, reset]);

    const handleClose = React.useCallback(
        (_event: {}, _reason?: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => {
            if (createMutation.isPending) return;
            onClose();
        },
        [createMutation.isPending, onClose],
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (createMutation.isPending) return;

        const trimmedName = form.name.trim();
        if (!trimmedName) {
            setError('Tag name is required.');
            return;
        }

        setError(null);
        try {
            await createMutation.mutateAsync({
                name: trimmedName,
                color: form.color || defaultTagFormValues.color,
            });
            handleClose({}, 'closeClick');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to create tag.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog component="form" onSubmit={handleSubmit} aria-labelledby="create-tag-title">
                <ModalClose disabled={createMutation.isPending} onClick={() => handleClose({}, 'closeClick')} />
                <DialogTitle id="create-tag-title">Create Tag</DialogTitle>
                <DialogContent>Add a new tag to your collection.</DialogContent>
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
                            onClick={() => handleClose({}, 'closeClick')}
                            disabled={createMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" loading={createMutation.isPending}>
                            Create
                        </Button>
                    </DialogActions>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}
