import Stripe from "stripe";
import { NextResponse } from "next/server";
import { data } from "autoprefixer";

export default async function handler(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list({
        limit: 3,
    });

    return res.json(prices.data)
}
