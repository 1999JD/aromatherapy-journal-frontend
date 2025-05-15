import { useQuery } from '@tanstack/react-query'

const mockData = [
    {
        id: 1,
        title: 'Highland Lavender',
        description: 'Highland True Lavender Essential Oil is distilled from Lavandula angustifolia grown at high altitudes. \n Its gentle floral aroma promotes deep relaxation and emotional balance.\n Rich in esters, it soothes the skin and supports restful sleep.\n Ideal for aromatherapy, skincare, and natural stress relief.',
        tags: [
            { name: 'Stomache', color: '#89bfcd' },
            { name: 'Head Ache', color: '#1ce5a1' },
            { name: 'Sleep', color: '#6fd34c' },
            { name: 'Fatigue', color: '#a597ee' },
            { name: 'Digestion', color: '#00eaff' }
        ]
    },
    {
        id: 2,
        title: 'Peppermint',
        description: 'Peppermint Essential Oil is steam distilled from Mentha piperita leaves. \n Known for its invigorating minty aroma, it refreshes the mind and promotes mental clarity.\n It also soothes digestive discomfort and relieves tension headaches.\n Commonly used in massage, diffusers, and personal care.',
        tags: [
            { name: 'Head Ache', color: '#1ce5a1' },
            { name: 'Fatigue', color: '#a597ee' },
            { name: 'Digestion', color: '#00eaff' }
        ]
    },
    {
        id: 3,
        title: 'Tea Tree',
        description: 'Tea Tree Essential Oil is extracted from the leaves of Melaleuca alternifolia.\n It possesses strong antibacterial and antifungal properties.\n Supports clear skin, immune defense, and respiratory wellness.\n A staple for skincare routines and DIY cleaning solutions.',
        tags: [
            { name: 'Acne', color: '#FF6F61' },
            { name: 'Immunity', color: '#00796B' },
            { name: 'Skin Care', color: '#4C8C4A' }
        ]
    },
    {
        id: 4,
        title: 'Sweet Orange',
        description: 'Sweet Orange Essential Oil is cold-pressed from Citrus sinensis peels.\n Its bright citrus scent uplifts mood and reduces stress.\n Helps with digestion and refreshes the air when diffused.\n Ideal for emotional wellness and natural cleaning.',
        tags: [
            { name: 'Mood Boost', color: '#ffe600' },
            { name: 'Digestion', color: '#00eaff' },
            { name: 'Stress Relief', color: '#8fbfaf' }
        ]
    },
    {
        id: 5,
        title: 'Frankincense',
        description: 'Frankincense Essential Oil is steam distilled from the resin of Boswellia trees.\n Revered for its grounding and meditative qualities.\n Supports healthy skin, reduces signs of aging, and enhances deep breathing.\n Frequently used in spiritual rituals and skincare.',
        tags: [
            { name: 'Meditation', color: '#f05623' },
            { name: 'Skin Care', color: '#4C8C4A' },
            { name: 'Anxiety', color: '#d4d9f6' }
        ]
    },
    {
        id: 6,
        title: 'Eucalyptus',
        description: 'Eucalyptus Essential Oil is distilled from Eucalyptus globulus leaves.\n Its crisp aroma promotes respiratory clarity and soothes muscle aches.\n Known for its decongestant properties and energizing effect.\n Excellent for inhalation and muscle rubs.',
        tags: [
            { name: 'Respiratory', color: '#0277BD' },
            { name: 'Fatigue', color: '#a597ee' },
            { name: 'Pain Relief', color: '#fb2b86' }
        ]
    },
    {
        id: 7,
        title: 'Ylang Ylang',
        description: 'Ylang Ylang Essential Oil is steam distilled from the Cananga odorata flower.\n Its exotic floral scent calms the heart and eases emotional tension.\n Helps balance sebum production and supports romantic moods.\n Popular in perfumes and skincare.',
        tags: [
            { name: 'Anxiety', color: '#d4d9f6' },
            { name: 'Romance', color: '#E91E63' },
            { name: 'Oily Skin', color: '#8BC34A' }
        ]
    },
    {
        id: 8,
        title: 'Lemongrass',
        description: 'Lemongrass Essential Oil is extracted from Cymbopogon citratus.\n It has a fresh, citrusy aroma that revitalizes the senses.\n Known for anti-inflammatory effects, it supports pain relief and natural insect repellent.\n Great for massage oils and sprays.',
        tags: [
            { name: 'Inflammation', color: '#FF8F00' },
            { name: 'Bug Repellent', color: '#cdebc2' },
            { name: 'Muscle Pain', color: '#C2185B' }
        ]
    },
    {
        id: 9,
        title: 'Rosemary',
        description: 'Rosemary Essential Oil is steam distilled from Rosmarinus officinalis leaves.\n Enhances memory, mental alertness, and hair growth.\n Its herbal scent awakens the senses and supports respiratory health.\n Common in haircare and concentration blends.',
        tags: [
            { name: 'Focus', color: '#a89c2d' },
            { name: 'Hair Growth', color: '#c279ee' },
            { name: 'Respiratory', color: '#0277BD' }
        ]
    },
    {
        id: 10,
        title: 'Chamomile Roman',
        description: 'Chamomile Roman Essential Oil is distilled from Anthemis nobilis flowers.\n Gentle and calming, it’s ideal for sensitive skin and promoting restful sleep.\n Reduces irritation and soothes emotional distress.\n Perfect for bedtime rituals and baby care.',
        tags: [
            { name: 'Sleep', color: '#6fd34c' },
            { name: 'Irritation', color: '#FFA07A' },
            { name: 'Stress Relief', color: '#8fbfaf' }
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
        name: string
        color: string
    }>
}

const fetchEssentialOil = async (): Promise<Array<EssentialOilVO>> => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // return data.filter((x: Post) => x.id <= limit)
    return mockData
}

const useGetEssentialOilList = () => {
    return useQuery({
        queryKey: queryKey.list(),
        queryFn: () => fetchEssentialOil(),
        select: (data) => {
            return data
        }
    })
}

export { useGetEssentialOilList, fetchEssentialOil }