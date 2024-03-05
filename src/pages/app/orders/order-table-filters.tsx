import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilters(){
    return (
        <form action="" className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros</span>
            <Input placeholder="ID do Pedido" className="h-8 w-auto" />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
            <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                    <SelectItem value="processing">Processando</SelectItem>
                    <SelectItem value="delivering">Em entrega</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" variant="secondary" size="xs">
                <Search className="h-4 w-4 mr-2"/>
                Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="xs">
                <X className="h-4 w-4 mr-2"/>
                Remover filtros
            </Button>
        </form>
    )
}