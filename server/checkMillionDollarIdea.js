const checkMillionDollarIdea = (req, res, next) => {
  let totalIncome;
  let {weeklyRevenue, numWeeks} = req.body;  

  if (typeof numWeeks !== 'number' || typeof weeklyRevenue !== 'number') {
    return res.status(400).send();
  } else {
    totalIncome = numWeeks * weeklyRevenue;
  }

  if (totalIncome < 1000000) {
    res.status(400).send();
  } else {
    return next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
