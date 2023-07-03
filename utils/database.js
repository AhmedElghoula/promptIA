import mongoose from "mongoose"

let isConnected=false;
export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        return;
    }

    try{
        
        await mongoose.connect("mongodb+srv://ahmed:ahmed@cluster0.avchgiu.mongodb.net/?retryWrites=true&w=majority",{
            dbName:"shared_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected=true;
    }catch(e){ console.log(e)}
}