'use client'
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import Link from 'next/link';
import { HeartPlus, SquareArrowOutUpRight } from 'lucide-react';
import {
    useGetEssentialOilList,
    EssentialOilSummary,
} from '@/app/hooks/api/useEssentialOil';

function ItemCard({ data }: { data: EssentialOilSummary }) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-md">{data.name}</Typography>
                <Typography level="body-sm" className="line-clamp-3" style={{ display: '-webkit-box' }}>
                    {data.note}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <IconButton size="sm" variant="plain" color="primary">
                        <Link href={`/essential-oil/${data.id}`}>
                            <SquareArrowOutUpRight />
                        </Link>
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="danger">
                        <HeartPlus />
                    </IconButton>
                </Box>
            </CardContent>
            <CardOverflow>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <div className="line-clamp-1">
                        {data.tags.map((tag) => (
                            <Chip
                                key={`${data.id}-tag-${tag.id}`}
                                sx={{ backgroundColor: tag.color, margin: 0.25 }}
                            >
                                {tag.name}
                            </Chip>
                        ))}
                    </div>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}

export default function EssentialOilList() {
    const { data = [] } = useGetEssentialOilList();

    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
                {data.map((item) => (
                    <Box key={`essential-oil-${item.id}`} sx={{ gridColumn: { xs: 'span 12', md: 'span 6', lg: 'span 4' } }}>
                        <ItemCard data={item} />
                    </Box>
                ))}
            </Box>
        </main>
    );
}
