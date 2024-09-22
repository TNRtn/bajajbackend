const UserRequest = require("../model/User");
const jwt = require("jsonwebtoken");
const mg = require("mongoose");

const unew = async (req, res) => {
  const { user_id, email, roll_number, data } = req.body;

  if (!user_id || !email || !roll_number || !data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input format' });
  }

  try {
    
    const processData = (data) => {
      let numbers = [];
      let alphabets = [];
      let highestAlphabet = null;

      data.forEach((item) => {
        if (!isNaN(item)) {
          numbers.push(item);  
        } else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item);  
          if (!highestAlphabet || item.toLowerCase() > highestAlphabet.toLowerCase()) {
            highestAlphabet = item;
          }
        }
      });

      return {
        numbers,
        alphabets,
        highestAlphabet: highestAlphabet ? [highestAlphabet] : []
      };
    };

    
    const { numbers, alphabets, highestAlphabet } = processData(data);

    
    const newRequest = new UserRequest({
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestAlphabet
    });

    await newRequest.save();

    // Send success response after data is saved
    return res.status(200).json({
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestAlphabet
    });

  } catch (error) {
  
    return res.status(500).json({ is_success: false, message: 'Server error', error: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    
    const allUsers = await UserRequest.find();  

    if (allUsers.length === 0) {
      return res.status(404).json({
        is_success: false,
        message: 'No users found'
      });
    }

  
    return res.status(200).json({
      is_success: true,
      data: allUsers
    });

  } catch (error) {

    return res.status(500).json({
      is_success: false,
      message: 'Server error',
      error: error.message
    });
  }
}
module.exports = { unew,getAllUsers};
