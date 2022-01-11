import { useRef } from 'react'

const useDebounce = (func, wait) => {
  const timeout = useRef(null)

  return function (...args) {
    const self = this

    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      func.apply(self, args)
      clearTimeout(timeout.current)
    }, wait)
  }
}

export default useDebounce
