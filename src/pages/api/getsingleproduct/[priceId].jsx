import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { priceId } = req.query;

        try {
            // Retrieve price Id from Stripe using the priceId
            const price = await stripe.prices.retrieve(priceId);

            res.status(200).json(price);
        } catch (error) {
            console.error("Error fetching ticket details:", error);
            res.status(500).json({ error: "Unable to fetch ticket details" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
