import React from 'react'

const MessageSkeleton = () => {
  return (
    <div className='h-full w-full border-2 border-red-950 flex justify-center items-center'>
<span className="loading loading-infinity w-[17%] h-[17%] text-[#4f46e5]"></span>
</div>
  )
}

export default MessageSkeleton
