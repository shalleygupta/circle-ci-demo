'use strict';

module.exports.hello = async (event) => {
  const randomNumber = parseInt(Math.random()*100);
  console.log("the random generated integer is", randomNumber);
  return randomNumber;
};
