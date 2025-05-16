import { useQuery } from '@tanstack/react-query'

const mockData = [
    { id: "0", "name": "Stomache", "color": "#89bfcd" },
    { id: "1", "name": "Head Ache", "color": "#1ce5a1" },
    { id: "2", "name": "Sleep", "color": "#6fd34c" },
    { id: "3", "name": "Fatigue", "color": "#a597ee" },
    { id: "4", "name": "Digestion", "color": "#00eaff" },
    { id: "5", "name": "Acne", "color": "#FF6F61" },
    { id: "6", "name": "Immunity", "color": "#00796B" },
    { id: "7", "name": "Skin Care", "color": "#4C8C4A" },
    { id: "8", "name": "Mood Boost", "color": "#ffe600" },
    { id: "9", "name": "Stress Relief", "color": "#8fbfaf" },
    { id: "10", "name": "Meditation", "color": "#f05623" },
    { id: "11", "name": "Anxiety", "color": "#d4d9f6" },
    { id: "12", "name": "Respiratory", "color": "#0277BD" },
    { id: "13", "name": "Pain Relief", "color": "#fb2b86" },
    { id: "14", "name": "Romance", "color": "#E91E63" },
    { id: "15", "name": "Oily Skin", "color": "#8BC34A" },
    { id: "16", "name": "Inflammation", "color": "#FF8F00" },
    { id: "17", "name": "Bug Repellent", "color": "#cdebc2" },
    { id: "18", "name": "Muscle Pain", "color": "#C2185B" },
    { id: "19", "name": "Focus", "color": "#a89c2d" },
    { id: "20", "name": "Hair Growth", "color": "#c279ee" },
    { id: "21", "name": "Irritation", "color": "#FFA07A" }
]



export const queryKey = {
    all: ['tag'] as const,
    lists: () => [...queryKey.all, 'list'] as const,
    list: (query?: any) =>
        [...queryKey.lists(), query ?? ''] as const,
    shows: () => [...queryKey.all, 'show'] as const,
    show: (id: number) => [...queryKey.shows(), id] as const,
}



export interface TagVO {
    id: string
    name: string
    color: string
}

const fetchTag = async (): Promise<Array<TagVO>> => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // return data.filter((x: Post) => x.id <= limit)
    return mockData
}

const useGetTagList = () => {
    return useQuery({
        queryKey: queryKey.list(),
        queryFn: () => fetchTag(),
        select: (data) => {
            console.log('useGetTagList', mockData)
            return data
        },
    })
}

export { useGetTagList }