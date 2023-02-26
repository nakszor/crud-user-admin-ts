import app from './app';
import 'dotenv/config'
import {databaseInit} from './database'

const port = process.env.PORT

app.listen(port, async () =>{
    await databaseInit()
    console.log(`database connected on http://localhost:${port}`);
})
