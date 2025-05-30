"use client"
import React from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"

interface MasonryCardsProps {
  cards: React.ReactNode[] // platte array
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
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          {card || null}
        </motion.div>
      ))}
    </Masonry>
  )
} 