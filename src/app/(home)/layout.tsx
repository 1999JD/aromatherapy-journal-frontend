import Sidebar from "./components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="flex " >
      <Sidebar></Sidebar>
      <div className="flex-grow" >
        {children}
      </div>
    </div>
  );
}
