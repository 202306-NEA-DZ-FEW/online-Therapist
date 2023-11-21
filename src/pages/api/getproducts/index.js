import Stripe from "stripe";

export default async function handler(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit: 3,
    });

    return res.json(prices.data.reverse());
}
