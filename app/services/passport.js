import passport  from 'passport';
import passportGoogleStrategy from 'passport-google-oauth20'
import passportFacebookStrategy from 'passport-facebook'
import config from '../../config';
import { fetchByEmailOrPhoneNumber } from './user';
import queries from '../db/queries/auth/';
import { addTokenToData, regenerateUniqueId } from '../utils';
import db from '../db'
import authQuery from '../db/queries/auth';
import app from '../../index'


const GoogleStrategy = passportGoogleStrategy.Strategy

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = config;


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  async(accessToken, refreshToken, profile, cb) =>{
    try {
      const user = await fetchByEmailOrPhoneNumber(profile.emails[0].value)
      if(user){
        cb(null, user);
      }
      else {
        const id = await regenerateUniqueId('USR', queries.getUserById);
        const salt = process.env.SALT;
        const password = process.env.PASSWORD;
        const payload = [id, profile.name.familyName, profile.name.givenName, null, profile.emails[0].value, null, password, salt];
        const newUser = await db.any(authQuery.createUser, payload);
        return cd(null, newUser);
    }
    } catch (error) {
      cb(error);
    }
  }
));

