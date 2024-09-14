const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
.then((res)=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [ 
 {
    from:"mayuri",
    to:"chinmay",
    msg:"Hello how are you.",
    created_at : new Date()
},
{
    from:"neha",
    to:"pranay",
    msg:"Hello.",
    created_at : new Date()
},
{
    from:"piyush",
    to:"veena",
    msg:"Send me notes.",
    created_at : new Date()
},
{
    from:"shradha",
    to:"mayuri",
    msg:"can you plz help me to learn js.",
    created_at : new Date()
},
{
    from:"preet",
    to:"nikita",
    msg:"where are you dear",
    created_at : new Date()
},
{
    from:"vaishnavi",
    to:"sanjan",
    msg:"Happy birthday",
    created_at : new Date()
},
{
    from:"harshal",
    to:"rohan",
    msg:"where are you.",
    created_at : new Date()
},
{
    from:"samir",
    to:"simran",
    msg:"plz share the practical doc",
    created_at : new Date()
},
{
    from:"rushikesh",
    to:"janvi",
    msg:"are you mad.",
    created_at : new Date()
},

{
    from:"mayuri",
    to:"chinmay",
    msg:"you are invited for the party.",
    created_at : new Date()
}


];

Chat.insertMany(allChats);