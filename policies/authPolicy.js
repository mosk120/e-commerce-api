const Joi = require('joi');

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().min(5),
            email: Joi.string().email(),
            password: Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{8,30}$'))

        })

        const {error, value} = schema.validate(req.body);
            if (error) {
                switch (error.details[0].context.key) {
                    case 'username':
                        res.status(400).json({
                            error: error.details[0].message
                        })
                        break;
                    case 'email':
                        res.status(400).json({
                            error: 'You must provide a valid email address'
                        })
                        break;
                    case 'password':
                        res.status(400).json({
                            error: `The password provided failed to match following rules\n
                        1.it must contain only the following characters: lower case, upper case, numerics\n
                        2.it must be at least 8 characters long and not greater than 32`
                        })
                        break;
                    default:
                        res.status(400).json({
                            error: 'Invalid registration information'
                        })
                }
            } else {
                next()
            }
    }
}