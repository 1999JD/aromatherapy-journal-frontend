'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const { hasLogin } = useAuth()

    useEffect(() => {
        if (hasLogin) {
            router.replace('/') // 若已登入則導回首頁
        }
    }, [hasLogin, router])

    // 可選：還沒判斷完之前不渲染頁面
    if (hasLogin) return null

    return (
        <div>
            {children}
        </div>
    )
}
