const controller = require('app/http/controllers/api/controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const HomeController = require("./homeController");

class authController extends controller {
    
    async login(req , res) {
        if(! await this.validationData(req , res)) return;

        passport.authenticate('local.login' , { session : false } , (err , user) => {
            if(err) return this.failed(err.message , res);
            if(!user) return this.failed('چنین کاربری وجود ندارد', res , 404) 

            req.login(user , { session : false } , async (err) => {
                if(err) return this.failed(err.message , res);

                // create token
                const token = jwt.sign({ id : user.id } , config.jwt.secret_key , {
                    expiresIn : 60 * 60 * 24
                });
                user = await user.populate({ path : 'roles' , select : 'name label permissions' , populate : [ { path : 'permissions' }]}).execPopulate();
                return res.json({
                    data : {
                        token,
                        user: HomeController.filterUserData(user),
                    },
                    status : 'success'
                })

            })

        })(req , res);
    }
}

module.exports = new authController();