import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput } from '@the_cruiser24/echowrites-common';
export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        //sanatise the request
        // {
        //   "email":string,
        //   "password":string
        // }
        const body = await c.req.json();
        const {sucess}=signupInput.safeParse(body);
        if(!sucess){
          c.status(411);
          return c.json({
            message:"Wrong Inputs"
          })
        }
        const user1 = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            },
        });
        const token = await sign({ id: user1.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token,
        });
    }
    catch (error) {
        console.error('Error in /api/v1/signup:', error);
        c.status(411);
        return c.json({ error: 'Internal Server Error' });
    }
});
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        message: "Successfully Logged in",
        jwt
    });
});
