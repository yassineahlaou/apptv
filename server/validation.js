import Joi from "@hapi/joi"

export const registrationValidation = (data)=>{

    const schema =  Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        profileimg: Joi.string(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)

}


export const loginValidation = (data)=>{

    const schema =  Joi.object({
       
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)

}

export const updateValidation = (data)=>{

    const schema =  Joi.object({
        username: Joi.string().min(6),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6),
        profileimg: Joi.string(),
        
    });
    return schema.validate(data)

}

export const updatePasswordValidation = (data)=>{

    const schema =  Joi.object({
       
        oldpassword: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        rewrite: Joi.string().min(6).required(),
       
        
    });
    return schema.validate(data)

}

export const forgotPasswordVal = (data)=>{

    const schema =  Joi.object({
       
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirm: Joi.string().min(6).required(),
       
        
    });
    return schema.validate(data)

}

