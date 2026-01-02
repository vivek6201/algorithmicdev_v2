import { useCallback, useEffect, useState } from "react"

function useInView({ threshold = 0, rootMargin = "0px" } = {}) {
    const [inView, setInView] = useState(false)
    const [node, setNode] = useState<HTMLElement | null>(null)

    const ref = useCallback((element: HTMLElement | null) => {
        setNode(element)
    }, [])

    useEffect(() => {
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
            },
            { threshold, rootMargin }
        )

        observer.observe(node)

        return () => {
            observer.disconnect()
        }
    }, [node, threshold, rootMargin])

    return { ref, inView }
}

export default useInView