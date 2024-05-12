import axios from "axios"

export async function POST(request: Request) {
    const req = await request.json()

    const embed = {
        content: req.content,
        embeds: [{
          color: 	16777215,
          title: `Error caused by this user | IP: ${req.userIp}`,
          description: "This user may have done something that caused the system to check originalUrl on the other side. The client is not working or because our system is malfunctioning.",
        }]
      }

    const report = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK_URL}`,  {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(embed),
        })
    }

    report()

    return Response.json({ message: "Ok" })
}