import mongoose from 'mongoose';

export const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/coderone');
        console.log('MongooDB connected');
    }catch (error) {
        console.log(error);
    }
}