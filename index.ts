import express, { Request, Response } from 'express';
import { fetchProductDetails } from './src/services/scrapper';
import { UserDetails } from './src/models/userDetails';
const app = express();

app.use(express.json());

// Define the port of this server
const PORT = 3000;

// Handling a post method route here
app.post("/api/v1/fetchproductDetails", async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const search = req.body.search_string;
        // Verifing the user credentials were not empty
        if (!username || !password) {
            res.status(401).send("No username or password found");
            return;
        }

        let userDetails: UserDetails = {
            username: username,
            password: password,
            search_string: search
        }

        //Call the scraping method if the credentials were provided properly
        const resp = await fetchProductDetails(userDetails);
        res.status(200).send(resp);
    } catch (error: unknown) {

        console.log(error,"error in server");
        

    }

})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);

})