import {z} from 'zod'

const envSchema = z.object({
    VITE_API_URL: z.string().url()
})


export const env = envSchema.parse(import.meta.env) // forma de buscar as variaveis ambiente no vite



