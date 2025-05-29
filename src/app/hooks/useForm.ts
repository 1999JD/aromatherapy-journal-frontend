import { useState } from "react";

function useForm(initial: any) {
    const [form, setForm] = useState(initial);

    interface FormEventTarget {
        name: string;
        value: string;
    }

    interface FormChangeEvent {
        target: FormEventTarget;
    }

    const handleChange = (e: FormChangeEvent) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    return { form, handleChange };
}

export default useForm