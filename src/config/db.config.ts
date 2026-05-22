import './env.config';
import { join } from "node:path";
import { DataSource } from "typeorm";

export const getDataSource: DataSource = new DataSource({
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE as any,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    synchronize: false,
    entities: [join(__dirname, '../database', '/entities', '**', '*.(ts,Js)')],
    migrations: [join(__dirname, '../database', '/entities', '**', '*.ts')],
    migrationsTableName: 'migrations'
});

export let dbConnect = async () => {
    try {
        await getDataSource.initialize();
        console.log('DATABASE CONNECTED SUCCESSFULLY');
    } catch (error) {
        console.log('ERROR WHILE CONNETING DATABASE: ', error);
    }
}