import { Outlet, useLoaderData } from "react-router-dom";

export default function MainLayout(){
    const data = useLoaderData();
    return <Outlet context={data} />
}