-- DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS  
  reviews (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id int,
    rate INTEGER NOT NULL check (rate between 0 and 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

