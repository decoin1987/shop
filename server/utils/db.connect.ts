//@ts-nocheck
import {Sequelize} from "sequelize";


console.log(process.env)
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
    process.env.NUXT_API_DB,
    process.env.NUXT_API_DB_USERNAME,
    process.env.NUXT_API_DB_PASSWORD,
    {
        dialect: process.env.NUXT_API_DB_DIALECT,
        host: process.env.NUXT_API_DB_HOST,
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