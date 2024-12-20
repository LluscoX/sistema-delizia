import db from "../database/db.js";

import { DataTypes } from "sequelize";

const CategoriaModel = db.define('categorias', {
  descripcion: {type:DataTypes.STRING},
})

export default CategoriaModel;