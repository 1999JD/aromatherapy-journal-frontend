'use client'
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import {
    Tag,
    Home,
    Settings,
    HeartPlus,
    X as CloseRoundedIcon,
    LogOut as LogoutRoundedIcon,
    SunDim as BrightnessAutoRoundedIcon,
    ChevronDown as KeyboardArrowDownIcon,
} from 'lucide-react'
import { closeSidebar } from './utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: 'grid',
                        transition: '0.2s ease',
                        '& > *': {
                            overflow: 'hidden',
                        },
                    },
                    open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    const sidebarItem = [
        {
            name: 'Essential Oil',
            path: '/essential-oil',
            Icon: Home,
        },
        {
            name: 'My Tags',
            path: '/personal-tag',
            Icon: Tag
        },
        {
            name: 'Favorite',
            path: '/favorite',
            Icon: HeartPlus
        },
        {
            name: 'Admin',
            path: '/admin',
            Icon: Settings,
            children: [
                {
                    path: '/essential-oil',
                    name: 'Essential Oil',
                },
                {
                    path: '/tag',
                    name: 'Tag',
                },
            ]
        },

    ]

    const currentPathname = usePathname()



    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-lg">Aromatherapy Journal</Typography>
            </Box>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    {sidebarItem.map(ele => (
                        <ListItem key={ele.name} nested={!!ele.children} >
                            {ele.children ?
                                <Toggler
                                    renderToggle={({ open, setOpen }) => (
                                        <ListItemButton onClick={() => setOpen(!open)}>
                                            {ele.Icon && React.createElement(ele.Icon)}
                                            <ListItemContent>
                                                <Typography level="title-sm">{ele.name}</Typography>
                                            </ListItemContent>
                                            <KeyboardArrowDownIcon
                                                style={
                                                    { transform: open ? 'rotate(180deg)' : 'none', }
                                                }
                                            />
                                        </ListItemButton>
                                    )}
                                >
                                    <List sx={{ gap: 0.5 }}>
                                        {ele.children.map((childEle) => (
                                            <Link href={`${ele.path}${childEle.path}`} key={childEle.name} >
                                                <ListItem sx={{ mt: 0.5 }}  >
                                                    <ListItemButton
                                                        selected={currentPathname === `${ele.path}${childEle.path}`}
                                                    >{childEle.name}</ListItemButton>
                                                </ListItem>
                                            </Link>
                                        ))}

                                    </List>
                                </Toggler>
                                : (
                                    <ListItemButton
                                        selected={currentPathname === ele.path}

                                    >
                                        {ele.Icon && React.createElement(ele.Icon)}
                                        <ListItemContent>
                                            <Link href={ele.path} >
                                                <Typography level="title-sm">{ele.name}</Typography>
                                            </Link>
                                        </ListItemContent>
                                    </ListItemButton>
                                )}


                        </ListItem>
                    ))}
                </List>
                {/* 下方 */}
                <Card
                    invertedColors
                    variant="soft"
                    color="warning"
                    size="sm"
                    sx={{ boxShadow: 'none' }}
                >
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography level="title-sm">Used space</Typography>
                        <IconButton size="sm">
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Typography level="body-xs">
                        Your team has used 80% of your available space. Need more?
                    </Typography>
                    <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
                    <Button size="sm" variant="solid">
                        Upgrade plan
                    </Button>
                </Card>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">Siriwat K.</Typography>
                    <Typography level="body-xs">siriwatk@test.com</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}