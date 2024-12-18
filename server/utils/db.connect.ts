//@ts-nocheck
import {Sequelize} from "sequelize";
import configs from "../utils/config.json"
const env: string = process.env.NODE_ENV;

interface config {
    database: string,
    username: string,
    password: string,
    dialect: string,
    host: string | number,
}

const config: config = configs[env];

const doLog = (text: any) => {
    const date = new Date();
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    console.log(date.toISOString().slice(0, -1))
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    console.dir(text)
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    // fs.appendFile(`log.txt`, `${date.toISOString().slice(0, -1)}:  ${text}`, err => {});
}

// export const sequelize = new Sequelize('buket72', 'postgres', 'root', {
//     host: '127.0.0.1',
//     dialect: 'postgres',
//     define: {
//         hooks: {
//             beforeCreate() {
//
//             }
//         },
//         underscored: false,
//     },
//     logging: false
// });

export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        host: config.host,
        define: {
            hooks: {
                beforeCreate() {

                }
            },
            underscored: true,
        },
        logging: false
    }
)