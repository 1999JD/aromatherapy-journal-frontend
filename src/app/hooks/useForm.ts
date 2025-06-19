import { useState } from "react";

function useForm<T>(initial: T) {
    const [form, setForm] = useState<T>(initial);

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