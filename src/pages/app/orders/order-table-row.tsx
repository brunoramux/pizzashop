import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";

interface OrderTableRowProps {
    order: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
    }
}

export function OrderTableRow({ order }: OrderTableRowProps){
    const [ isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutateAsync: cancelOrderFn} = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, {orderId}){
            const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
                queryKey: ['orders']
            })

            ordersListCache.forEach(([cacheKey, cacheData]) => {
                if(!cacheData){
                    return 
                }

                queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map(order => {
                        if (order.orderId === orderId){
                            return { ...order, status: 'canceled'}
                        }
                        return order
                    })
                })
            })
        }
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} >
                    <DialogTrigger asChild> 
                        <Button variant={"outline"} size="xs">
                            <Search className="h-3 w-3"/>
                            <span className="sr-only">Detalhes do pedido</span>   
                        </Button>
                    </DialogTrigger>
                    <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-sm font-medium">{order.orderId}</TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </TableCell>
            <TableCell>
                <Button disabled={order.status === 'canceled'} variant="outline" size="xs">
                    <ArrowRight className="mr-2 h-3 w-3"/>
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
            <Dialog>
                <DialogTrigger asChild> 
                    <Button disabled={!['pending', 'processing'].includes(order.status)} variant="ghost" size="xs">
                        <X className="mr-2 h-3 w-3"/>
                        Cancelar
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        Tem certeza que deseja cancelar o pedido?
                    </DialogTitle>
                    <DialogDescription className="flex justify-end mt-5">
                        <Button  className="w-500" disabled={!['pending', 'processing'].includes(order.status)} variant="destructive" onClick={
                            () => cancelOrderFn({orderId: order.orderId})}>
                            Sim
                        </Button>
                        <DialogClose className="ml-2">
                            <Button className="w-500" variant="ghost">Não</Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogContent>
            </Dialog>    
            </TableCell>
        </TableRow>
    )
}