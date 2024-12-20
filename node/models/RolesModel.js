import db from "../database/db.js";

import { DataTypes } from "sequelize";

const RolesModel = db.define('roles', {
  nombreRol: {type:DataTypes.STRING},
  descripcion: {type:DataTypes.STRING},
})

export default RolesModel;