'use client'
import { useState, FormEvent } from 'react';
import {
    Stack,
    Box,
    Button,
    Sheet,
    Divider,
    Typography,
    Modal,
    ModalDialog,
    ModalClose,
    FormControl,
    FormLabel,
    Input,
} from '@mui/joy';
import Link from 'next/link';
import { MoveLeft, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import CustomEditor from './components/CustomEditor';
import TagEditor from './components/TagEditor';
import ColorPicker from '@/components/ColorPicker';
import useForm from '@/app/hooks/useForm';
import { useGetEssentialOilDetail } from '@/app/hooks/api/useEssentialOil';
import { useCreatePersonalTag } from '@/app/hooks/api/usePersonalTag';

function AddForm({
    openTagModal,
    setOpenTagModal,
}: {
    openTagModal: boolean;
    setOpenTagModal: (arg: boolean) => void;
}) {
    const { form, handleChange, reset, setForm } = useForm({ name: '', color: '#000000' });
    const { mutate: createPersonalTag, isPending } = useCreatePersonalTag();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPersonalTag(form, {
            onSuccess: () => {
                setOpenTagModal(false);
                reset();
            },
            onError: (error) => {
                console.error('Failed to create personal tag', error);
            },
        });
    };

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={openTagModal}
            onClose={() => {
                setOpenTagModal(false);
                reset();
            }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog>
                <Sheet variant="outlined" sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1 }}
                    >
                        Add Tag
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Tag Name</FormLabel>
                                <Input
                                    sx={{ '--Input-decoratorChildHeight': '45px', width: '360px' }}
                                    placeholder="Tag Name"
                                    required
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Tag Color</FormLabel>
                                <ColorPicker
                                    name="color"
                                    value={form.color}
                                    onChange={(value: string) =>
                                        setForm((prev) => ({ ...prev, color: value }))
                                    }
                                />
                            </FormControl>

                            <Button
                                variant="solid"
                                color="primary"
                                type="submit"
                                startDecorator={<Plus />}
                                loading={isPending}
                            >
                                Confirm
                            </Button>
                        </Stack>
                    </form>
                </Sheet>
            </ModalDialog>
        </Modal>
    );
}

export default function EssentialOilView() {
    const { id } = useParams();
    const [openTagModal, setOpenTagModal] = useState<boolean>(false);
    const numericId = typeof id === 'string' ? Number(id) : undefined;
    const { data, isLoading, error } = useGetEssentialOilDetail(numericId);

    return (
        <div className="container mx-auto py-8 px-4 ">
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography level="h1" sx={{ marginBottom: '1rem' }}>
                    Write Some Notes
                </Typography>

                <Link href="/essential-oil">
                    <Button variant="soft" color="primary">
                        <MoveLeft className="mr-1" />
                        Essential Oil lists
                    </Button>
                </Link>
            </Stack>
            <Divider sx={{ marginBottom: '1rem' }} />

            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Box>
                    <Typography level="h2" sx={{ marginBottom: '1rem' }}>
                        {isLoading ? 'Loading...' : data?.name}
                    </Typography>
                    {error ? (
                        <Typography level="body-sm" color="danger">
                            Failed to load essential oil.
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                level="body-sm"
                                sx={{ marginBottom: 2 }}
                                className="line-clamp-3"
                                style={{ display: '-webkit-box' }}
                            >
                                {data?.note}
                            </Typography>
                            <TagEditor tags={data?.tags || []} />
                            <TagEditor tags={data?.personalTags || []} editable />
                        </>
                    )}

                    <Button variant="outlined" color="neutral" onClick={() => setOpenTagModal(true)}>
                        Add Tag
                    </Button>
                    <AddForm openTagModal={openTagModal} setOpenTagModal={setOpenTagModal} />
                </Box>
                <Box>
                    <CustomEditor />
                </Box>
            </main>
        </div>
    );
}
