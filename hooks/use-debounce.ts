"use client"

import { useState, useEffect, useMemo } from "react"
import { debounce } from "lodash"

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    const debouncedUpdate = useMemo(
        () => debounce((newValue: T) => setDebouncedValue(newValue), delay),
        [delay]
    )

    useEffect(() => {
        debouncedUpdate(value)
        return () => debouncedUpdate.cancel()
    }, [value, debouncedUpdate])

    // Cleanup on unmount
    useEffect(() => {
        return () => debouncedUpdate.cancel()
    }, [debouncedUpdate])

    return debouncedValue
}
