import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";


export function Orders(){
    const { data: result } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    })

    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4 m-2.5">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            
                <div className="space-y-2.5 ">
                    <OrderTableFilters />

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64]">

                                    </TableHead>
                                    <TableHead className="w-[140]">Identificador</TableHead>
                                    <TableHead className="w-[180]">Realizado há</TableHead>
                                    <TableHead className="w-[140]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140]">Total do pedido</TableHead>
                                    <TableHead className="w-[164]"></TableHead>
                                    <TableHead className="w-[132]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result && result.orders.map(order => {
                                    return (<OrderTableRow key={order.orderId} order={order}/>)
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination pageIndex={0} perPage={10} totalCount={10}/>
                </div>
            </div>
        </>
    )
}