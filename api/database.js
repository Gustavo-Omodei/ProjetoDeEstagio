import { Sequelize } from "sequelize";
const sequelize = new Sequelize("nomeBanco", "usuario", "senha", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
