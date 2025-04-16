
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const DatabaseSchemaSection = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-dbms-primary mb-2">PL/SQL Database Integration</h2>
          <p className="text-muted-foreground">
            This section demonstrates how our e-commerce platform integrates with a PL/SQL database backend.
            Explore the database schema, triggers, procedures, and more.
          </p>
        </div>

        <Tabs defaultValue="schema" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schema">Database Schema</TabsTrigger>
            <TabsTrigger value="procedures">Procedures</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="queries">Sample Queries</TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>E-Commerce Database Schema</CardTitle>
                <CardDescription>Entity-Relationship Diagram for the PL/SQL Database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white overflow-auto">
                  <pre className="text-xs md:text-sm overflow-auto text-left">
{`/* Database Schema for PL/SQL Commerce Nexus */

CREATE TABLE customers (
  customer_id NUMBER PRIMARY KEY,
  first_name VARCHAR2(50) NOT NULL,
  last_name VARCHAR2(50) NOT NULL,
  email VARCHAR2(100) UNIQUE NOT NULL,
  password_hash VARCHAR2(256) NOT NULL,
  phone VARCHAR2(20),
  registration_date DATE DEFAULT SYSDATE NOT NULL,
  last_login_date DATE,
  is_active NUMBER(1) DEFAULT 1 NOT NULL
);

CREATE TABLE addresses (
  address_id NUMBER PRIMARY KEY,
  customer_id NUMBER NOT NULL,
  address_type VARCHAR2(10) NOT NULL CHECK (address_type IN ('BILLING', 'SHIPPING')),
  street_address VARCHAR2(100) NOT NULL,
  city VARCHAR2(50) NOT NULL,
  state VARCHAR2(50) NOT NULL,
  postal_code VARCHAR2(20) NOT NULL,
  country VARCHAR2(50) NOT NULL,
  is_default NUMBER(1) DEFAULT 0 NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE categories (
  category_id NUMBER PRIMARY KEY,
  category_name VARCHAR2(50) NOT NULL,
  parent_category_id NUMBER,
  description VARCHAR2(500),
  image_url VARCHAR2(255),
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

CREATE TABLE products (
  product_id NUMBER PRIMARY KEY,
  product_name VARCHAR2(100) NOT NULL,
  category_id NUMBER NOT NULL,
  description CLOB,
  price NUMBER(10,2) NOT NULL,
  stock_quantity NUMBER NOT NULL,
  image_url VARCHAR2(255),
  created_date DATE DEFAULT SYSDATE NOT NULL,
  is_active NUMBER(1) DEFAULT 1 NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE product_attributes (
  attribute_id NUMBER PRIMARY KEY,
  product_id NUMBER NOT NULL,
  attribute_name VARCHAR2(50) NOT NULL,
  attribute_value VARCHAR2(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE orders (
  order_id NUMBER PRIMARY KEY,
  customer_id NUMBER NOT NULL,
  order_date DATE DEFAULT SYSDATE NOT NULL,
  shipping_address_id NUMBER NOT NULL,
  billing_address_id NUMBER NOT NULL,
  order_status VARCHAR2(20) DEFAULT 'PENDING' NOT NULL,
  payment_method VARCHAR2(50) NOT NULL,
  shipping_method VARCHAR2(50) NOT NULL,
  subtotal NUMBER(10,2) NOT NULL,
  shipping_cost NUMBER(10,2) NOT NULL,
  tax_amount NUMBER(10,2) NOT NULL,
  total_amount NUMBER(10,2) NOT NULL,
  notes VARCHAR2(500),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(address_id),
  FOREIGN KEY (billing_address_id) REFERENCES addresses(address_id)
);

CREATE TABLE order_items (
  item_id NUMBER PRIMARY KEY,
  order_id NUMBER NOT NULL,
  product_id NUMBER NOT NULL,
  quantity NUMBER NOT NULL,
  price_per_unit NUMBER(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE reviews (
  review_id NUMBER PRIMARY KEY,
  product_id NUMBER NOT NULL,
  customer_id NUMBER NOT NULL,
  rating NUMBER(2,1) NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text VARCHAR2(1000),
  review_date DATE DEFAULT SYSDATE NOT NULL,
  is_verified_purchase NUMBER(1) DEFAULT 0 NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE carts (
  cart_id NUMBER PRIMARY KEY,
  customer_id NUMBER NOT NULL,
  created_date DATE DEFAULT SYSDATE NOT NULL,
  last_modified_date DATE DEFAULT SYSDATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE cart_items (
  cart_item_id NUMBER PRIMARY KEY,
  cart_id NUMBER NOT NULL,
  product_id NUMBER NOT NULL,
  quantity NUMBER NOT NULL,
  added_date DATE DEFAULT SYSDATE NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* Create sequences for primary keys */
CREATE SEQUENCE customer_seq START WITH 1;
CREATE SEQUENCE address_seq START WITH 1;
CREATE SEQUENCE category_seq START WITH 1;
CREATE SEQUENCE product_seq START WITH 1;
CREATE SEQUENCE attribute_seq START WITH 1;
CREATE SEQUENCE order_seq START WITH 1;
CREATE SEQUENCE order_item_seq START WITH 1;
CREATE SEQUENCE review_seq START WITH 1;
CREATE SEQUENCE cart_seq START WITH 1;
CREATE SEQUENCE cart_item_seq START WITH 1;`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>PL/SQL Procedures</CardTitle>
                <CardDescription>Sample stored procedures for e-commerce operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white overflow-auto">
                  <pre className="text-xs md:text-sm overflow-auto text-left">
{`/* PL/SQL Procedures for E-Commerce Operations */

-- Procedure to create a new order
CREATE OR REPLACE PROCEDURE create_order(
  p_customer_id IN NUMBER,
  p_shipping_address_id IN NUMBER,
  p_billing_address_id IN NUMBER,
  p_payment_method IN VARCHAR2,
  p_shipping_method IN VARCHAR2,
  p_notes IN VARCHAR2,
  p_order_id OUT NUMBER
)
IS
  v_subtotal NUMBER(10,2) := 0;
  v_shipping_cost NUMBER(10,2) := 0;
  v_tax_rate NUMBER(10,2) := 0.08; -- 8% tax rate
  v_tax_amount NUMBER(10,2) := 0;
  v_total_amount NUMBER(10,2) := 0;
  v_cart_id NUMBER;
BEGIN
  -- Get customer's cart
  SELECT cart_id INTO v_cart_id
  FROM carts
  WHERE customer_id = p_customer_id
  AND ROWNUM = 1;
  
  -- Calculate subtotal from cart items
  SELECT SUM(p.price * ci.quantity) INTO v_subtotal
  FROM cart_items ci
  JOIN products p ON ci.product_id = p.product_id
  WHERE ci.cart_id = v_cart_id;
  
  -- Calculate shipping cost based on shipping method
  IF p_shipping_method = 'STANDARD' THEN
    v_shipping_cost := 5.99;
  ELSIF p_shipping_method = 'EXPRESS' THEN
    v_shipping_cost := 15.99;
  ELSIF p_shipping_method = 'OVERNIGHT' THEN
    v_shipping_cost := 29.99;
  END IF;
  
  -- Calculate tax
  v_tax_amount := v_subtotal * v_tax_rate;
  
  -- Calculate total
  v_total_amount := v_subtotal + v_shipping_cost + v_tax_amount;
  
  -- Create the order
  p_order_id := order_seq.NEXTVAL;
  
  INSERT INTO orders (
    order_id, customer_id, shipping_address_id, billing_address_id,
    payment_method, shipping_method, subtotal, shipping_cost,
    tax_amount, total_amount, notes
  ) VALUES (
    p_order_id, p_customer_id, p_shipping_address_id, p_billing_address_id,
    p_payment_method, p_shipping_method, v_subtotal, v_shipping_cost,
    v_tax_amount, v_total_amount, p_notes
  );
  
  -- Transfer items from cart to order
  INSERT INTO order_items (
    item_id, order_id, product_id, quantity, price_per_unit
  )
  SELECT 
    order_item_seq.NEXTVAL, p_order_id, ci.product_id, ci.quantity, p.price
  FROM 
    cart_items ci
    JOIN products p ON ci.product_id = p.product_id
  WHERE 
    ci.cart_id = v_cart_id;
    
  -- Update product inventory
  FOR item IN (SELECT ci.product_id, ci.quantity 
               FROM cart_items ci 
               WHERE ci.cart_id = v_cart_id) LOOP
    UPDATE products
    SET stock_quantity = stock_quantity - item.quantity
    WHERE product_id = item.product_id;
  END LOOP;
  
  -- Clear the cart
  DELETE FROM cart_items
  WHERE cart_id = v_cart_id;
  
  -- Commit the transaction
  COMMIT;
  
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    ROLLBACK;
    RAISE_APPLICATION_ERROR(-20001, 'Customer cart not found');
  WHEN OTHERS THEN
    ROLLBACK;
    RAISE;
END;
/

-- Procedure to add items to cart
CREATE OR REPLACE PROCEDURE add_to_cart(
  p_customer_id IN NUMBER,
  p_product_id IN NUMBER,
  p_quantity IN NUMBER
)
IS
  v_cart_id NUMBER;
  v_existing_item NUMBER := 0;
  v_stock NUMBER;
BEGIN
  -- Check product stock
  SELECT stock_quantity INTO v_stock
  FROM products
  WHERE product_id = p_product_id;
  
  IF v_stock < p_quantity THEN
    RAISE_APPLICATION_ERROR(-20002, 'Insufficient stock');
  END IF;
  
  -- Get or create customer cart
  BEGIN
    SELECT cart_id INTO v_cart_id
    FROM carts
    WHERE customer_id = p_customer_id
    AND ROWNUM = 1;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      -- Create new cart
      v_cart_id := cart_seq.NEXTVAL;
      INSERT INTO carts (cart_id, customer_id)
      VALUES (v_cart_id, p_customer_id);
  END;
  
  -- Check if item already in cart
  SELECT COUNT(*) INTO v_existing_item
  FROM cart_items
  WHERE cart_id = v_cart_id
  AND product_id = p_product_id;
  
  IF v_existing_item > 0 THEN
    -- Update existing item
    UPDATE cart_items
    SET quantity = quantity + p_quantity,
        added_date = SYSDATE
    WHERE cart_id = v_cart_id
    AND product_id = p_product_id;
  ELSE
    -- Add new item
    INSERT INTO cart_items (
      cart_item_id, cart_id, product_id, quantity
    ) VALUES (
      cart_item_seq.NEXTVAL, v_cart_id, p_product_id, p_quantity
    );
  END IF;
  
  -- Update cart last modified date
  UPDATE carts
  SET last_modified_date = SYSDATE
  WHERE cart_id = v_cart_id;
  
  COMMIT;
  
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    RAISE;
END;
/`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Triggers</CardTitle>
                <CardDescription>Automated triggers for data integrity and business rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white overflow-auto">
                  <pre className="text-xs md:text-sm overflow-auto text-left">
{`/* PL/SQL Triggers for E-Commerce Operations */

-- Trigger to update product inventory after order is placed
CREATE OR REPLACE TRIGGER trg_update_inventory
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity - :NEW.quantity
  WHERE product_id = :NEW.product_id;
END;
/

-- Trigger to validate product price when adding to order items
CREATE OR REPLACE TRIGGER trg_validate_price
BEFORE INSERT ON order_items
FOR EACH ROW
DECLARE
  v_product_price NUMBER(10,2);
BEGIN
  SELECT price INTO v_product_price
  FROM products
  WHERE product_id = :NEW.product_id;
  
  -- Validate that the price in the order matches the current product price
  IF ABS(:NEW.price_per_unit - v_product_price) > 0.01 THEN
    RAISE_APPLICATION_ERROR(-20003, 'Price mismatch detected');
  END IF;
END;
/

-- Trigger to update average product rating when a review is added
CREATE OR REPLACE TRIGGER trg_update_product_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
DECLARE
  v_avg_rating NUMBER(2,1);
BEGIN
  IF INSERTING OR UPDATING THEN
    -- Calculate new average rating
    SELECT AVG(rating) INTO v_avg_rating
    FROM reviews
    WHERE product_id = :NEW.product_id;
    
    -- Update product attribute with new rating
    MERGE INTO product_attributes pa
    USING (SELECT :NEW.product_id as pid FROM dual) src
    ON (pa.product_id = src.pid AND pa.attribute_name = 'average_rating')
    WHEN MATCHED THEN
      UPDATE SET pa.attribute_value = TO_CHAR(v_avg_rating)
    WHEN NOT MATCHED THEN
      INSERT (attribute_id, product_id, attribute_name, attribute_value)
      VALUES (attribute_seq.NEXTVAL, :NEW.product_id, 'average_rating', TO_CHAR(v_avg_rating));
  ELSIF DELETING THEN
    -- Calculate new average rating
    SELECT AVG(rating) INTO v_avg_rating
    FROM reviews
    WHERE product_id = :OLD.product_id;
    
    -- Update product attribute with new rating
    UPDATE product_attributes
    SET attribute_value = TO_CHAR(NVL(v_avg_rating, 0))
    WHERE product_id = :OLD.product_id
    AND attribute_name = 'average_rating';
  END IF;
END;
/

-- Trigger to check stock before placing an order
CREATE OR REPLACE TRIGGER trg_check_stock
BEFORE INSERT ON order_items
FOR EACH ROW
DECLARE
  v_available_stock NUMBER;
BEGIN
  -- Get current stock
  SELECT stock_quantity INTO v_available_stock
  FROM products
  WHERE product_id = :NEW.product_id;
  
  -- Check if enough stock is available
  IF v_available_stock < :NEW.quantity THEN
    RAISE_APPLICATION_ERROR(-20004, 'Not enough stock available for product ID ' || :NEW.product_id);
  END IF;
END;
/

-- Trigger to maintain default address flag
CREATE OR REPLACE TRIGGER trg_default_address
BEFORE INSERT OR UPDATE ON addresses
FOR EACH ROW
DECLARE
  v_count NUMBER;
BEGIN
  IF :NEW.is_default = 1 THEN
    -- Count existing default addresses of the same type
    SELECT COUNT(*) INTO v_count
    FROM addresses
    WHERE customer_id = :NEW.customer_id
    AND address_type = :NEW.address_type
    AND is_default = 1;
    
    -- If there's an existing default, update it
    IF v_count > 0 THEN
      UPDATE addresses
      SET is_default = 0
      WHERE customer_id = :NEW.customer_id
      AND address_type = :NEW.address_type
      AND is_default = 1;
    END IF;
  END IF;
END;
/`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sample PL/SQL Queries</CardTitle>
                <CardDescription>Common queries for your e-commerce application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white overflow-auto">
                  <pre className="text-xs md:text-sm overflow-auto text-left">
{`/* Sample PL/SQL Queries for E-Commerce Analytics */

-- Query to get top selling products
SELECT 
  p.product_id, 
  p.product_name, 
  SUM(oi.quantity) AS total_sold,
  SUM(oi.quantity * oi.price_per_unit) AS total_revenue
FROM 
  products p
  JOIN order_items oi ON p.product_id = oi.product_id
  JOIN orders o ON oi.order_id = o.order_id
WHERE 
  o.order_date BETWEEN ADD_MONTHS(SYSDATE, -3) AND SYSDATE
GROUP BY 
  p.product_id, p.product_name
ORDER BY 
  total_revenue DESC
FETCH FIRST 10 ROWS ONLY;

-- Query to get customer order history
SELECT 
  o.order_id,
  o.order_date,
  o.order_status,
  o.total_amount,
  COUNT(oi.item_id) AS total_items
FROM 
  orders o
  JOIN order_items oi ON o.order_id = oi.order_id
WHERE 
  o.customer_id = :customer_id
GROUP BY 
  o.order_id, o.order_date, o.order_status, o.total_amount
ORDER BY 
  o.order_date DESC;

-- Query to get product details with average rating
SELECT 
  p.product_id,
  p.product_name,
  p.description,
  p.price,
  p.stock_quantity,
  c.category_name,
  NVL(AVG(r.rating), 0) AS avg_rating,
  COUNT(r.review_id) AS total_reviews
FROM 
  products p
  JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN reviews r ON p.product_id = r.product_id
WHERE 
  p.product_id = :product_id
GROUP BY 
  p.product_id, p.product_name, p.description, p.price, p.stock_quantity, c.category_name;

-- Function to calculate revenue by date range
CREATE OR REPLACE FUNCTION get_revenue_by_period(
  p_start_date IN DATE,
  p_end_date IN DATE
) RETURN NUMBER
IS
  v_total_revenue NUMBER(12,2);
BEGIN
  SELECT NVL(SUM(total_amount), 0) INTO v_total_revenue
  FROM orders
  WHERE order_date BETWEEN p_start_date AND p_end_date
  AND order_status != 'CANCELLED';
  
  RETURN v_total_revenue;
END;
/

-- Query to get monthly sales report
SELECT 
  TO_CHAR(o.order_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT o.order_id) AS total_orders,
  SUM(o.total_amount) AS total_revenue,
  AVG(o.total_amount) AS avg_order_value,
  COUNT(DISTINCT o.customer_id) AS unique_customers
FROM 
  orders o
WHERE 
  o.order_date >= ADD_MONTHS(TRUNC(SYSDATE, 'MONTH'), -12)
  AND o.order_status != 'CANCELLED'
GROUP BY 
  TO_CHAR(o.order_date, 'YYYY-MM')
ORDER BY 
  month;

-- Query for inventory management - low stock alerts
SELECT 
  p.product_id,
  p.product_name,
  p.stock_quantity,
  CASE
    WHEN p.stock_quantity = 0 THEN 'OUT OF STOCK'
    WHEN p.stock_quantity <= 5 THEN 'CRITICAL'
    WHEN p.stock_quantity <= 20 THEN 'LOW'
    ELSE 'OK'
  END AS stock_status
FROM 
  products p
WHERE 
  p.stock_quantity <= 20
ORDER BY 
  p.stock_quantity ASC;

-- Customer segmentation by purchase frequency and value
WITH customer_metrics AS (
  SELECT 
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent,
    SUM(o.total_amount) / COUNT(DISTINCT o.order_id) AS avg_order_value,
    MAX(o.order_date) AS last_order_date,
    SYSDATE - MAX(o.order_date) AS days_since_last_order
  FROM 
    customers c
    JOIN orders o ON c.customer_id = o.customer_id
  WHERE 
    o.order_date >= ADD_MONTHS(SYSDATE, -12)
    AND o.order_status = 'COMPLETED'
  GROUP BY 
    c.customer_id, c.first_name || ' ' || c.last_name
)
SELECT 
  customer_id,
  customer_name,
  total_orders,
  total_spent,
  avg_order_value,
  last_order_date,
  days_since_last_order,
  CASE
    WHEN total_orders >= 5 AND total_spent >= 1000 THEN 'VIP'
    WHEN total_orders >= 3 OR total_spent >= 500 THEN 'LOYAL'
    WHEN days_since_last_order <= 30 THEN 'ACTIVE'
    WHEN days_since_last_order <= 90 THEN 'AT RISK'
    ELSE 'LAPSED'
  END AS customer_segment
FROM 
  customer_metrics
ORDER BY 
  total_spent DESC;`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DatabaseSchemaSection;
