// import { where } from "sequelize";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

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

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(401).json({
                msg: "email and password are reqquired"
            })
        }

        const user = await User.findOne({
            where: {email}
        })

         if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

         const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // 5. Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",

            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            }
        });
        
    } catch(err) {
        console.error(err)
    }
}