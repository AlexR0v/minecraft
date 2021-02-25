import { useState, useEffect } from "react"

function moveFieldByKey(key) {
  const keys = {
    ArrowUp: "moveForward",
    ArrowDown: "moveBackward",
    ArrowLeft: "moveLeft",
    ArrowRight: "moveRight",
    Space: "jump"
  }
  return keys[key]
}

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      setMovement(m => ({
        ...m,
        [moveFieldByKey(e.code)]: true
      }))
    }
    const handleKeyUp = (e) => {
      setMovement(m => ({
        ...m,
        [moveFieldByKey(e.code)]: false
      }))
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return movement
}
