import { useEffect, useRef, useState } from "react"

function useInView({ threshold = 0 } = {}) {
    const [inView, setInView] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
            },
            { threshold }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [threshold])

    return { ref, inView }
}

export default useInView