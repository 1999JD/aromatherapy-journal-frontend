'use client';
import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { useDeleteTag } from '@/app/hooks/api/useTag';
import type { Tag } from '@/app/hooks/api/useTag';

type DeleteTagDialogProps = {
    open: boolean;
    tag: Tag | null;
    onClose: () => void;
    onDeleted?: (tagId: number) => void;
};

export default function DeleteTagDialog({ open, tag, onClose, onDeleted }: DeleteTagDialogProps) {
    const [error, setError] = React.useState<string | null>(null);
    const deleteMutation = useDeleteTag();

    React.useEffect(() => {
        if (!open) {
            setError(null);
        }
    }, [open]);

    const handleClose = React.useCallback(
        (_event?: {}, _reason?: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => {
            if (deleteMutation.isPending) return;
            onClose();
        },
        [deleteMutation.isPending, onClose],
    );

    const handleDelete = async () => {
        if (!tag || deleteMutation.isPending) return;

        setError(null);
        try {
            await deleteMutation.mutateAsync(tag.id);
            onDeleted?.(tag.id);
            handleClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete tag.');
        }
    };

    if (!tag) {
        return null;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog aria-labelledby="delete-tag-title">
                <ModalClose disabled={deleteMutation.isPending} onClick={() => handleClose()} />
                <DialogTitle id="delete-tag-title">Delete Tag</DialogTitle>
                <DialogContent>{`Are you sure you want to delete "${tag.name}"?`}</DialogContent>
                {error && (
                    <Alert color="danger" variant="soft" sx={{ mt: 1 }}>
                        {error}
                    </Alert>
                )}
                <DialogActions>
                    <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => handleClose()}
                        disabled={deleteMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button color="danger" onClick={handleDelete} loading={deleteMutation.isPending}>
                        Delete
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}
