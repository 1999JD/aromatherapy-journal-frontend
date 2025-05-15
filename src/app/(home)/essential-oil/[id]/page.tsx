import { Stack, Box, IconButton, Button, Chip, Divider, Typography } from "@mui/joy";
import CustomEditor from "./components/CustomEditor";
import Link from "next/link"
import { MoveLeft } from "lucide-react";

export default function EssentialOilView() {
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
                        Highland Lavender
                    </Typography>
                    <Typography level="body-sm"
                        sx={{
                            marginBottom: 2
                        }}
                        className="line-clamp-3"
                        style={{ display: '-webkit-box' }}>
                        Highland True Lavender Essential Oil is distilled from Lavandula angustifolia grown at high altitudes.
                        Its gentle floral aroma promotes deep relaxation and emotional balance.
                        Rich in esters, it soothes the skin and supports restful sleep.
                        Ideal for aromatherapy, skincare, and natural stress relief.
                    </Typography>
                    <div className="line-clamp-2 " >
                        <Chip className="mx-0.5 my-0.5" >Stomache</Chip>
                        <Chip className="mx-0.5 my-0.5">Head Ache</Chip>
                        <Chip className="mx-0.5 my-0.5">sleep</Chip>
                        <Chip className="mx-0.5 my-0.5">sleep</Chip>
                        <Chip className="mx-0.5 my-0.5">atopic eczema</Chip>
                        <Chip className="mx-0.5 my-0.5">atopic eczema</Chip>
                    </div>
                </Box>
                <Box >
                    <CustomEditor />
                </Box>
            </main>

        </div>

    );
}
