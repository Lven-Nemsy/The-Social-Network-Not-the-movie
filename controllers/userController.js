const User = require('../models/User');

module.exports = {
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Validate username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }

            // Validate email
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Validate password
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            } else if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            const user = new User({ username, email, password });
            await user.save();
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id); // or User.findOne({ username: req.params.username })
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Validate username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }

            // Validate email
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Validate password
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            } else if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            const user = await User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};