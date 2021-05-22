import Joi from '@hapi/joi';
import { optionalStringCheck, stringCheck } from './generic';

export const createPostSchema = Joi.object({
  image_path: stringCheck(Joi, 'image_path', 2, ),
  image_latitude: stringCheck(Joi, 'image_latitude', 8, 50),
  image_longitude: optionalStringCheck(Joi, "image_longitude"),
  user_latitude: optionalStringCheck(Joi, "user_latitude"),
  caption: optionalStringCheck(Joi, "caption"),
  last_ip: optionalStringCheck(Joi, 'last_ip')
})
