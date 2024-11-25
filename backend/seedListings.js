
import mongoose from 'mongoose';
import Listing from './models/listingmodel.js';
mongoose.connect('mongodb+srv://saudsayyed59:ocVLcEWliIysYxM5@todo-app.ogepf.mongodb.net/?retryWrites=true&w=majority&appName=TODO-APP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const demoListings = [
    
    
        {
            "title": "Luxury Villa with Pool",
            "description": "A spacious luxury villa with a private pool and garden. Perfect for families or groups.",
            "image": "https://tse2.mm.bing.net/th?id=OIP.iWVc6qQ3bREAI53jeGDbhAHaEK&pid=Api&P=0&h=180",
            "price": 450,
            "country": "Italy",
            "location": "Amalfi Coast",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Modern Apartment in the City",
            "description": "A stylish apartment in the heart of the city. Ideal for couples or business travelers.",
            "image": "https://tse2.mm.bing.net/th?id=OIP.11y56p4CoiREyeuyfGD_egHaGM&pid=Api&P=0&h=180",
            "price": 120,
            "country": "USA",
            "location": "New York",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Cozy Beach House",
            "description": "Enjoy a cozy stay at this beach house with stunning ocean views.",
            "image": "https://tse2.mm.bing.net/th?id=OIP.kHKbwec7HpNmbauwmQNc1AHaE8&pid=Api&P=0&h=180",
            "price": 300,
            "country": "Australia",
            "location": "Bondi Beach",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Charming Countryside Cottage",
            "description": "Escape the city and relax in this charming countryside cottage.",
            "image": "https://tse3.mm.bing.net/th?id=OIP._l9Rp9zNqGcfKRHcDn6uigHaE7&pid=Api&P=0&h=180",
            "price": 150,
            "country": "France",
            "location": "Provence",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Penthouse Suite with Skyline Views",
            "description": "Experience luxury in this penthouse suite with breathtaking skyline views.",
            "image": "https://tse3.mm.bing.net/th?id=OIP.xJalfRSKHf0gKCg9GZM2-AHaE8&pid=Api&P=0&h=180",
            "price": 600,
            "country": "UAE",
            "location": "Dubai",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Rustic Mountain Cabin",
            "description": "A rustic cabin nestled in the mountains, perfect for outdoor enthusiasts.",
            "image": "https://tse4.mm.bing.net/th?id=OIP.FTECvVpaPvT_baSPbsgCAgHaFS&pid=Api&P=0&h=180",
            "price": 200,
            "country": "Canada",
            "location": "Banff",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Sunny Beachfront Villa",
            "description": "Relax in this sunny beachfront villa with direct access to the shore.",
            "image": "https://tse3.mm.bing.net/th?id=OIP.95VfV2d1b6oEl_nT2FcS-QHaDi&pid=Api&P=0&h=180",
            "price": 500,
            "country": "Spain",
            "location": "Barcelona",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Urban Loft",
            "description": "A trendy loft located in the vibrant downtown area.",
            "image": "https://tse2.mm.bing.net/th?id=OIP.NtueZ5nXHlW8mm1wYwi_KwHaE7&pid=Api&P=0&h=180",
            "price": 180,
            "country": "Germany",
            "location": "Berlin",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Lakefront Cabin",
            "description": "A quiet retreat by the lake with breathtaking views and serene surroundings.",
            "image": "https://tse1.mm.bing.net/th?id=OIP.6ccPiVsjbO-ZEy8Y2ESNPgHaE8&pid=Api&P=0&h=180",
            "price": 220,
            "country": "Switzerland",
            "location": "Zurich",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Tropical Island Bungalow",
            "description": "Stay in a private bungalow surrounded by tropical greenery.",
            "image": "https://tse1.mm.bing.net/th?id=OIP.kX4REAepkmvw-W1wLBZJDQHaFK&pid=Api&P=0&h=180",
            "price": 400,
            "country": "Thailand",
            "location": "Phuket",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Vintage Farmhouse",
            "description": "A cozy vintage farmhouse with modern amenities.",
            "image": "https://tse3.mm.bing.net/th?id=OIP.YvpJqhk4_1_WwjO0BpNsJgHaE7&pid=Api&P=0&h=180",
            "price": 160,
            "country": "USA",
            "location": "Texas",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Modern Condo",
            "description": "An elegant condo located near major attractions.",
            "image": "https://tse4.mm.bing.net/th?id=OIP.OzAWmF9XqdntY-fkDprWcwHaE7&pid=Api&P=0&h=180",
            "price": 300,
            "country": "Singapore",
            "location": "Marina Bay",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Hillside Villa",
            "description": "A villa perched on the hills with panoramic views of the valley.",
            "image": "https://tse4.mm.bing.net/th?id=OIP.XzHrN4VGo3GHc7frYfRsOQHaEA&pid=Api&P=0&h=180",
            "price": 500,
            "country": "Brazil",
            "location": "Rio de Janeiro",
            "owner": "671fdfc24e981d3d37d82925"
        },
        {
            "title": "Classic Apartment",
            "description": "A classic-style apartment with all modern facilities.",
            "image": "https://tse1.mm.bing.net/th?id=OIP.SDe5ggyQk1lQPFYDRqrNJwHaEK&pid=Api&P=0&h=180",
            "price": 140,
            "country": "Italy",
            "location": "Rome",
            "owner": "671fdfc24e981d3d37d82925"
        }
    
    
];

const seedDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(demoListings);
    console.log('Demo data inserted');
    mongoose.connection.close();
};

seedDB();