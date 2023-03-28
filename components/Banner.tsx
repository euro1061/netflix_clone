import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Movie } from '../typing'
import { baseUrl } from '../constants/movie'
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[
        Math.floor(Math.random() * netflixOriginals.length - 1)
      ]
    )
  }, [])

  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
        <div className='absolute top-0 left-0 h-[95vh] w-[100vw] -z-10'>
            <Image 
              alt='banner'
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              fill
              style={{objectFit: 'cover'}}
            />
        </div>

        <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl line-clamp-4'>{movie?.overview}</p>

        <div className='flex space-x-3'>
          <button className='bannerButton bg-white text-black'>
            <PlayIcon className='h-4 w-4 text-black md:h-7 md:w-7'/> Play
          </button>
          <button 
            onClick={() => {
              setShowModal(true)
              setCurrentMovie(movie)
            }}
            className='bannerButton bg-[gray]/70'
          >
            More Info
            <InformationCircleIcon className='h-4 w-4 text-white md:h-7 md:w-7'/>
          </button>
        </div>
    </div>
  )
}

export default Banner