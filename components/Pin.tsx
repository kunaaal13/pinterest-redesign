import Link from 'next/link'
import React from 'react'

type Props = {
  pin: any
}

function Pin({ pin }: Props) {
  const random: number = Math.floor(Math.random() * 10) + 1

  return (
    <div>
      <Link href={pin.links.download}>
        <img
          src={pin.urls.regular}
          alt=''
          className={`w-full mb-6 rounded-md ${
            random % 2 == 0 ? 'aspect-video' : 'aspect-square'
          } cursor-pointer`}
        />
      </Link>
    </div>
  )
}

export default Pin
