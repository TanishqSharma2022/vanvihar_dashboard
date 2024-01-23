import React from 'react'
import { SyncLoader } from "react-spinners";


export default function loading() {
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
        <SyncLoader color="#214D3C" />
    </div>
  )
}
