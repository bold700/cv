"use client"
import Masonry from "react-masonry-css"
import React from "react"

interface MasonryCardsProps {
  cards: React.ReactNode[]
}

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
}

export default function MasonryCards({ cards }: MasonryCardsProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-6"
      columnClassName="masonry-column flex flex-col gap-6"
    >
      {cards}
    </Masonry>
  )
} 