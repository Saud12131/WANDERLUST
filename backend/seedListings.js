const mongoose = require('mongoose');
const Listing = require('./models/listingmodel') // Adjust the path to your Listing model

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
        owner: '671ea0f629e94af52d7ab460',
        title: 'Modern Villa with Pool',
        description: 'A luxurious villa with a private pool and modern amenities.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 450000,
        country: 'Spain',
        location: 'Marbella'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Charming Country Cottage',
        description: 'A quaint cottage surrounded by beautiful countryside.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 120000,
        country: 'France',
        location: 'Provence'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'City Apartment with Skyline View',
        description: 'An upscale apartment with a breathtaking view of the city skyline.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 350000,
        country: 'USA',
        location: 'New York City'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Beachfront Bungalow',
        description: 'A beautiful bungalow located right on the beach.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 500000,
        country: 'Australia',
        location: 'Gold Coast'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Historic Manor House',
        description: 'A large historic house with antique features and a grand garden.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 750000,
        country: 'UK',
        location: 'Cotswolds'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Modern Studio Apartment',
        description: 'A compact studio perfect for urban living.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 95000,
        country: 'Japan',
        location: 'Tokyo'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Luxury Penthouse Suite',
        description: 'A top-floor penthouse with stunning city views and luxury finishes.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 1200000,
        country: 'Singapore',
        location: 'Marina Bay'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Cozy Mountain Cabin',
        description: 'A rustic cabin nestled in the mountains for a peaceful retreat.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 180000,
        country: 'Canada',
        location: 'Banff'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Spacious Family Home',
        description: 'A large family home with multiple bedrooms and a spacious backyard.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 320000,
        country: 'USA',
        location: 'San Diego'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Elegant Loft in Historic District',
        description: 'A stylish loft located in a historic part of the city.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 260000,
        country: 'Italy',
        location: 'Florence'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Serene Lakeside Villa',
        description: 'A peaceful villa with stunning views of the lake.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 540000,
        country: 'Switzerland',
        location: 'Lake Geneva'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Artistic Loft with City Views',
        description: 'A unique loft with an artistic vibe and panoramic city views.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 300000,
        country: 'Netherlands',
        location: 'Amsterdam'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Secluded Desert Home',
        description: 'A private home in the desert with amazing views.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 220000,
        country: 'USA',
        location: 'Arizona'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Contemporary Urban Apartment',
        description: 'A chic apartment with modern decor and amenities.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 280000,
        country: 'Germany',
        location: 'Berlin'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Traditional Family House',
        description: 'A classic home with traditional architecture and a lovely garden.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 310000,
        country: 'Ireland',
        location: 'Dublin'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Bright Studio Near Beach',
        description: 'A compact and bright studio just a short walk from the beach.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 150000,
        country: 'Greece',
        location: 'Santorini'
    },
    {
        owner: '671ea0f629e94af52d7ab460',
        title: 'Scenic Cabin in the Woods',
        description: 'A cozy cabin surrounded by tall trees and natural beauty.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.0Cf3z9U6wCTUSsWWsQD2MgHaHg&pid=Api&P=0&h=180',
        price: 180000,
        country: 'Finland',
        location: 'Lapland'
    },


];

const seedDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(demoListings);
    console.log('Demo data inserted');
    mongoose.connection.close();
};

seedDB();