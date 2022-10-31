import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import Pin from './Pin'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  query: string
}

function Main({ query }: Props) {
  const [pins, setPins] = useState<Array<Object>>([])
  const [page, setPage] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)

  const [totalResults, setTotalResults] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      if (scrollTop + clientHeight === scrollHeight) {
        console.log('fetch more', page + 1)
        fetchMore()
      }

      window.removeEventListener('scroll', onScroll)
      return
    }
  }

  const fetchMore = async () => {
    if (totalResults <= pins.length) {
      setHasMore(false)
      return
    }

    if (query === '') {
      const res = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          count: 20,
        },
      })

      console.log(res.data)
      setPins([...pins, ...res.data])
      return
    }

    setPage(page + 1)

    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
        query: query,
        per_page: 20,
        page: page,
      },
    })

    console.log(res.data)
    setPins([...pins, ...res.data.results])
  }

  useEffect(() => {
    const fetch = async () => {
      setPage(1)
      if (query === '') {
        setTotalResults(100)
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
      setTotalResults(res.data.total)
      setPins(res.data.results)
    }

    fetch()
  }, [query])

  return (
    <div className='w-full px-5 md:px-16 lg:px-28 py-5 flex items-center justify-center'>
      <div ref={ref} onScroll={onScroll}>
        <InfiniteScroll
          next={fetchMore}
          hasMore={true}
          loader={
            <>
              <p>Loading...</p>
            </>
          }
          dataLength={pins.length}
          className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-8'
        >
          {pins && pins?.map((pin: any) => <Pin pin={pin} />)}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Main
