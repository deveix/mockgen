import { useRef, useEffect, useCallback } from "react"

export function useResvgWorker() {
  const workerRef = useRef<Worker | null>(null)
  const pendingRef = useRef(new Map<number, (url: string) => void>())

  useEffect(() => {
    if (typeof window === "undefined") return
    const worker = new Worker(
      new URL("../components/resvg-worker.ts", import.meta.url)
    )
    worker.onmessage = (e) => {
      const { _id, url } = e.data
      const resolve = pendingRef.current.get(_id)
      if (resolve) {
        resolve(url)
        pendingRef.current.delete(_id)
      }
    }
    workerRef.current = worker
    return () => {
      worker.terminate()
      workerRef.current = null
      pendingRef.current.clear()
    }
  }, [])

  const renderPNG = useCallback(
    (msg: object) => {
      if (!workerRef.current) return Promise.reject("Worker not initialized")
      const _id = Math.random()
      workerRef.current.postMessage({ ...msg, _id })
      return new Promise<string>((resolve) => {
        pendingRef.current.set(_id, resolve)
      })
    },
    []
  )

  return renderPNG
}
