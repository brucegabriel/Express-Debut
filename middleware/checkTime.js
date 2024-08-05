const checkTime = (req, res, next) => {
    const currentHour = new Date().getHours();
    console.log(currentHour);
    if (currentHour <= 12 && currentHour < 21) {
        next();
    } else {
        res.json({ message: "The website is only operational from 12pm to 2 pm. Please come back later" }).status(403);   // 403 - unauthorized, 500 - server error
    }
};

module.exports = checkTime;