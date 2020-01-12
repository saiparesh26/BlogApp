var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

//App config
mongoose.connect("mongodb://localhost:27017/restful_blog_app" , {useNewUrlParser: true});
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended  :true}));

var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : {type : Date , default : Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

// RESTFUL Routes


app.get("/",function(req,res){
    res.redirect("/blogs");
});

//INDEX Route
app.get("/blogs",function(req,res){
    Blog.find({}, function(err, allblogs){
        if(err){
            console.log(err);
        }
        else{
             res.render("index" , {blogs : allblogs});
        }
    });
});

//NEW Route
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//CREATE Route
app.post("/blogs",function(req,res){
    //create blog
    Blog.create(req.body.blog , function(err,newBlog){
        if(err){
            res.render("new");
        }
        res.redirect("/blogs");
    });
});

//SHOW Route
app.get("/blogs/:id",function(req,res){
    //Find the blog
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.render("/blogs");
        }
        else{
            res.render("show", {blog : foundBlog});
        }
    })
});
// Title
// image
// body    
// created

app.listen(3000,"localhost",function(){
    console.log("Running");
});