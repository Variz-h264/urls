"use client"

import { useEffect, useState } from "react"
import { useRouter  } from "next/navigation"
import Image from "next/image"
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

export default function Redirect ({ params }: { params: { shorturl: string } }) {
    const [originalUrl, setOriginalUrl] = useState<string>("กรุณารอสักครู่...")
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
    })
  return (
    <>
      <div className="rounded-md bg-white px-10 py-5">
        <h4 className="text-2xl text-black/40 font-bold"><span className="text-blue-400">TTBYTE</span> | <span className="text-black/60">Redirect to {originalUrl}</span></h4>
        <hr  className="mb-5"/>

        <div className="flex flex-col justify-center items-center">
          <Image src="/images/loading.gif" alt="" width={600} height={600} />
        </div>
      </div>
    </>
  )
}