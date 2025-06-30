import { Sequelize } from "sequelize";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

// const sequelize = new Sequelize("postgres", "postgres", "senha", {
//   host: "db.xphuktdviweljyxqhiqv.supabase.co",
//   port: 5432,
//   dialect: "postgres",
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for self-signed certificates
    },
  },
  logging: false, // Disable logging; default: console.log
});

export default sequelize;
