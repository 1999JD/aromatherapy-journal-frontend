'use client'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
export default function QueryClientPlugin({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 分鐘內都當作 "新鮮" 資料
                retry: 1, // 失敗重試次數
                refetchOnWindowFocus: false, // 切回視窗不自動 refetch
            },
            mutations: {
                retry: 0, // mutation 失敗不重試
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )

}