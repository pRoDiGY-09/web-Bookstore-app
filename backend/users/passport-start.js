const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const secretKey = 'your_secret_key'; 

module.exports=function(passport){
    const opts = {};
    opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken(),
    opts.secretOrKey= secretKey
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            console.log("inside strategy")
            console.log(jwt_payload);
            const user = await User.findById(jwt_payload.id);
            if (!user) return done(null, false, { message: "user not found!" });
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
}
