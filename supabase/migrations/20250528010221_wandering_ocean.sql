/*
  # Add Stripe Policies and Update Views

  1. Changes
    - Add INSERT policy for stripe_customers table
    - Add INSERT policy for stripe_subscriptions table
    - Add INSERT policy for stripe_orders table
    - Remove security_invoker from views for better compatibility

  2. Security
    - Maintains RLS on all tables
    - Ensures users can only insert their own data
    - Preserves existing SELECT policies
*/

-- Add INSERT policy for stripe_customers
DROP POLICY IF EXISTS "Users can insert their own customer data" ON stripe_customers;
CREATE POLICY "Users can insert their own customer data"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Add INSERT policy for stripe_subscriptions
DROP POLICY IF EXISTS "Users can insert their own subscription data" ON stripe_subscriptions;
CREATE POLICY "Users can insert their own subscription data"
  ON stripe_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid()
    )
  );

-- Add INSERT policy for stripe_orders
DROP POLICY IF EXISTS "Users can insert their own order data" ON stripe_orders;
CREATE POLICY "Users can insert their own order data"
  ON stripe_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid()
    )
  );

-- Recreate user subscription view without security_invoker
DROP VIEW IF EXISTS stripe_user_subscriptions;
CREATE VIEW stripe_user_subscriptions AS
SELECT
  c.customer_id,
  s.subscription_id,
  s.status as subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND s.deleted_at IS NULL;

GRANT SELECT ON stripe_user_subscriptions TO authenticated;

-- Recreate user orders view without security_invoker
DROP VIEW IF EXISTS stripe_user_orders;
CREATE VIEW stripe_user_orders AS
SELECT
  c.customer_id,
  o.id as order_id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status as order_status,
  o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = auth.uid()
AND c.deleted_at IS NULL
AND o.deleted_at IS NULL;

GRANT SELECT ON stripe_user_orders TO authenticated;