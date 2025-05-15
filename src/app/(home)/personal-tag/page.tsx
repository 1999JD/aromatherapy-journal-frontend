import { Box, Button, Chip, FormControl, FormHelperText, FormLabel, IconButton, Input, Typography } from "@mui/joy";
import { Search, Plus } from 'lucide-react';
import ChipDeleteIcon from "./components/ChipDeleteIcon";
import AddForm from "./components/AddForm";
export default function PersonalTag() {
    return (
        <div className="container mx-auto py-8 px-4 ">
            <Typography level="h1"  sx={{marginBottom: '1rem'}} >My Tags</Typography>
            <Input
                size="sm"
                variant="outlined"
                placeholder="Search keywords..."
                startDecorator={<Search />}
                sx={{
                    alignSelf: 'center',
                    display: {
                        xs: 'none',
                        sm: 'flex',
                    },
                    marginBottom: '1rem',
                    width: '360px'
                }}
            />

            <main className="">
                <div className=" mb-4" >
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5" >Stomache</Chip>
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5">Head Ache</Chip>
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5">sleep</Chip>
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5">sleep</Chip>
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5">atopic eczema</Chip>
                    <Chip size="lg"
                        endDecorator={
                            <ChipDeleteIcon />
                        }
                        className="mx-0.5 my-0.5">atopic eczema</Chip>
                </div>


                <AddForm></AddForm>
            </main>

        </div>
    );
}

