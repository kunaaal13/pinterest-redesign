import Image from 'next/image'
import React, { useState } from 'react'
import {
  BiChevronDown,
  BiBell,
  BiMessageSquareDots,
  BiSearch,
} from 'react-icons/bi'

type Props = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

function Header({ query, setQuery }: Props) {
  const [selected, setSelected] = useState<string>('Home')
  const [input, setInput] = useState<string>('')

  const handleSearch = () => {
    if (input === query) return
    setQuery(input)
  }

  return (
    <div className='w-full h-20 border rounded-lg shadow-md px-5 py-1 flex items-center justify-center'>
      <div className='w-full h-16 flex items-center'>
        {/* Left  */}
        <div className='flex items-center'>
          {/* Logo */}
          <div className='h-12 w-12 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer'>
            <Image src='/logo.png' alt='' height={25} width={25} />
          </div>

          {/* Home */}
          <div
            className={`${
              selected === 'Home' ? 'bg-black text-white' : ''
            }  px-4 py-3 rounded-full cursor-pointer font-semibold hidden sm:inline-flex`}
            onClick={() => {
              setSelected('Home')
            }}
          >
            <h3>Home</h3>
          </div>

          {/* Today */}
          <div
            className={`${
              selected === 'Today' ? 'bg-black text-white' : ''
            }  px-4 py-3 rounded-full cursor-pointer font-semibold hidden sm:inline-flex`}
            onClick={() => {
              setSelected('Today')
            }}
          >
            <h3>Today</h3>
          </div>

          {/* Create */}
          <div
            className={`px-4 py-3 rounded-full cursor-pointer font-semibold hidden sm:inline-flex items-center`}
          >
            <h3>Create</h3>
            <BiChevronDown className='h-6 w-6' />
          </div>

          {/* On Small Screens */}
          <div className='flex items-center sm:hidden text-semibold px-4 py-3 rounded-full cursor-pointer font-semibold hover:bg-gray-200'>
            <h3>Home</h3>
            <BiChevronDown className='h-6 w-6' />
          </div>
        </div>

        {/* Middle */}
        <div className='flex items-center border rounded-3xl flex-1 px-4 bg-[#e9e9e9] h-12'>
          <BiSearch
            className='h-5 w-5 text-[#767676] font-bold cursor-pointer'
            onClick={handleSearch}
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Search'
            className='bg-[#e9e9e9] ml-2 h-full w-full placeholder:text-[#767676] placeholder:text-lg outline-none'
          />
        </div>

        {/* Right */}
        <div className='ml-2 hidden sm:inline-flex items-center h-12'>
          <div className='h-full w-12 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer'>
            <BiBell className='h-7 w-7 text-[#767676] font-bold' />
          </div>

          <div className='h-full w-12 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer'>
            <BiMessageSquareDots className='h-7 w-7 text-[#767676] font-bold' />
          </div>

          <div className='h-full w-12 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer'>
            <Image
              src='/salman.jpeg'
              alt=''
              height={30}
              width={30}
              className='rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
