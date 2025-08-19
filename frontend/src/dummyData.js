export const posts = [
    {
        _id: 1,
        title: "BMW",
        description: "About BMW",
        category: "cars",
        image: "/images/bmw.jpg",
        likes: [1,2],
        createdAt: "Fri May 04 2025",
        user: {
            username: "Ahmed Eid",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 2,
        title: "JavaScript",
        description: "About JavaScript",
        category: "programming",
        image: "/images/javascript.jpeg",
        likes: [1,2,3,4],
        createdAt: "Sun Jul 06 2025",
        user: {
            username: "Aly Mohamed",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 3,
        title: "good destination for summer",
        description: "About Travelling",
        category: "travelling",
        image: "/images/istanbul.jpg",
        likes: [],
        createdAt: "Fri May 08 2025",
        user: {
            username: "Mohamed Eid",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 4,
        title: "Nanga Parbat",
        description: "About Nanga Parbat",
        category: "nature",
        image: "/images/nangaparbat.jpg",
        likes: [1,2,3,4,5],
        createdAt: "Mon Jul 06 2025",
        user: {
            username: "Ahmed Eid",
            image: "/images/user-avatar.png"
        },
    },
    {
        _id: 5,
        title: "Cairo",
        description: "About Baghdad",
        category: "travelling",
        image: "/images/baghdad.jpg",
        likes: [1,2,3],
        createdAt: "Fri Aug 12 2025",
        user: {
            username: "Aly Mohamed",
            image: "/images/user-avatar.png"
        }
    },
    {
        _id: 6,
        title: "Turkish Coffee",
        description: "About Turkish Coffee",
        category: "coffee & tea",
        image: "/images/coffee.jpg",
        likes: [1],
        createdAt: "Fri Jun 21 20225",
        user: {
            username: "Mohamed Eid",
            image: "/images/user-avatar.png"
        }
    },
];


export const categories = [
    {
        _id: 1,
        title: 'travelling',
    },
    {
        _id: 2,
        title: 'music',
    },
    {
        _id: 3,
        title: 'programming',
    },
    {
        _id: 4,
        title: 'cars',
    },
    {
        _id: 5,
        title: 'nature',
    },
    {
        _id: 6,
        title: 'coffee & tea',
    },
]
