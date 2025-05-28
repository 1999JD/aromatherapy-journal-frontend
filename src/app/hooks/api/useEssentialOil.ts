import { useQuery } from '@tanstack/react-query'

const mockData = [
    {
        "id": 1,
        "title": "Highland Lavender",
        "description": "Highland True Lavender Essential Oil is distilled from Lavandula angustifolia grown at high altitudes. \n Its gentle floral aroma promotes deep relaxation and emotional balance.\n Rich in esters, it soothes the skin and supports restful sleep.\n Ideal for aromatherapy, skincare, and natural stress relief.",
        "tags": [
            {
                "id": "0",
                "name": "Stomache",
                "color": "#89bfcd"
            },
            {
                "id": "1",
                "name": "Head Ache",
                "color": "#1ce5a1"
            },
            {
                "id": "2",
                "name": "Sleep",
                "color": "#6fd34c"
            },
            {
                "id": "3",
                "name": "Fatigue",
                "color": "#a597ee"
            },
            {
                "id": "4",
                "name": "Digestion",
                "color": "#00eaff"
            }
        ]
    },
    {
        "id": 2,
        "title": "Peppermint",
        "description": "Peppermint Essential Oil is steam distilled from Mentha piperita leaves. \n Known for its invigorating minty aroma, it refreshes the mind and promotes mental clarity.\n It also soothes digestive discomfort and relieves tension headaches.\n Commonly used in massage, diffusers, and personal care.",
        "tags": [
            {
                "id": "1",
                "name": "Head Ache",
                "color": "#1ce5a1"
            },
            {
                "id": "3",
                "name": "Fatigue",
                "color": "#a597ee"
            },
            {
                "id": "4",
                "name": "Digestion",
                "color": "#00eaff"
            }
        ]
    },
    {
        "id": 3,
        "title": "Tea Tree",
        "description": "Tea Tree Essential Oil is extracted from the leaves of Melaleuca alternifolia.\n It possesses strong antibacterial and antifungal properties.\n Supports clear skin, immune defense, and respiratory wellness.\n A staple for skincare routines and DIY cleaning solutions.",
        "tags": [
            {
                "id": "5",
                "name": "Acne",
                "color": "#FF6F61"
            },
            {
                "id": "6",
                "name": "Immunity",
                "color": "#00796B"
            },
            {
                "id": "7",
                "name": "Skin Care",
                "color": "#4C8C4A"
            }
        ]
    },
    {
        "id": 4,
        "title": "Sweet Orange",
        "description": "Sweet Orange Essential Oil is cold-pressed from Citrus sinensis peels.\n Its bright citrus scent uplifts mood and reduces stress.\n Helps with digestion and refreshes the air when diffused.\n Ideal for emotional wellness and natural cleaning.",
        "tags": [
            {
                "id": "8",
                "name": "Mood Boost",
                "color": "#ffe600"
            },
            {
                "id": "4",
                "name": "Digestion",
                "color": "#00eaff"
            },
            {
                "id": "9",
                "name": "Stress Relief",
                "color": "#8fbfaf"
            }
        ]
    },
    {
        "id": 5,
        "title": "Frankincense",
        "description": "Frankincense Essential Oil is steam distilled from the resin of Boswellia trees.\n Revered for its grounding and meditative qualities.\n Supports healthy skin, reduces signs of aging, and enhances deep breathing.\n Frequently used in spiritual rituals and skincare.",
        "tags": [
            {
                "id": "10",
                "name": "Meditation",
                "color": "#f05623"
            },
            {
                "id": "7",
                "name": "Skin Care",
                "color": "#4C8C4A"
            },
            {
                "id": "11",
                "name": "Anxiety",
                "color": "#d4d9f6"
            }
        ]
    },
    {
        "id": 6,
        "title": "Eucalyptus",
        "description": "Eucalyptus Essential Oil is distilled from Eucalyptus globulus leaves.\n Its crisp aroma promotes respiratory clarity and soothes muscle aches.\n Known for its decongestant properties and energizing effect.\n Excellent for inhalation and muscle rubs.",
        "tags": [
            {
                "id": "12",
                "name": "Respiratory",
                "color": "#0277BD"
            },
            {
                "id": "3",
                "name": "Fatigue",
                "color": "#a597ee"
            },
            {
                "id": "13",
                "name": "Pain Relief",
                "color": "#fb2b86"
            }
        ]
    },
    {
        "id": 7,
        "title": "Ylang Ylang",
        "description": "Ylang Ylang Essential Oil is steam distilled from the Cananga odorata flower.\n Its exotic floral scent calms the heart and eases emotional tension.\n Helps balance sebum production and supports romantic moods.\n Popular in perfumes and skincare.",
        "tags": [
            {
                "id": "11",
                "name": "Anxiety",
                "color": "#d4d9f6"
            },
            {
                "id": "14",
                "name": "Romance",
                "color": "#E91E63"
            },
            {
                "id": "15",
                "name": "Oily Skin",
                "color": "#8BC34A"
            }
        ]
    },
    {
        "id": 8,
        "title": "Lemongrass",
        "description": "Lemongrass Essential Oil is extracted from Cymbopogon citratus.\n It has a fresh, citrusy aroma that revitalizes the senses.\n Known for anti-inflammatory effects, it supports pain relief and natural insect repellent.\n Great for massage oils and sprays.",
        "tags": [
            {
                "id": "16",
                "name": "Inflammation",
                "color": "#FF8F00"
            },
            {
                "id": "17",
                "name": "Bug Repellent",
                "color": "#cdebc2"
            },
            {
                "id": "18",
                "name": "Muscle Pain",
                "color": "#C2185B"
            }
        ]
    },
    {
        "id": 9,
        "title": "Rosemary",
        "description": "Rosemary Essential Oil is steam distilled from Rosmarinus officinalis leaves.\n Enhances memory, mental alertness, and hair growth.\n Its herbal scent awakens the senses and supports respiratory health.\n Common in haircare and concentration blends.",
        "tags": [
            {
                "id": "19",
                "name": "Focus",
                "color": "#a89c2d"
            },
            {
                "id": "20",
                "name": "Hair Growth",
                "color": "#c279ee"
            },
            {
                "id": "12",
                "name": "Respiratory",
                "color": "#0277BD"
            }
        ]
    },
    {
        "id": 10,
        "title": "Chamomile Roman",
        "description": "Chamomile Roman Essential Oil is distilled from Anthemis nobilis flowers.\n Gentle and calming, it’s ideal for sensitive skin and promoting restful sleep.\n Reduces irritation and soothes emotional distress.\n Perfect for bedtime rituals and baby care.",
        "tags": [
            {
                "id": "2",
                "name": "Sleep",
                "color": "#6fd34c"
            },
            {
                "id": "21",
                "name": "Irritation",
                "color": "#FFA07A"
            },
            {
                "id": "9",
                "name": "Stress Relief",
                "color": "#8fbfaf"
            }
        ]
    }
]


export const queryKey = {
    all: ['essential-oil'] as const,
    lists: () => [...queryKey.all, 'list'] as const,
    list: (query?: any) =>
        [...queryKey.lists(), query ?? ''] as const,
    shows: () => [...queryKey.all, 'show'] as const,
    show: (id: number) => [...queryKey.shows(), id] as const,
}



export interface EssentialOilVO {
    id: number
    title: string
    description: string
    tags: Array<{
        id: string | number
        name: string
        color: string
    }>
}

const fetchEssentialOilList = async (): Promise<Array<EssentialOilVO>> => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // return data.filter((x: Post) => x.id <= limit)
    return mockData
}

const fetchEssentialOilDetail = async (id: string | number): Promise<EssentialOilVO | undefined> => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // return data.filter((x: Post) => x.id <= limit)
    return mockData.find(ele => ele.id.toString() === id)
}

const useGetEssentialOilList = () => {
    return useQuery({
        queryKey: queryKey.list(),
        queryFn: () => fetchEssentialOilList(),
        select: (data) => {
            return data
        }
    })
}

const useGetEssentialOilDetail = (id?: number | string) => {
    const numericId = typeof id === 'string' ? Number(id) : id
    return useQuery({
        queryKey: queryKey.show(numericId!),
        queryFn: () => fetchEssentialOilDetail(id!),
        select: (data) => {
            return data
        },
        enabled: !!id
    })

}


export { useGetEssentialOilList, useGetEssentialOilDetail }