import { z } from 'zod'

export const CreateUserSquema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do administrador'),
  nickname: z.string().trim().min(1, 'Informe o apelido do administrador'),
  phone: z.string().trim().min(1, 'Informe o telefone do administrador'),
  email: z
    .string()
    .email({
      message: 'E-mail inválido',
    })
    .trim()
    .min(1, 'Informe o e-mail do administrador para realizar o cadastro'),
  password: z
    .string()
    .trim()
    .min(4, 'Informe uma senha com no mínimo 4 caracteres'),
  confirmPassword: z
    .string()
    .trim()
    .min(4, 'Informe uma senha com no mínimo 4 caracteres'),
})

export const arenaSignUpSchema = z.object({
  // administrator: CreateUserSquema,
  fantasyName: z.string().trim().min(1, 'Informe o nome fantasia da sua arena'),
  corporateName: z.string().trim(),
  cnpj: z.string().trim(),
  phone: z.string().trim().min(1, 'Informe o telefone da sua arena'),
  pixKey: z.string(),
  requirePrePayment: z.boolean(),
})

export const localizationSchema = z.object({
  address: z.string().trim().min(1, 'Informe o endereço da sua arena'),
  cep: z.string().min(1, 'Informe o CEP da sua arena'),
  city: z.string().min(2, 'Informe a cidade de sua arena'),
  uf: z.string().min(2, 'Informe o estado'),
  locale: z.string().min(1, 'Informe o bairro'),
})

export type ArenaSignUpSchema = z.infer<typeof arenaSignUpSchema>

export type AdministrateSchema = z.infer<typeof CreateUserSquema>

export type LocalizationSchema = z.infer<typeof localizationSchema>
