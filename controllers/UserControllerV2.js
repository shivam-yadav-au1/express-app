const {models} = require('../sequelize');

async function create(req,res,next){
    // const request = req.body;
    try {
        await models.user.create(req.body);
        res.status(200).end();    
    } catch (error) {
        next(error);
    }
    
}

module.exports ={
    create
}