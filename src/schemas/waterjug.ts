import { z } from 'zod'

export const waterJugSchema = z.object({
    x_capacity: z.number({
        required_error: 'x is required',
        invalid_type_error: 'x must be a number'
    })
    .positive('x must be positive')
    .int('x must be an integer'),
    y_capacity: z.number({
        required_error: 'y is required',
        invalid_type_error: 'y must be a number'
    })
    .positive('y must be positive')
    .int('y must be an integer'),
    z_amount_wanted: z.number({
        required_error: 'z is required',
        invalid_type_error: 'z must be a number'
    }) 
    .positive('z must be positive')
    .int('z must be an integer')
})