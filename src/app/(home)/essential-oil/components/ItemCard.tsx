import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import { HeartPlus } from 'lucide-react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';


export default function ItemCard() {
    return (
        <Card variant="outlined" >
            <CardContent>
                <Typography level="title-md">
                    <Link href="#multiple-actions" overlay underline="none">
                        Highland Lavender
                    </Link>
                </Typography>
                <Typography level="body-sm" className="line-clamp-3"
                    style={{ display: '-webkit-box' }}>
                    Highland True Lavender Essential Oil is distilled from Lavandula angustifolia grown at high altitudes.
                    Its gentle floral aroma promotes deep relaxation and emotional balance.
                    Rich in esters, it soothes the skin and supports restful sleep.
                    Ideal for aromatherapy, skincare, and natural stress relief.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="danger"
                        sx={{ ml: 'auto', bgcolor: '' }}
                    >
                        <HeartPlus />
                    </IconButton>


                </Box>
            </CardContent>

            <CardOverflow>
                <Divider inset="context" />
                <CardContent orientation="horizontal" >
                    <div className="line-clamp-2 " >
                        <Chip className="mx-0.5 my-0.5" >Stomache</Chip>
                        <Chip className="mx-0.5 my-0.5">Head Ache</Chip>
                        <Chip className="mx-0.5 my-0.5">sleep</Chip>
                        <Chip className="mx-0.5 my-0.5">sleep</Chip>
                        <Chip className="mx-0.5 my-0.5">atopic eczema</Chip>
                        <Chip className="mx-0.5 my-0.5">atopic eczema</Chip>
                    </div>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}