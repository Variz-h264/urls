const footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
  return (
    <footer className='text-lg mt-16 px-5 sm:px-0'>
        <div className='flex flex-row justify-center'>
            <span className="text-black/60">&copy; { currentYear } ttbyte-urls | made with ❤️ by team techtitanbyte(variz.h264) - [CORE V1.0.0NEXT] | all rights reserved.</span>
        </div>
    </footer>
  )
}

export default footer