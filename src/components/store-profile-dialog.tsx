import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod'

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: GetManagedRestaurant
    })

    const {
        register,
        handleSubmit
    } = useForm<StoreProfileSchema>(
        {
            resolver: zodResolver(storeProfileSchema),
            values: {
                name: managedRestaurant?.name ?? '',
                description: managedRestaurant?.description ?? ''
            }
        }
    )
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Perfil da Loja
                </DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento.
                </DialogDescription>
            </DialogHeader>

            <form>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register('name')} />
                    </div>
                </div>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">description</Label>
                        <Textarea className="col-span-3" id="description" {...register('description')} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" type="button">Cancelar</Button>
                    <Button type="submit" variant="success">Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}