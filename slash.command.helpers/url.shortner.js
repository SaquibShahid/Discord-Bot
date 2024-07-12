const shortid = require("shortid");
const urlModel = require('../models/url.db')

exports.generateShortUrl =  async(url) =>{
    const urlShort = shortid();
    await urlModel.create({
        shortId : urlShort,
        redirectUrl : url,
        visitHistory : []
    });
    return urlShort;
}

exports.redirectUrl = async(req, res) =>{
    if(!req.params)return res.status(404).json({message : "url not found"});
    const shortId = req.params.shortId;
    const urlData = await urlModel.findOneAndUpdate({shortId},{
        $push:{
            visitHistory : {
                timestamp : Date.now()
            }
        }
    });
    res.redirect(urlData.redirectUrl.trim());
}