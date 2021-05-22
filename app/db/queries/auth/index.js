export default {
    createUser: `INSERT INTO users(
          id,
          first_name,
          last_name,
          user_name,
          email,
          phone_number,
          password,
          salt,
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, first_name, last_name, email
      `,

      getUserById: 'SELECT * FROM users WHERE id= $1',
      getUserByEmailOrPhoneNumber: 'SELECT * FROM users WHERE email= $1 OR phone_number = $1',

    }