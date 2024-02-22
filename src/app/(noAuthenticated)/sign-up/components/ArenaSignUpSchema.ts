import { z } from 'zod'

// {
//     fantasyName,
//     corporateName,
//     cnpj,
//     phone,
//     address,
//     pixKey,
//     requirePrePayment,
//     administrator: {
//       name,
//       nickname,
//       phone: userPhone,
//       email,
//       password,
//     },
//   }

export const CreateUserSquema = z.object({
  name: z.string({
    required_error: 'administrator name is required',
  }),
  nickname: z.string({
    required_error: 'nickname is required',
  }),
  phone: z.string({
    required_error: 'phone is required',
  }),
  email: z
    .string({
      required_error: 'administrator email is required',
    })
    .email({
      message: 'invalid email',
    }),
  password: z.string({
    required_error: 'password is required',
  }),
  confirmPassword: z.string({
    required_error: 'password is required',
  }),
})

export const arenaSignUpSchema = z.object({
  administrator: CreateUserSquema,
  fantasyName: z.string({
    required_error: 'fantasy name is required',
  }),
  corporateName: z.string(),
  cnpj: z.string(),
  phone: z.string({
    required_error: 'phone is required',
  }),
  address: z.string(),
  pixKey: z.string(),
  requirePrePayment: z.boolean(),
})

export type ArenaSignUpSchema = z.infer<typeof arenaSignUpSchema>
