import { PrismaClient  } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { redirect: string } },) {
    const shortUrl = await prisma.short_url.findFirst({
        where: { shortUrl: params.redirect },
    })

    if (shortUrl == null) {
        return Response.json({ success: false, message: "Link not fount" }, { status: 400 })
    }

    return Response.json({ success: true, message: "Ok", link: shortUrl }, { status: 200 })
  }