import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(` Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('Success:', event.id);

    // 2. Handle event type (add business logic here)
    if (event.type === 'checkout.session.completed') {
      console.log(` Payment received!`);
    } else {
      console.warn(` Unhandled event type: ${event.type}`);
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}


// import { UserAuth } from "@/context/AuthContext";
// import { collection, setDoc, doc } from "firebase/firestore";
// import { db } from "@/util/firebase";
// import Stripe from "stripe";


// const webhook = async (req, res) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   let event;

//   try {
  
//     event = stripe.webhooks.constructEvent(
//         req.rawBody,
//         req.headers["stripe-signature"],
//         process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (err) {
//     console.error(" Webhook signature verification failed.");
//     return res.sendStatus(400);
//   }

//   const dataObject = event.data.object;

//   const {
//       user
//   } = UserAuth();
//   const userCollection = collection(db, "usertickets");
//   await setDoc(doc(userCollection, user.uid), {
//       checkoutSessionId: dataObject.id,
//       paymentStatus: dataObject.payment_status,
//       amountTotal: dataObject.amount_total,
//       uid: user.uid,
//   });


//   // await admin.firestore().collection("orders").doc().set({
//   //   checkoutSessionId: dataObject.id,
//   //   paymentStatus: dataObject.payment_status,
//   //   amountTotal: dataObject.amount_total,
//   // });

//   return res.sendStatus(200);

// }