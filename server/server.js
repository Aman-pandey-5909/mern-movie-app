const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const morgan = require('morgan')
const cp = require('cookie-parser')

const errorHandler = require('./middlewares/errorhandler')
const notFound = require('./middlewares/notfound')

const authRoutes = require('./routes/auth.route')
const moviesRoutes = require('./routes/movies.route')
const seedMovies = require('./services/seedmovie')
const connectDB = require('./utils/connectDB')

const app = express()

app.use(express.json())
app.use(cors( 
    {
        origin: process.env.ORIGIN,
        credentials: true
    }
))
app.use(morgan('dev'))
app.use(cp())

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running', resdata: null })
})



app.use('/api/auth', authRoutes)
app.use('/api', moviesRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB().then(
    () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
            // seedMovies()
        })
    }
).catch(
    (error) => {
        console.log(error)
    }
)
