import joi from "joi";

export const validateSignUp = (userData) => {

    const Schema = joi.object({
        fullName: joi.string().required().min(3).max(20),
        email: joi.string().email().required(),
        password: joi.string(),
        address: joi
            .array()
            .items(joi.object({ detail: joi.string(), for: joi.string() })),
        phoneNumber: joi.number(),
    });

    return Schema.validateAsync(userData);
}

export const validateSignIn = (userData) => {

    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    return Schema.validateAsync(userData);
}