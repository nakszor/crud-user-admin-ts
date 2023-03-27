import app from './app';
import {databaseInit} from './database'

const port = 3000

app.listen(port, async () =>{
    await databaseInit()
    console.log(`database connected on http://localhost:${port}`);
})
