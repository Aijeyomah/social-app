/* Replace with your SQL commands */
CREATE TYPE all_users_role AS ENUM (
  'user',
  'admin'
);


CREATE TABLE IF NOT EXISTS users(
  id VARCHAR PRIMARY KEY,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  user_name VARCHAR(50) NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  phone_number VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR NULL,
  profile_pics VARCHAR NULL,
  salt VARCHAR NOT NULL,
  bio VARCHAR(200),
  role user_role NOT NULL DEFAULT ('user'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

