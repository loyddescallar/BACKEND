// controllers/UserController.js
import UserModel from "../models/UserModel.js";

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.createUser(email, password);
    res.status(201).json({ success: true, message: user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};



// // controllers/UserController.js
// import UserModel from "../models/UserModel.js";

// // ✅ CREATE USER
// export const createUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.createUser(email, password);
//     res.status(201).json({ success: true, message: user });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // ✅ READ USERS
// export const fetchUser = async (req, res) => {
//   try {
//     const users = await UserModel.getAllUsers();
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ UPDATE USER
// export const editUser = async (req, res) => {
//   const { UserId } = req.params;
//   const { email, password } = req.body;

//   try {
//     const updated = await UserModel.updateUser(UserId, { email, password });
//     res.status(200).json({ success: true, message: updated });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // ✅ DELETE USER
// export const deleteUser = async (req, res) => {
//   const { UserId } = req.params;

//   try {
//     const deleted = await UserModel.deleteUser(UserId);
//     res.status(200).json({ success: true, message: deleted });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
