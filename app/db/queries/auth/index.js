export default {
  createUser: `INSERT INTO users(
          id,
          first_name,
          last_name,
          user_name,
          email,
          phone_number,
          password,
          salt
      ) VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, last_name, email
      `,
  followUser: `INSERT INTO user_followers(
        user_id,
        follower_id
      )VALUES($1, $2) RETURNING *
      `,
  userFollow: `INSERT INTO user_following(
        user_id,
        following_id
      )VALUES($1, $2) RETURNING *
      `,
  getUserById: 'SELECT * FROM users WHERE id= $1',
  getUserByEmailOrPhoneNumber: `
      SELECT 
        * 
      FROM 
        users 
      WHERE 
        email= $1 OR phone_number = $1`,
  getUserFollowers: `
      SELECT *
        u.id,
        u.first_name,
        u.last_name,
        u.user_name,
        u.email
      FROM users u
      INNER JOIN user_followers uf ON u.id = uf.follower_id 
      WHERE u.id = $1
    `,
    getUserFollowing: `
      SELECT 
        * 
      FROM 
        user_following 
      WHERE 
        following_id= $1
      AND 
      user_id = $2
    `,


}