"use client"

import { useRouter } from 'next/navigation'
import { useCallback, useRef } from "react"

const Modal = ({ children }: { children: React.ReactNode }) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.push('/')
    }, [router])

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (e.target === overlay.current && onDismiss)
            onDismiss()
    }, [onDismiss, overlay])

    return (
        <div ref={overlay}
            onClick={handleClick}
            className="">
            <div ref={wrapper}
                className="">
                {children}
            </div>
        </div>
    )
}

export default Modal