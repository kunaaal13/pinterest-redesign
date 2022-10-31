import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>('')

  return (
    <div className='w-full min-h-screen bg-white text-black'>
      <Head>
        <title>Pinterest Redesign</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header query={query} setQuery={setQuery} />
    </div>
  )
}

export default Home
