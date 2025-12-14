const z = require('zod')

const movieSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
    poster: z.url(),
    director: z.string().min(3),
    year: z.string().min(3),
    imdbID: z.string().min(3),
    type: z.string().min(3),
    rating: z.number(),
    duration: z.number()
})

module.exports = movieSchema