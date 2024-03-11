import { registerRestaurant } from "@/api/register-restaurant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useMutation } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email()
})

type signUpForm = z.infer<typeof signUpForm>

export function SignUp(){
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {isSubmitting}} = useForm<signUpForm>()

    const {mutateAsync: registerRestauranteFn} = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleSignUp(data: signUpForm){
        try {
            await registerRestauranteFn({
                restaurantName: data.restaurantName,
                email: data.email,
                managerName: data.managerName,
                phone: data.phone
            })
            // throw new Error()
            toast.success('Restaurante cadastrado com sucesso.', {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`)
                },
                // description: 'Teste'
            })
        } catch (error) {
            toast.error('Erro ao cadastrar restaurante.')

        }
    }

    return <>
        <Helmet title="Cadastro"/>

        <div className="p-8">        
            <Button variant={"ghost"} asChild className="absolute right-4 top-8">
                <Link to={'/sign-in'} className="">
                    Voltar ao Login
                </Link>
            </Button>
            <div className="w-[350px] flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Criar conta grátis.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Seja um parceiro e comece suas vendas
                    </p>
                </div>
                <form  onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="space-y-2 ">
                        <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                        <Input id="restaurantName" type="text"  {...register('restaurantName')}/>
                    </div>

                    <div className="space-y-2 ">
                        <Label htmlFor="managerName">Seu nome</Label>
                        <Input id="managerName" type="text"  {...register('managerName')}/>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="email">Seu e-mail</Label>
                        <Input id="email" type="email"  {...register('email')}/>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="tel">Seu celular</Label>
                        <Input id="tel" type="tel"  {...register('phone')}/>
                    </div>
                    <Button disabled={isSubmitting} className='w-full' type="submit">Finalizar cadastro</Button>

                    <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                        Ao continuar você concorda com nossos termos de serviço e políticas de privacidade
                    </p>
                </form>
            </div>
        </div>
    </>
}