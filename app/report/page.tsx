"use client";

import { useEffect } from "react"
import { useRouter  } from "next/navigation"
import Swal from "sweetalert2"

export default function Report() {
    const router = useRouter()

    useEffect(() => {
        const comingSoon = async () => {
        const confirmResult = await Swal.fire({
            title: "แจ้งเตือนผู้ใช้",
            text: "ตอนนี้ทางทีม ttbyte ยังไม่ได้เปิดให้ใช้บริการ เราจะเปิดให้บริการในเร็วๆนี้!",
            icon: "warning",
            showCancelButton: false,
            showConfirmButton: true,
            cancelButtonColor: "#fff",
            confirmButtonText: "รับทราบ",
        });

        if (confirmResult.isConfirmed === true) {
            router.push("/")
        }
        }

        comingSoon()
    })

  return (
    <>
      <div className="rounded-md bg-white px-10 py-5">
        <h4 className="text-2xl text-black/40 font-bold"><span className="text-blue-400">TTBYTE</span> | <span className="text-black/60">Report</span></h4>
        <hr  className="mb-5"/>
      </div>
    </>
  );
}