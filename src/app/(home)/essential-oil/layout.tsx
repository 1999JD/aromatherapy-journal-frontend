export default function EssentialLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>here is EssentialLayout
            <div>
                {children}
            </div>
        </div>
    );
}
