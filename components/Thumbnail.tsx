import React from 'react'
import { Movie } from '../typing'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  movie: Movie
}

const Thumbnail = ({
  movie
}: Props) => {

  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div
      onClick={() => {
        setShowModal(true)
        setCurrentMovie(movie)
      }}
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        fill
        alt='thumbnail'
        className='rounded-md object-cover md:rounded'
      />
    </div>
  )
}

export default Thumbnail