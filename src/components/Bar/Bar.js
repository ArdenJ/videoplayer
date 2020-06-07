import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const Bar = ({ current, time }) => {
  const barRef = useRef()
  const [x, setX] = useState({
    x: 0,
  })
  const [progress, setProgress] = useState(current.elapsed)

  useEffect(() => {
    const el = barRef.current
    setProgress((x.x / el.offsetWidth) * 100)
    time((progress / 100) * current.duration)
  }, [x])

  useEffect(() => {
    barRef.current.style = `
    background-image: linear-gradient(to right, palevioletred ${(current.elapsed / current.duration) *
      100}%, palegreen 0)`
  }, [current.elapsed])

  const handleMouseDown = e => {
    const handleMouseOffset = e => {
      if (e.offsetX < 0) setX({ x: 0 })
      setX({ x: e.offsetX })
    }
    document.addEventListener('mousemove', handleMouseOffset)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseOffset)
    })
  }

  return (
    <StyledBar bg={progress}>
      <div data-testid="bar" ref={barRef} className="bar" id="bar" onMouseDown={e => handleMouseDown(e.nativeEvent)} />
    </StyledBar>
  )
}

export default Bar

const StyledBar = styled.div`
  width: 80%;
  height: 10px;
  background-color: palegreen;

  .bar {
    width: 100%;
    height: 100%;
  }
`
