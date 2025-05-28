'use client';
import { useState } from "react";
import CkEditor from '@/components/CkEditor';
import './index.css'
import { Box, Button, Stack } from "@mui/joy";

export default function CustomEditor() {
    const [editorData, setEditorData] = useState<string>("");
    const [data, setData] = useState<string>("");

    const handleOnUpdate = (editor: string, field: string): void => {
        if (field === "description") {
            console.log("Editor data field:", editor);
            setData(editor);
        }
    };
    return (
        <Stack spacing={2} direction={'column'} alignItems={'flex-end'} >
            <Box sx={{
                marginBottom: 1,
            }} >
                <CkEditor
                    editorData={editorData}
                    setEditorData={setEditorData}
                    handleOnUpdate={handleOnUpdate}
                />
            </Box>
            <Button>Save</Button>
        </Stack>
    )
}