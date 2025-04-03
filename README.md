
# Product Details Scraper

## Overview
The Product Details Scraper is a robust API designed to scrape product details from Amazon using [Playwright](https://playwright.dev/). It automates the process of logging in with user credentials, fetching order history, and searching for specific products.

This scraper is particularly useful for:
- Automating the retrieval of product details.
- Extracting order history for analytics or reporting.
- Searching for specific products programmatically.

---

## Key Features
- Web Scraping with Playwright: Utilizes Playwright for reliable and efficient web scraping.
- Login Authentication: Supports secure login with user credentials.
- Order History Extraction: Fetches detailed order history from Amazon accounts.
- Product Search: Allows users to search for specific products by name or keyword.
- MFA Handling: Provides support for manual Multi-Factor Authentication (MFA) when required.
- Type Safety: Built with TypeScript for enhanced type safety and error prevention.

---

## Tech Stack
- Backend Runtime: Node.js (v16 or later)
- Server Framework: Express.js
- Web Scraping Library: Playwright
- Programming Language: TypeScript (for type safety and maintainability)

---

## Installation & Setup

### Prerequisites
Before getting started, ensure you have the following installed on your system:
- Node.js (v16 or later)
- npm (Node Package Manager)

### Steps
1. Clone the Repository  
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/muzzamilpz/webscrap-task.git
   cd webscrap-task
   ```

2. Install Dependencies  
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. Start the Server  
   Run the server using `ts-node`:
   ```bash
   npx ts-node index.ts
   ```
   The server will start running on `http://localhost:3000`.

---

## API Usage

### Fetch Product Details
#### Endpoint
```http
POST http://localhost:3000/api/v1/fetchproductDetails
```

#### Request Body
Provide the following JSON payload in the request body:
```json
{
  "username": "your-email@example.com",
  "password": "yourpassword",
  "search_string": "laptop"
}
```

#### Response Example
On successful execution, the API will return a JSON array containing product details:
```json
[
    {
        "product_name": "Dell XPS 13 Laptop - 13.4\" FHD+ Touchscreen, Intel Core i7, 16GB RAM, 512GB SSD",
        "product_image": "https://m.media-amazon.com/images/I/71l5z0vNs3L._SS142_.jpg",
        "product_price": "₹99,999.00"
    },
    {
        "product_name": "HP Pavilion 15 Laptop - 15.6\" Full HD, AMD Ryzen 5, 8GB RAM, 256GB SSD",
        "product_image": "https://m.media-amazon.com/images/I/81jx2vQsWgL._SS142_.jpg",
        "product_price": "₹74,999.00"
    }
]
```

---

## How Scraping Works
The scraper follows a structured workflow to ensure reliable and accurate data extraction:

1. Launch Browser:  
   A new Chromium browser instance is launched using Playwright.

2. Login Process:  
   - Enters the provided email and password into Amazon's login form.
   - Detects and handles invalid credentials gracefully.
   - If Multi-Factor Authentication (MFA) is required, the user is prompted to complete the process manually.

3. Fetch Product Details:  
   - Navigates to the order history page or performs a search using the provided `search_string`.
   - Extracts relevant product details such as name, image URL, and price.

4. Return Scraped Data:  
   The extracted data is formatted as a JSON response and sent back to the client.

5. Close Browser:  
   Ensures proper cleanup by closing the browser instance after scraping is complete.

---

## Error Handling
The API includes robust error handling to address common issues during scraping:
- Invalid Credentials: Returns a `401 Unauthorized` status code if the provided credentials are incorrect.
- MFA Required: Prompts the user to complete MFA manually if it is enabled on the account.
- Scraping Errors: Logs any errors encountered during the scraping process for debugging purposes.

---

## Project Structure
The project is organized into a clean and modular directory structure for maintainability and scalability:

```
product-scraper/
│── src/
│   ├── services/
│   │   ├── scrapper.ts         # Core scraper logic using Playwright
│   ├── models/
│   │   ├── userDetails.ts      # User details model for validation
│   ├── utils/
│   │   ├── constants.ts        # Constants such as URLs and configuration values
│── index.ts                    # Entry point for the Express server
│── package.json                # Project dependencies and scripts
│── README.md                   # Documentation (this file)
```

---




## Contact
For questions, feedback, or collaboration opportunities, feel free to reach out:
- Email: muzzamilpz@gmail.com
- GitHub: [@muzzamilpz](https://github.com/muzzamilpz)
