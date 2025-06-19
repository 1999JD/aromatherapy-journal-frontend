'use client'
import { Stack, Box, Button, Sheet, Divider, Typography, Modal, ModalDialog, ModalClose, colors } from "@mui/joy";
import CustomEditor from "./components/CustomEditor";
import Link from "next/link"
import { MoveLeft, Plus } from "lucide-react";
import TagEditor from "./components/TagEditor";
import { useGetEssentialOilDetail } from "@/app/hooks/api/useEssentialOil";
import { usePostPersonalTag } from "@/app/hooks/api/usePersonalTag";
import { useParams } from "next/navigation";
import { FormControl, FormHelperText, FormLabel, IconButton, Input } from "@mui/joy";
import ColorPicker from '@/components/ColorPicker';
import { useState } from "react";
import useForm from "@/app/hooks/useForm";
import { useQueryClient } from "@tanstack/react-query";


function AddForm({
    openTagModal, setOpenTagModal
}: {
    openTagModal: boolean,
    setOpenTagModal: (arg: boolean) => void
}) {
    const queryClient = useQueryClient()
    const { mutate: postPersonalTag } = usePostPersonalTag(queryClient)
    const { form, handleChange } = useForm({ name: '', color: '' });


    return (<Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openTagModal}
        onClose={() => setOpenTagModal(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
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
            <form onSubmit={
                (() => {
                    postPersonalTag(form)
                    setOpenTagModal(false);
                })}
            >
                <Stack spacing={2}>

                    <FormControl>
                        <FormLabel>Tag Name</FormLabel>
                        <Input
                            sx={{
                                '--Input-decoratorChildHeight': '45px',
                                width: '360px'
                            }}
                            placeholder="Tag Name"
                            required
                            name="name"
                            value={form.name} onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tag Color</FormLabel>
                        <ColorPicker name="color"
                            value={form.color}
                            onChange={(value: string) => handleChange({ target: { name: 'color', value } })}
                        ></ColorPicker>
                    </FormControl>

                    <Button
                        variant="solid"
                        color="primary"
                        type="submit"
                        startDecorator={<Plus />}
                    >
                        Confirm
                    </Button>
                </Stack>

            </form>
        </Sheet>
    </Modal >
    )
}

export default function EssentialOilView() {


    const { id } = useParams()
    const { data, isLoading, error } = useGetEssentialOilDetail(Number(id))
    const [openTagModal, setOpenTagModal] = useState<boolean>(false);

    return (
        <div className="container mx-auto py-8 px-4 ">
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                <Typography level="h1" sx={{ marginBottom: '1rem' }}>Write Some Notes</Typography>

                <Link href="/essential-oil">
                    <Button variant="soft" color="primary" >
                        <MoveLeft className="mr-1" />
                        Essential Oil lists
                    </Button>
                </Link>
            </Stack>
            <Divider sx={{ marginBottom: '1rem' }} />


            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Box>
                    <Typography level="h2"
                        sx={{ marginBottom: '1rem' }}
                    >
                        {data?.name}
                    </Typography>
                    <Typography level="body-sm"
                        sx={{
                            marginBottom: 2
                        }}
                        className="line-clamp-3"
                        style={{ display: '-webkit-box' }}>
                        {data?.note}
                    </Typography>
                    {/* 標籤 */}
                    <TagEditor tags={data?.tags || []} />
                    <TagEditor tags={data?.personalTags || []} editable />

                    <Button variant="outlined" color="neutral" onClick={() => setOpenTagModal(true)}>
                        Add Tag
                    </Button>
                    <AddForm openTagModal={openTagModal} setOpenTagModal={setOpenTagModal} />
                </Box>
                <Box >
                    <CustomEditor />
                </Box>
            </main>

        </div>

    );
}
