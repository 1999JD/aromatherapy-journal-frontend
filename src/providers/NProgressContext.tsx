// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
'use client';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

const NProgressContext = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            {children}
            <ProgressProvider
                height="4px"
                color="var(--joy-palette-primary-500)"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

export default NProgressContext;