import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


export function Orders(){
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const pageIndex = z.coerce.number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status], // a requisicao sera refeita quando o pageIndex for alterado
        queryFn: () => getOrders({ pageIndex, customerName, orderId, status: status === 'all' ? null : status })
    })

    function handlePaginate(pageIndex: number){
        setSearchParams(prev => {
            prev.set('page', (pageIndex+1).toString()) // alterar searchParams
            return prev
        })
    }

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
                    {result && (
                        <Pagination onPageChange={handlePaginate} pageIndex={pageIndex} perPage={result.meta.perPage} totalCount={result.meta.totalCount}/>
                    )}
                </div>
            </div>
        </>
    )
}