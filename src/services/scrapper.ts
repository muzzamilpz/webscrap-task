import { chromium } from 'playwright';
import { fetchProductUrl, fetchOrderHistory, loginVerifyUrl, fetchSearchHistory } from "../../utils/constants";
import { UserDetails } from '../models/userDetails';




export async function fetchProductDetails(request: UserDetails) {
    // Prompt user for credentials

    // Initialize Browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        let response = [];
        // Handling login here
        await page.goto(fetchProductUrl);

        // typing the email or phone 
        await page.fill('#ap_email', request.username);
        await page.click('#continue');

        // Checking for incorrect username or phone
        const userNameCheck = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".a-section .a-spacing-base .auth-pagelet-container")).length ? true : false;
        });

        // return error string for invalid username
        if (userNameCheck) {
            await browser.close();
            return "Invalid Credentials";
        }

        // After validating username, filling the password
        await page.fill('[autocomplete="current-password"]', request.password);
        await page.click('#signInSubmit');

        // Checking for incorrect password
        const passwordCheck = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".a-section .a-spacing-base .auth-pagelet-container")).length ? true : false;
        });

        // return error string for invalid password
        if (passwordCheck) {
            await browser.close();
            return "Invalid Credentials";
        }

        // Wait until the login succeeds, Due to MFA, it should redirect directly if MFA is enabled.
        await page.waitForURL(loginVerifyUrl);

        // Checking MFA occurs
        const checkMfa = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#body > div > div > div.a-section.a-spacing-medium > span") && document.querySelectorAll("#auth-mfa-form > div > div > h1")
            ).length ? true : false;
        });
        // Checking MFA enabled or logged in directly
        console.log('Complete MFA manually if requied.', checkMfa);

        // If the user request search, adding the seach parameter to the order history string
        if (request.search_string) {
            const searchUrl = fetchSearchHistory + request.search_string;
            await page.goto(searchUrl)
            // Extracting the values from html elements
            response = await page.evaluate(() => {
                const childElements = Array.from(document.querySelectorAll('.a-fixed-left-grid-inner'))?.map((div) => {
                    let orderName = div.childNodes[3].childNodes[2]
                    return {
                        product_name: (orderName as HTMLHtmlElement).innerText,
                        product__url: (div.childNodes[3].childNodes[1].childNodes[0] as HTMLLinkElement).href
                    }
                });

                return childElements
            });
        } else {
            await page.goto(fetchOrderHistory);


            await page.waitForSelector('.order-card__list');
            // Extract order details
            // response = await page.evaluate(() => {
            //     return Array.from(document.querySelectorAll('.order-card__list')).map(orderCard => {
            //         const textContent = (orderCard as HTMLElement).innerText.trim();


            //         const orderIDMatch = textContent.match(/ORDER #\s+([\d-]+)/);
            //         const orderID = orderIDMatch ? orderIDMatch[1] : "Unknown Order ID";


            //         const priceMatch = textContent.match(/₹[\d,]+(\.\d{2})?/);
            //         const orderPrice = priceMatch ? priceMatch[0] : "N/A";

            //         // Extract Product Detailsz
            //         const products = Array.from(orderCard.querySelectorAll('.a-fixed-left-grid')).map(productDiv => {
            //             const productElement = productDiv as HTMLElement;
            //             return {
            //                 product_name: productElement.querySelector('.yohtmlc-product-title a')?.textContent?.trim() || "Unknown Product",
            //                 product_image: productElement.querySelector('.product-image img')?.getAttribute('src') || "No Image",
            //                 product_price: (productElement.innerText.match(/₹[\d,]+(\.\d{2})?/) || ["N/A"])[0]
            //             };
            //         });

            //         return {
            //             order_id: orderID,
            //             order_price: orderPrice,
            //             products: products
            //         };
            //     });
            // });

            const LIMIT = 10; // Set the record limit


            response = await page.evaluate((LIMIT) => {
                let products: any = [];

                // Select all order cards
                Array.from(document.querySelectorAll('.order-card__list')).forEach(orderCard => {
                    const textContent = (orderCard as HTMLElement).innerText.trim();
                    const priceMatch = textContent.match(/₹[\d,]+(\.\d{2})?/);
                    const orderPrice = priceMatch ? priceMatch[0] : "N/A";

                    // Extract each product in the order
                    const extractedProducts = Array.from(orderCard.querySelectorAll('.a-fixed-left-grid')).map(productDiv => {
                        const productElement = productDiv as HTMLElement;
                        return {
                            product_name: productElement.querySelector('.yohtmlc-product-title a')?.textContent?.trim() || "Unknown Product",
                            product_image: productElement.querySelector('.product-image img')?.getAttribute('src') || "No Image",
                            product_price: (productElement.innerText.match(/₹[\d,]+(\.\d{2})?/) || ["N/A"])[0],
                            order_price: orderPrice
                        };
                    });

                    // Push extracted products into main array
                    products.push(...extractedProducts);
                });

                // Enforce the limit by slicing the array
                return products.slice(0, LIMIT);
            }, LIMIT);

            console.log(JSON.stringify(response, null, 2)); // Pretty print the extracted orders

        }


        // Close the browser after fetching the values
        await browser.close();
        return response;

    } catch (error) {
        console.error('An error occurred:', error);
    }
}
