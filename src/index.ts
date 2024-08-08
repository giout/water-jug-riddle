import 'dotenv/config'
import app from './app'

const port = process.env.PORT || 0

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})