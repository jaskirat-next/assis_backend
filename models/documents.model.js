import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import Sequelize from "../config/database.js"
import sequelize from "../config/database.js";


const Document = sequelize.define(
    "Documnet",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        file_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        file_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        file_path: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "documents",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }

    
)

export default Document;