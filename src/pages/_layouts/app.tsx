import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout(){
    return(
        <div className="flex min-h-screen flex-col ">
            <Header />

            <div className="flex flex-1 flex-col gap-4 p-0 pt-6">
                <Outlet />
            </div>
        </div>
    )
}