import React, { useRef, useState, useEffect } from 'react'

const categories = [
  { label: "All", icon: "🏠" },
  { label: "Beach", icon: "🏖️" },
  { label: "Windmills", icon: "🌬️" },
  { label: "Mountains", icon: "⛰️" },
  { label: "Pools", icon: "🏊" },
  { label: "Islands", icon: "🏝️" },
  { label: "Lake", icon: "🛶" },
  { label: "Castles", icon: "🏰" },
  { label: "Camping", icon: "⛺" },
  { label: "Arctic", icon: "❄️" },
  { label: "Desert", icon: "🏜️" },
  { label: "Tropical", icon: "🌴" },
  { label: "Amazing views", icon: "🌄" },
  { label: "Luxe", icon: "💎" },
]

export default function ScrollableFilters() {
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial state
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 border rounded-md"
      >
        {categories.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => setActiveCategory(label)}
            className={`inline-flex flex-col items-center justify-center gap-2 px-2.5 py-2 text-sm font-medium transition-colors hover:text-primary ${
              activeCategory === label ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

