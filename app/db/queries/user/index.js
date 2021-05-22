export default {
  createPost: `INSERT INTO posts (
        user_id,
        image_path,
        image_latitude,
        image_longitude,
        user_latitude,
        caption,
        last_ip
    ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
}

