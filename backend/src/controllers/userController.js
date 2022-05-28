const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Op } = require("sequelize");

const controller = {};
const db = require('../models');
const isAndExistingUser = async (email,phoneNumber) => {
   let user = await db.User.findAndCountAll({where:{
        [Op.or]: [
            {email: email},
            { phoneNumber : phoneNumber }
          ]
    } }); 
    return user.count == 0;
}
const findUserByEmail = async (email) => {
    let user = await db.User.findOne({where:{email: email}
     }); 
     console.log(user);
     return user;
 }

controller.singinByEmail = async(req,res) =>{
    let {email,password} = req.body;
    let user = await findUserByEmail(email);
    console.log();
    if(user != null){
        let isvalidPasssword = await bcrypt.compare(password, user.password);
        if(isvalidPasssword){
            res.status(200).json({
                code:200,
                data: user,
                message : "user sigin good"
            });
        }else{
            res.status(200).json(
                {
                    code : 400,
                    message : "user password is incorrect try again"
                }
            );
        }
    }else{
        res.status(200).json(
            {
                code : 400,
                message : "user not exist enter correct email"
            }
        );
    }

}

controller.create = async(req,res) => {
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        typeUser,
        structure,
        siret,
        facturationAdress,
        postalCode,
        city,
        profileImagePath
    } = req.body;
    password = bcrypt.hashSync(password, saltRounds);
    let userExist = await isAndExistingUser(email,phoneNumber);
    if(userExist){
        db.User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            typeUser,
            structure,
            siret,
            facturationAdress,
            postalCode,
            city,
            profileImagePath
        }).then((user) => {
            res.status(200).json({
                code : 200,
                data : user,
                message : "user has created successfully",
            });
        }).catch((err) => {
            console.error(err);
        });
    }else{
        res.status(200).json(
            {
                code : 400,
                message : "user Exist"
            }
        );
    }
};

controller.findAll = (req,res) => {
    db.User.findAll({
    }).then((users) => {
        res.status(200).json(users);
    }).catch((err) => {
        console.error(err);
    });
};

controller.findOne = (req,res) => {
    db.User.findOne({where: { id: req.params.userId },}).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.error(err);
    });  
};

module.exports = controller;