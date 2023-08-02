// controllers/declarationController.js
const Declaration = require('../models/declaration');

// exports.showForm = (req, res) => {
//   //res.sendFile("../views/declaration");
//  //res.render("../views/declaration")
// };

exports.submitForm = async (req, res) => {
  try {
    const { name, email } = req.body;


    // Create a new declaration document
    const newDeclaration = new Declaration({
      name,
      email,
    });

    // Save the declaration to the database
    await newDeclaration.save();

    res.send('your application submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
