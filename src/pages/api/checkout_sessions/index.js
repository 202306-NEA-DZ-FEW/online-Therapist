import Stripe from "stripe";

export default async function POST(req, res) {
    if (req.method === "POST") {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const body = req.body;
        const priceId = body.priceId;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${req.headers.origin}/success?price_id=${priceId}`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });

        return res.json({ session });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
