import { z } from 'zod'

export const waterJugSchema = z.object({
    x_capacity: z.number({
        required_error: 'x_capacity is required',
        invalid_type_error: 'x_capacity must be a number'
    }),
    y_capacity: z.number({
        required_error: 'y_capacity is required',
        invalid_type_error: 'y_capacity must be a number'
    }),
    z_amount_wanted: z.number({
        required_error: 'z_amount_wanted is required',
        invalid_type_error: 'z_amount_wanted must be a number'
    }) 
})