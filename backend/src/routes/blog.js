import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
export const blogRouter = new Hono();
blogRouter.use('/*', async (c, next) => {
    //get the header
    //verify the header
    // if header correct proceed else return the user 403 status code
    try {
        const header = c.req.header("Authorization") || "";
        const user = await verify(header, c.env.JWT_SECRET);
        if (user) {
            //extract the user id and pass it down to the route handlers
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        }
        else {
            c.status(403);
            return c.json({
                error: "unauthorized"
            });
        }
    }
    catch (e) {
        c.json({
            message: "Error on authentication"
        });
    }
});
//pagination - ideally
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json({
        blogs
    });
});
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    //  const userId=c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        });
        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        c.json({
            message: "Error while fetching the blog post"
        });
    }
});
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    console.log(authorId);
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        });
        return c.json({
            id: blog.id
        });
    }
    catch (e) {
        console.log(e);
        c.status(503);
        return c.json({
            message: "Error"
        });
    }
});
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });
    return c.json({
        id: blog.id
    });
});
