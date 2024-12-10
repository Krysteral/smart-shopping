# Smart Shopping Project

## Description
A web application that helps users find the best prices for their shopping lists across different stores in their area.

## Features
- Create and manage shopping lists
- Search stores by location (city or zip code)
- Compare prices across different stores
- View store inventories and product availability
- Calculate total costs for shopping lists at different stores

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-shopping.git
   cd smart-shopping
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```env
    MONGODB_URI=your_mongodb_connection_string
    PORT=10000
   ```

4. Seed the database:
   ```bash
   cd backend
   node scripts/seedDatabase.js
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products with store-specific pricing

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/nearby/:location` - Get stores by location (city or zip)

### Shopping Lists
- `GET /api/shopping-lists` - Get all shopping lists
- `POST /api/shopping-lists` - Create a new shopping list
- `DELETE /api/shopping-lists/:id` - Delete a shopping list

### Price Comparison
- `POST /api/compare-prices` - Compare prices across stores for a shopping list

## Database Schema

### Product
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number
}
```

### Store
```javascript
{
  name: String,
  city: String,
  zip: String,
  inventory: [{
    product: String,
    price: Number
  }]
}
```

### Shopping List
```javascript
{
  name: String,
  items: [{
    name: String,
    quantity: Number
  }]
}
```

## Running the Application

1. **Start the Backend Server**
```bash
cd backend
node server.js
```
The server will run on http://localhost:10000

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```
The application will open in your browser at http://localhost:3000

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `PORT`
4. Deploy

### Frontend (Netlify)
1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set environment variables:
   - `REACT_APP_API_URL`
4. Set build command: `npm run build`
5. Set publish directory: `build`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

Kien Giang - [kiengt365@gmail.com](mailto:kiengt365@gmail.com)

Project Link: [https://github.com/Krysteral/smart-shopping](https://github.com/Krysteral/smart-shopping)

