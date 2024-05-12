import { PrismaClient  } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { originalUrl, customizeLink } = await req.json()

    if (originalUrl.trim().length === 0) {
        return Response.json({ message: "Not data originalUrl" }, { status: 400 })
    }

    if (customizeLink.trim().length > 0) {
        const checkurl = await prisma.short_url.findMany({
            where: { customizeLink: customizeLink }
        });
        
        if (checkurl.length > 0) {
            return Response.json({ success: false, message: "ชื่อของลิ้งค์ที่คุณตั้งถูกใช้งานแล้ว กรุณาคิดชื่อใหม่!" }, { status: 400 });
        }
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let short = ''
    const length = Math.floor(Math.random() * 2) + 5

    for (let i = 0; i < length; i++) {
        short += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const createShortUrl = { originalUrl, shortUrl: customizeLink != "" ? customizeLink : short, customizeLink: customizeLink == "" ? null : customizeLink }

    const datashortUrl = await prisma.short_url.create({
        data: createShortUrl
    })

    const resShortUrl = datashortUrl["customizeLink"] != null ? datashortUrl["customizeLink"] : datashortUrl["shortUrl"]

    return Response.json({ success: true, message: "ย่อลิ้งค์ของคุณสำเร็จ", shortUrl: datashortUrl["shortUrl"], link: resShortUrl }, { status: 201 })
}