const jwt =require("jsonwebtoken")

const Authentication=async(req,res,next)=>{

    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ message: "Access Denied not Tokn find!" });

    try {
     const decode=jwt.verify(token, process.env.SECRET_KEY);

     req.user=decode;
     console.log(req.user)
        next();
    } catch (err) {
        res.status(401).send({ message: "Access Denied!" });
        console.log(err);
    }

}
module.exports={Authentication}