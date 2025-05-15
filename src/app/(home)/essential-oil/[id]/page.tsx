import { Box, Chip, Divider, Typography } from "@mui/joy";

export default function EssentialOilView() {
    return (
        <div className="container py-8 px-4 ">
            <Typography level="h1" sx={{ marginBottom: '1rem' }}>Write Some Notes</Typography>
            <Divider sx={{ marginBottom: '1rem' }} />


            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

                    <Box sx={{ gridColumn: 'span 4' }}>
                        <Typography level="h2"
                            sx={{ marginBottom: '1rem' }}
                        >
                            Highland Lavender
                        </Typography>
                        <Typography level="body-sm" className="mb-3 line-clamp-3"
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
                    <Box sx={{ gridColumn: 'span 8' }}>
                    </Box>

                </Box>

            </main>

        </div>

    );
}
