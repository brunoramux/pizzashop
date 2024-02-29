import { ComponentProps } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps){
    const {pathname} = useLocation() // retorna informacoes sobre a rota atual

    return (
        <Link 
            data-current={pathname === props.to} // verifica se a rota atual e a mesma rota que esse Link envia
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foregroung" 
            {...props}
        />
    )
}