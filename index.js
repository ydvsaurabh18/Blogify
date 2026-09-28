const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');


const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb+srv://yadavsourav1718_db_user:fw0ciUfSD95Ekgdy@cluster0.j73qjvb.mongodb.net/blogify?appName=Cluster0')
  .then((e) => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongodb connection error:", err));

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render('home', {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err.message);
    res.render('home', {
      user: req.user,
      blogs: [],
    });
  }
});


app.use("/user", userRoute);
app.use("/blog", blogRoute);




app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

