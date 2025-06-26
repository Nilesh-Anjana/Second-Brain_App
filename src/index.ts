import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as z from "zod";
const bcrypt = require("bcrypt");
import { JWT_Password } from "./config";
import { userMiddleware } from "./middleware";


import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
const app = express();

app.use(express.json());


const User_Data_Format = z.object({
  username: z.string(),
  password: z.string()
});

app.post("/api/v1/signup", async (req:Request, res:Response) => {
  // try to zod(DONE....) , password hashing(DONE....) , return status code (DONE.......)

  const data = User_Data_Format.parse(req.body);
  
    const hashedPassword = await bcrypt.hash(data.password, 10);

  if (data) {
    try {
      await UserModel.create({
        username: data.username,
        password: hashedPassword
      });

      res.status(200).json({
        message: "user signed up"
      });
    } catch (e) {
      res.status(411).json({
        message: "user already exists"
      });
    }
  } else {
    res.status(400).json({
      message: "input format is wrong for signup"
    });
  }
});



app.post("/api/v1/signin",async (req,res) =>{
    const username = req.body.username;
    const plainPassword = req.body.password;
    
    const existingUser = await UserModel.findOne({
        username
    })

    if(existingUser)
    { // first check that the password is correct or not
        const match = await bcrypt.compare(plainPassword, existingUser.password);
        if(match)
        {
            // if the password match then only give the jwt token to user
            const token = jwt.sign({
                id : existingUser._id
            },JWT_Password)

            res.json({
                token
            })
        }
        else{
            res.json({
                message : "password is incorrect"
            })
        }

    }
    else{
        res.json({
            message : "user not found with this username"
        })
    }
})

app.post("/api/v1/content",userMiddleware , async (req,res) =>{
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link : link,
        type : type,
        //@ts-ignore
        userId : req.userId,
        tags :[]

    })
    res.json({
         message : "content added"
    })

})

app.get("/api/v1/content",userMiddleware , async (req,res) =>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId : userId
    }).populate("userId", "username")

    res.json({
        content
    })

})
//@ts-ignore
app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const contentId = req.body.contentId;

    if (!contentId) {
        return res.status(400).json({ error: "contentId is required" });
    }

    const deleted = await ContentModel.findOneAndDelete({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });

    if (!deleted) {
        return res.status(404).json({ message: "No content found or unauthorized" });
    }

    res.json({
        message: "Your content is deleted successfully"
    });
});

app.post("/api/v1/brain/share",(req,res) =>{
    
})

app.get("/api/v1/brain/;shareLink",(req,res) =>{
    
})


app.listen(3000);