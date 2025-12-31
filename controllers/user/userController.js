const User = require("../../models/User");
const fs = require('fs');
const path = require('path');

exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      bio: req.body.bio,
    };

    if (req.body.avatar && req.body.avatar.startsWith('data:image')) {
      try {
        const base64Data = req.body.avatar.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        
        const fileName = `profile-${req.user._id}-${Date.now()}.jpg`;
        const filePath = path.join(__dirname, '../../uploads', fileName);
        
        fs.writeFileSync(filePath, buffer);
        
        updates.avatar = `/uploads/${fileName}`;
      } catch (err) {
        console.error('Error saving avatar:', err);
        return res.status(400).json({ message: 'Invalid image data' });
      }
    } else if (req.body.avatar === '') {
      updates.avatar = '';
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: "Profile update failed" });
  }
};