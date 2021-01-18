const fs = require('fs');
const mysql = require('mysql');
const Config = require('../config');


const db = require('../models/index');

module.exports.loader =  async function (req, res) {
	const categories = await db.categories.findAll();
    if(categories){
        return categories;
    }else{
        return {
            status : 'error',
            message : "Empty Categoires"
        };
    }
};


