import { useState } from 'react';

function useForm<T>(initial: T) {
    const [form, setForm] = useState<T>(initial);

    interface FormEventTarget {
        name: string;
        value: string;
    }

    interface FormChangeEvent {
        target: FormEventTarget;
    }

    const handleChange = (event: FormChangeEvent) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const reset = () => setForm(initial);

    return { form, handleChange, reset, setForm };
}

export default useForm;
