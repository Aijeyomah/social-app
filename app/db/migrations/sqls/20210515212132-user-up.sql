
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) NOT NULL,
    image_path VARCHAR NOT NULL,
    image_latitude INT,
    image_longitude INT,
    user_latitude INT,
    caption VARCHAR NULL,
    last_ip VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CREATE TABLE IF EXISTS comments {
--     id SERIAL PRIMARY KEY,
--     user_id VARCHAR REFERENCES users(id) NOT NULL,
--     commenter_id VARCHAR REFERENCES users(id) NOT NULL,
--     comment TEXT NULL,
-- }

-- CREATE TABLE IF EXISTS likes {
--     id SERIAL PRIMARY KEY,
--     post_id INT REFERENCES posts(id)
--     likes INT DEFAULT 0,
--     post_liker VARCHAR REFERENCES users(id) NOT NULL,

-- }

-- CREATE TABLE IF EXISTS user_followers {
--     id SERIAL PRIMARY KEY,
--     user_id VARCHAR REFERENCES users(id) NOT NULL,
--     follower_id VARCHAR REFERENCES users(id) NOT NULL,
-- };

-- CREATE TABLE IF EXISTS user_following {
--     id SERIAL PRIMARY KEY,
--     user_id VARCHAR REFERENCES users(id) NOT NULL,
--     following_id VARCHAR REFERENCES users(id) NOT NULL,
-- };