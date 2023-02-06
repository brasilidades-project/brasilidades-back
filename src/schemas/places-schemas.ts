import Joi from "joi";

export const districtSchema = Joi.object({
  district: Joi.string().required(),
});
