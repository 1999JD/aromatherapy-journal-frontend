'use client'
import { Stack, Box,  Button, Chip, Divider, Typography } from "@mui/joy";
import CustomEditor from "./components/CustomEditor";
import Link from "next/link"
import { MoveLeft } from "lucide-react";
import TagEditor from "./components/TagEditor";
import { useGetEssentialOilDetail } from "@/app/hooks/api/useEssentialOil";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EssentialOilView() {


    const { id } = useParams()
    const { data, isLoading, error } = useGetEssentialOilDetail(id as string | undefined)

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
                    <TagEditor tags={data?.tags || []} />
                </Box>
                <Box >
                    <CustomEditor />
                </Box>
            </main>

        </div>

    );
}
