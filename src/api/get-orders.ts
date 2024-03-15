import { api } from "@/lib/axios"

export interface GetOrdersResponse {
    orders: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
    }[]
    meta: {
        pageIndex: number
        perPage: number
        totalCount: number
    }
}

export interface GetOrdersQuery {
    pageIndex: number | null
}

export async function getOrders({pageIndex}: GetOrdersQuery){
    const response = await api.get<GetOrdersResponse>('/orders', {
        params: {
            pageIndex,
        }
    })
    console.log(response.data)

    return response.data
}