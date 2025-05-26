import { http, HttpResponse } from 'msw'

// const apiUrl = import.meta.env.VITE_API_URL
// const response = await fetch(`${apiUrl}/api/shop/items`)

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get('http://localhost:7000/api/shop/items', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
            [
                {
                    "id": 1,
                    "name": "Bash",
                    "price": 10,
                    "linesPerMillisecond": 0.1
                },
                {
                    "id": 2,
                    "name": "Git",
                    "price": 100,
                    "linesPerMillisecond": 1.2
                },
                {
                    "id": 3,
                    "name": "Javascript",
                    "price": 10000,
                    "linesPerMillisecond": 14
                },
                {
                    "id": 4,
                    "name": "React",
                    "price": 50000,
                    "linesPerMillisecond": 75
                },
                {
                    "id": 5,
                    "name": "Vim",
                    "price": 1000000,
                    "linesPerMillisecond": 10000
                }
            ]
        )
    }),
]