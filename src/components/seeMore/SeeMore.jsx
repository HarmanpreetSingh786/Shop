import React from 'react'

function SeeMore() {
  return (
    <div>
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className='border-2 hover:shadow-xl hover:shadow-gray-200 hover:bg-red border-gray-200 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg bg-gray-300 '>See more</button>
        </Link>
      </div>
    </div>
  )
}

export default SeeMore
