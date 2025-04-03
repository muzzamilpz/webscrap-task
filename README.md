1.Product Details Scraper 

Overview
This API scrapes product details from amazon website using Playwright. It logs in with user credentials, fetches order history, and allows searching for specific products.

Features
- Uses  Playwright  for web scraping.
- Supports login authentication.
- Extracts product details and order history.
- Handles MFA (manual intervention required).

Tech Stack
-  Node.js  (Backend runtime)
-  Express.js  (Server framework)
-  Playwright  (Web scraping library)
-  TypeScript  (Type safety)


2.Installation & Setup

Prerequisites
- Node.js (v16 or later)
- npm installed

Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/product-scraper.git
   cd product-scraper
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

  API Usage

    1. Fetch Product Details 
Endpoint: 
```http
POST http://localhost:3000/api/v1/fetchproductDetails
```

 Request Body: 
```json
{
  "username": "your-email@example.com",
  "password": "yourpassword",
  "search_string": "laptop"
}
```

 Response (Example): 
```json
[
    {
        "product_name": "Tide Plus Detergent Washing Powder - 6kg+2kg free | Jasmine & Rose Fragrance | Removes deep-seated Oil, Gravy, Tea Stains | 8kg, Pack of 1",
        "product_image": "https://m.media-amazon.com/images/I/71l5z0vNs3L._SS142_.jpg",
        "product_price": "₹699.00"
    }
]
```

 How Scraping Works
1.  Launch Browser:  Opens a new Chromium instance.
2.  Login: 
   - Enters email and password.
   - Detects incorrect credentials.
   - Handles MFA manually if required.
3.  Fetch Product Details: 
   - Navigates to order history or search results page.
   - Extracts product name, image, and price.
4.  Returns Scraped Data:  Sends the data as JSON response.
5.  Closes Browser:  Ensures session cleanup.

  Error Handling
-  Invalid Credentials:  Returns `401 Unauthorized`.
-  MFA Required:  Prompts for manual completion.
-  Scraping Errors:  Logs errors in the console.

Project Structure
```
product-scraper/
│── src/
│   ├── services/
│   │   ├── scrapper.ts     Scraper logic using Playwright
│   ├── models/
│   │   ├── userDetails.ts   User details model
│   ├── utils/
│   │   ├── constants.ts     URL & constants
│── index.ts      Express server
│── package.json
│── README.md
```


