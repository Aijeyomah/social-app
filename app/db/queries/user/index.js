export default {
  createPost: `INSERT INTO posts (
        user_id,
        image_path,
        image_latitude,
        image_longitude,
        user_latitude,
        caption,
        last_ip
    ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,

  getUserProfile: `
    SELECT
      COUNT(f.id) AS "following",
      COUNT(uf.id) AS followers,
      u.id,
      u.first_name,
      u.last_name,
      u.profile_pics,
      u.bio,
      CASE WHEN EXISTS (
        SELECT
          1
        FROM
          user_following
        WHERE
        following_id = $2
      AND user_id = $1
      ) THEN
        TRUE
      ELSE
        FALSE
      END AS is_follow
    FROM
      users u
      LEFT JOIN user_following f ON f.user_id = u.id
      LEFT JOIN user_followers uf ON uf.user_id = u.id
    WHERE
      u.id = $1
    GROUP BY
      u.id;
    `,
  fetchProfile: `
    SELECT
      COUNT(f.id) AS "following",
      COUNT(uf.id) AS followers,
      u.id,
      u.first_name,
      u.last_name,
      u.profile_pics,
      u.bio
    FROM
      users u
      LEFT JOIN user_following f ON f.user_id = u.id
      LEFT JOIN user_followers uf ON uf.user_id = u.id
    WHERE
      u.id = $1
    GROUP BY
      u.id;
    `,
};
