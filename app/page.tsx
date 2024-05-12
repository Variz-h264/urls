"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Swal from "sweetalert2"
import { useRouter  } from "next/navigation"

interface Error {
  error: boolean
  message: string
}

export default function Home() {
  const [ originalUrl, setOriginalUrl ] = useState<string>("")
  const [ customizeLink, setCustomizeLink ] = useState<string>("")
  const [ userIp, setUserIp ] = useState<string>("")
  const [ shortUrl, setShortUrl ] = useState<string>("")
  const [ error, setError ] = useState<Error>({ error: false, message: "" })
  const router = useRouter()

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        const jsonData = await res.json()

        setUserIp(jsonData.ip)
      } catch (error) {
        console.error('Error: ' + error)
      }
    }

    userInfo()
  }, [])

  const handleShorten = () => {
    if (originalUrl.trim().length === 0) {
      setError({ error: true, message: "กรุณากรอกลิ้งที่ต้องการย่อ" })
      return false
    }

    const send = async (userIp: string) => {
      try {
        const res = await fetch('/api/short', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ originalUrl, customizeLink })
        })

        const jsonData = await res.json()

        setShortUrl(jsonData.shortUrl)

        if (jsonData.success == true) {
            Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer
              }
          }).fire({
              icon: "success",
              html: `<div><h1 class='text-[#a5dc86] font-bold'>Success</h1><p class='text-white/80'>${jsonData.message}</p></div>`
          })

          const confirmResult = await Swal.fire({
            title: "คุณต้องการไปที่งลิ้งค์นี้เลยไหม",
            text: `ลิ้งค์สำหรับเข้าเว็บครั้งถัดไป https://ttshort.vercel.app/${jsonData.link}`,
            icon: "info",
            showCancelButton: false,
            showConfirmButton: true,
            cancelButtonColor: "#fff",
            confirmButtonText: "ไปเลยย!!!",
        })

        if (confirmResult.isConfirmed === true) {
            return router.push(`/${jsonData.shortUrl}`)
        }
        }

        if (jsonData.success == false) {
            Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer
              }
          }).fire({
              icon: "error",
              html: `<div><h1 class='text-[#f27474] font-bold'>Error</h1><p class='text-white/80'>${jsonData.message}</p></div>`
          })
        }

        console.log(jsonData)
      } catch (error: any) {
        console.error('Error: ' + error)

        await fetch('/api/report/discord', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: "report An error occurred in the system. Please check.", userIp })
        })

        await Swal.fire({
            title: "แจ้งเตือนผู้ใช้",
            text: `${error.message}`,
            icon: "warning",
            showCancelButton: false,
            showConfirmButton: true,
            cancelButtonColor: "#fff",
            confirmButtonText: "รับทราบ",
        })
      }
    }

    send(userIp)
  }

  if (error.error == true) {
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer
        }
    }).fire({
        icon: "error",
        html: `<div><h1 class='text-[#f27474] font-bold'>Error</h1><p class='text-white/80'>${error.message}</p></div>`
    })
  }

  return (
    <>
      <div className="rounded-md bg-white px-10 py-5">
        <h4 className="text-2xl text-black/40 font-bold"><span className="text-blue-400">TTBYTE</span> | <span className="text-black/60">ShortUrl</span></h4>
        <hr  className="mb-5"/>
        <div className="form-input">
          <p>ลิ้งค์ที่ต้องการย่อ</p>
          <input onChange={(e) => { setOriginalUrl(e.target.value); setError({ error: false, message: "" }) }} type="text" className="w-full" value={originalUrl} />
        </div>

        <div className="form-input">
          <p>ตั้งชื่อลิ้งค์ที่ต้องการ</p>
          <input onChange={(e) => { setCustomizeLink(e.target.value); setError({ error: false, message: "" }) }} type="text" className="w-full" value={customizeLink} />
        </div>

        <div className="flex flex-row justify-center items-center my-10">
          <button onClick={handleShorten} className="border rounded-lg text-blue-400 font-medium bg-blue-400/10 w-full px-10 py-2 transition-all ease-out hover:border-blue-400 hover:bg-blue-100">Short</button>
        </div>

        {shortUrl && shortUrl.trim().length > 0 && (
          <h1 className="text-2xl text-black/60 text-center font-medium">Go to link | <Link href={`https://ttshort.vercel.app/${shortUrl}`}><span className="text-blue-400">https://ttshort.vercel.app/{shortUrl}</span></Link></h1>
        )}
      </div>
    </>
  )
}