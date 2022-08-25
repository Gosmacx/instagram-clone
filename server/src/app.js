import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3030
const app = express()
app.use("/images", express.static(process.env.FILE_STORAGE));

require('./loaders').default({ expressApp: app })

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return process.exit(1)
      }
      console.log(`Server is running on ${port}`)
})

export default app;