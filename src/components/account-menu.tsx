import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { GetProfile } from "@/api/get-profile";
import { GetManagedRestaurant } from "@/api/get-managed-restaurant";


export function AccountMenu(){
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: GetProfile
    })

    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: GetManagedRestaurant
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild> 
                <Button variant="outline" className="flex items-center gap-2 select-none">
                    {managedRestaurant?.name}
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    <span>{profile?.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Building className="w-4 h-4 mr-2"/>
                    <span>Perfil da Loja</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                    <LogOut className="w-4 h-4 mr-2"/>
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}