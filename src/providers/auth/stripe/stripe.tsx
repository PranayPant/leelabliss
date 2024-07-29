import { useState } from "react";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Outlet } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY,
);

export function StripeProvider() {
  const [clientSecret] = useState("");

  const appearance: StripeElementsOptions["appearance"] = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Outlet />
        </Elements>
      )}
      {!clientSecret && <Outlet />}
    </>
  );
}
