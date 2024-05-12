"use client"

import { useEffect, useState } from "react"
import { useRouter  } from "next/navigation"
import Swal from "sweetalert2"

interface shortUrl {
  id: number
  originalUrl: String
  shortUrl: String
  customizeLink: String
  ip: String
  lastUsed: Date 
  createdAt: Date
  updatedAt: Date  
}

const redirectPage = ({ params }: { params: { shorturl: string } }) => {
    const [originalUrl, setOriginalUrl] = useState<string>("ไม่พบลิ้งค์ของคุณ")
    const router = useRouter()

    useEffect(() => {
        const checkLink = async () => {
            const res = await fetch(`/api/short/${params.shorturl}`)
            const jsonData: any = await res.json()


            if (jsonData.success == false || jsonData.link == null) {
                setOriginalUrl("ไม่พบลิ้งค์ของคุณ")
                const confirmResult = await Swal.fire({
                  title: "แจ้งเตือนผู้ใช้",
                  text: "ไม่พบลิ้งค์นี้ในระบบ ลิ้งของคุณอาจจะไม่มีอยู่จริงหรือลิ้งค์หมดอายุแล้ว",
                  icon: "warning",
                  showCancelButton: false,
                  showConfirmButton: true,
                  cancelButtonColor: "#fff",
                  confirmButtonText: "รับทราบ",
              })
      
              if (confirmResult.isConfirmed === true) {
                  return router.push('/')
              }

              return false
            }

            setOriginalUrl(jsonData.link.originalUrl)

            return router.push(jsonData.link.originalUrl)
        }

        checkLink()
    }, [])
  return (
    <>
      <div className="rounded-md bg-white px-10 py-5">
        <h4 className="text-2xl text-black/40 font-bold"><span className="text-blue-400">TTBYTE</span> | <span className="text-black/60">Redirect to {originalUrl}</span></h4>
        <hr  className="mb-5"/>

        <div className="flex flex-col justify-center items-center">
          <img className="h-[700px] w-[700px]" src="https://gifdb.com/images/high/happy-cat-working-on-computer-cartoon-c2cinzv2rijwf3en.gif" alt="" />
        </div>
      </div>
    </>
  )
}

export default redirectPage