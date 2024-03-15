import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProfile } from "@/api/get-profile";
import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";


export function AccountMenu(){
    const navigate = useNavigate()
    const { data: profile, isLoading: isLoagindProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: GetProfile
    })

    const { data: managedRestaurant, isLoading: isLoagindManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: GetManagedRestaurant,
        staleTime: Infinity
    })

    const {mutateAsync: signOutFn, isPending: isSigningOut} = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate('/sign-in', {replace: true})
        }
    })

    return (
        <Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger asChild> 
                <Button variant="outline" className="flex items-center gap-2 select-none">
                    {isLoagindManagedRestaurant ? (<Skeleton className="h-4 w-40" />) : managedRestaurant?.name}
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    {isLoagindProfile ? (
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>) : (
                        <>
                            <span>{profile?.name}</span>
                            <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                        </>
                        )
                    }
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                <DropdownMenuItem>
                    <Building className="w-4 h-4 mr-2"/>
                    <span>Perfil da Loja</span>
                </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut}>
                    <button className="w-full" onClick={() => signOutFn()}>
                        <LogOut className="w-4 h-4 mr-2"/>
                        <span>Sair</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <StoreProfileDialog />
        </Dialog>
    )
}