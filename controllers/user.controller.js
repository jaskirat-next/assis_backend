// import { where } from "sequelize";
import User from "../models/user.model.js";

export const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                msg: "name, email, password are required"
            })
        }

        const existUser = await User.findOne({
            where: {email}
        })

        if(existUser) {
            res.status(409).json({
                msg: "User already exits"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch(err) {
        console.error(err)

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
}
}