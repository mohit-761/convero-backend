import './config/env.config';
import app from "./app";
import { dbConnect } from './config/db.config';

(async () => {
    const PORT = process.env.PORT || 3000;
    await dbConnect();
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
    })
})();