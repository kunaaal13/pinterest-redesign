import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import Pin from './Pin'

type Props = {
  query: string
}

function Main({ query }: Props) {
  const [pins, setPins] = useState<Array<Object>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      if (scrollTop + clientHeight === scrollHeight) {
        console.log('fetch more', page + 1)
        setPage(page + 1)
        fetchMore()
      }

      window.removeEventListener('scroll', onScroll)
      return
    }
  }

  const fetchMore = async () => {
    if (query === '') {
      const res = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          count: 30,
        },
      })

      console.log(res.data)
      setPins([...pins, ...res.data])
      return
    }

    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
        query: query,
        per_page: 30,
      },
    })

    console.log(res.data)
    setPins([...pins, ...res.data.results])
  }

  useEffect(() => {
    const fetch = async () => {
      setPage(1)
      if (query === '') {
        const res = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            count: 30,
          },
        })

        console.log(res.data)
        setPins(res.data)
        return
      }

      const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          query: query,
          per_page: 30,
        },
      })

      console.log(res.data)
      setPins(res.data)
    }

    fetch()
  }, [query])

  return (
    <div className='w-full px-5 md:px-16 lg:px-28 py-5 flex items-center justify-center'>
      <div
        ref={ref}
        onScroll={onScroll}
        className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-8'
      >
        {pins?.map((pin: any) => (
          <Pin pin={pin} />
        ))}
      </div>
    </div>
  )
}

export default Main
