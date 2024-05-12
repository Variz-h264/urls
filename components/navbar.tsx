import Link from "next/link"

const navbar = () => {
  return (
    <>  
        <nav className="flex flex-row justify-between items-center rounded-b-lg rounded-t-none bg-white px-10 py-3 mb-14">
            <Link href={'/'}>
                <div className="hidden lg:block border rounded-lg bg-white shadow-sm px-16 py-2 transition-all ease-out hover:border-blue-400 hover:bg-blue-100 hover:scale-95">
                    <h1 className="text-2xl text-blue-400 font-bold">Home</h1>
                </div>
            </Link>
            
            <Link href={'https://ttbyte.web.app'}>
                <div className="flex flex-col items-center border rounded-full bg-white shadow-sm px-20 lg:px-28 py-2 transition-all ease-out hover:border-blue-400 hover:bg-blue-100 hover:scale-95">
                    <h1 className="text-3xl lg:text-5xl text-blue-400 font-extrabold">TTBYTE</h1>
                    <span className="text-sm text-black/60 font-normal">service short url</span>
                </div>
            </Link>
            
            <Link href={'/report'}>
                <div className="hidden lg:block border rounded-lg bg-white shadow-sm px-16 py-2 transition-all ease-out hover:border-blue-400 hover:bg-blue-100 hover:scale-95">
                    <h1 className="text-2xl text-blue-400 font-bold">Report</h1>
                </div>
            </Link>
        </nav>
    </>
  )
}

export default navbar