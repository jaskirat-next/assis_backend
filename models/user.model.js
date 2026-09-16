import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import Sequelize from "../config/database.js"

const User = Sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,

            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: true,

        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10)
            },
            beforeUpdate: async (user) => {
                if(user.changed("password")) {
                    user.password = await bcrypt.hash(user.password, 10)
                }
            }
        }
    }
);

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

export default User;