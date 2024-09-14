const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"/views"));
app.set("views engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main()
.then((res)=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

//index Route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find(); // beacuse chat.find is a async function
    // console.log(chats);
    res.render("index.ejs",{chats});
});

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create Route

app.post("/chats",(req,res)=>{
    let{from,to,msg} = req.body;
    let newChat = new Chat ({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    // console.log(newChat);
    
    newChat.save().then(res =>{
        console.log("chat is saved");
    }).catch(err =>{
        console.log(err);
    })
    res.redirect("/chats");
    
})

// Edit Route

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});

})

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let{id}= req.params;
    let {msg:newMsg }= req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators :true,new:true},  
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route

app.delete("/chats/:id",async (req,res)=>{
    console.log(req.params);
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
    
})



app.get("/",(req,res)=>{
    res.send("root is working");
})

app.listen(port,()=>{
    console.log("server is listening to port 8080");
})