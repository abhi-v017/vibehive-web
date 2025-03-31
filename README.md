# 🌐 Social Media Platform <br>
A full-stack social media platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Connect, share, and interact with others seamlessly! <br>

✨ Features <br>
✅ User Authentication 🔐 – Secure login & registration system <br>
✅ Post Creation 📝 – Users can create, edit, and delete posts <br>
✅ Commenting System 💬 – Engage with posts through comments <br>
✅ Real-time Notifications 🔔 – Stay updated with live alerts <br>
✅ Responsive Design 📱 – Optimized for various devices <br>

🛠 Tech Stack <br>
Technology	Description <br>
⚛️ Frontend	React.js, Tailwind CSS <br>
🚀 Backend	Node.js, Express.js <br>
🗄 Database	MongoDB v
📦 State Management	Redux Toolkit <br>
🔐 Authentication	JSON Web Tokens (JWT) <br>
⚡ Bundler	Vite <br>
⚡ Installation & Setup <br>
Follow these steps to set up the project on your local machine: <br>

1️⃣ Clone the Repository <br>
git clone https://github.com/abhi-v017/social-media.git <br>
cd social-media <br>
2️⃣ Install Dependencies <br>
# Install backend dependencies <br>
cd backend <br>
npm install <br>

# Install frontend dependencies <br>
cd ../frontend <br>
npm install <br>
3️⃣ Set Up Environment Variables <br>
Create a .env file inside the backend directory and add the following: <br>
MONGO_URI=your_mongodb_connection_string <br>
JWT_SECRET=your_jwt_secret <br>
4️⃣ Run the Application 🚀 <br>
# Start backend server <br>
cd backend <br>
npm start <br>

# Start frontend development server <br>
cd ../frontend <br>
npm run dev <br>
Your application should now be running locally! 🎉 <br>

🛠 Usage Guide <br>
📌 Authentication – Register or log in to access the platform. <br>
📌 Creating Posts – Navigate to "Create Post," enter your content, and submit. <br>
📌 Interacting with Posts – Like, comment, and engage with posts. <br>
📌 Notifications – Get real-time updates on user interactions. <br>

🔗 API Endpoints <br>
Method	Endpoint	Description <br>
POST	/api/auth/register	Register a new user <br>
POST	/api/auth/login	Authenticate a user <br>
GET	/api/posts	Retrieve all posts <br>
POST	/api/posts	Create a new post <br>
PUT	/api/posts/:id	Update an existing post <br>
DELETE	/api/posts/:id	Delete a post <br>
POST	/api/posts/:id/comments	Add a comment to a post <br>
🤝 Contribution Guidelines <br>
🚀 Want to contribute? Follow these steps: <br>

Fork the repository 🍴 <br>
Create a new branch: git checkout -b feature/your-feature-name <br>
Commit your changes: git commit -m 'Add some feature' <br>
Push to the branch: git push origin feature/your-feature-name <br>
Open a pull request 📩 <br>
📜 License <br>
📝 This project is licensed under the MIT License. <br>

👨‍💻 Author <br>
Developed with ❤️ by Abhishek Verma. <br>

🚀 Happy Coding! 🎉
