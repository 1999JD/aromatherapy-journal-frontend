'use client'
import { Box, IconButton, Input, Typography, Chip } from "@mui/joy";
import { useGetEssentialOilList } from "@/app/hooks/api/useEssentialOil"
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Link from 'next/link';
import { type EssentialOilVO } from '@/app/hooks/api/useEssentialOil';
import { HeartPlus, SquareArrowOutUpRight } from 'lucide-react';


function ItemCard({ data }: {
    data: EssentialOilVO
}) {
    return (
        <Card variant="outlined" >
            <CardContent>
                <Typography level="title-md">
                    {data.title}
                </Typography>
                <Typography level="body-sm" className="line-clamp-3"
                    style={{ display: '-webkit-box' }}>
                    {data.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>

                    <IconButton
                        size="sm"
                        variant="plain"
                        color="primary"
                        sx={{ bgcolor: '' }}
                    >
                        <Link href={`/essential-oil/${data.id}`}>
                            <SquareArrowOutUpRight />
                        </Link>
                    </IconButton>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="danger"
                        sx={{ bgcolor: '' }}
                    >
                        <HeartPlus />
                    </IconButton>


                </Box>
            </CardContent>

            <CardOverflow>
                <Divider inset="context" />
                <CardContent orientation="horizontal" >
                    <div className="line-clamp-1 " >
                        {data.tags.map((tag, index) =>
                        (<Chip key={`${data.id}-tag-${index}`}
                            sx={{
                                backgroundColor: tag.color,
                                margin: 0.25,
                            }}
                        >
                            {tag.name}
                        </Chip>))}
                    </div>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}

export default function EssentialOilList() {
    const { data } = useGetEssentialOilList()

    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
                {data?.map((item) => (
                    <Box key={item.id} sx={{ gridColumn: 'span 4' }}>
                        <ItemCard data={
                            item
                        } />
                    </Box>
                ))}
            </Box>

        </main>

    )

}