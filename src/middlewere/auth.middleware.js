const Users = require("../models/user.model");
const userController = require('../users/users.controller')


const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

/*module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),     //extrae la informacion con este 'JWT' generador de TOKEN
        secretOrKey: "academlo" // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            Users.findOne({where:{id: decoded.id}}, (err, user) => {
                if(err){
                    return done(err, false)
                }
                if(user){
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            })
        })
    )
};*/


module.exports = (passport) => {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: "academlo", // debe estar en una variable de entorno
    };
    passport.use(
      new JwtStrategy(opts, async (decoded, done) => {
        try {
          const response = await userController.getUserById(decoded.id);
          if (!response) return done(null, false);
          console.log("decoded jwt", decoded);
          return done(null, decoded);
        } catch (error) {
          done(error.message);
        }
      })
    );
  };
  