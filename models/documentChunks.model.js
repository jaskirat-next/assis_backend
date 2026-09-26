import { DataTypes } from "sequelize";
import Sequelize from "../config/database.js"
import sequelize from "../config/database.js";

const DocumentChunk = sequelize.define(
    "DocumentChunk",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        document_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        chunk_index: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        embedding: {
        type: DataTypes.ARRAY(DataTypes.FLOAT), 
        allowNull: true,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
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
        tableName: "document_chunks",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }   
);

export default DocumentChunk;