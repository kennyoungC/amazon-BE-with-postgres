

CREATE TABLE IF NOT EXISTS  
  products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

