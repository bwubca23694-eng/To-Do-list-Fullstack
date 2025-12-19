import Todo from "../model/todo.model.js";

//create todo

 export const createTodo =async(req,res)=>{
    const todo=new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user: req.user._id,
    });

    try{
        const newtodo= await todo.save();
        res.status(201).json({message:"todo completly succefully",newtodo});
    }catch(error){
        console.log(error);
        res.status(400).json({message:"erroroccourd"});
    }
}; 

//get todo


export const getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find({user: req.user._id})
        res.status(201).json({massage:"todo fatch succefully",todos});

    } catch (error){
        console.log(error);
        res.status(400).json({massage:"error from todo fatching"});
    }
}
//update todo

export const updateTodo=async(req,res)=>{
    try{


        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        
        res.status(201).json({massage:"todo update succefully",todo});

    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(400).json({ message: "error from todo updating", error: error.message });
    }
    
}
////delete todo 

export const deleteTodo=async(req,res)=>{
    try{
       const todo= await Todo.findByIdAndDelete(req.params.id); 
       if(!todo){
        return res.status(404).json({message:"todo not found"})
       }
        res.status(201).json({massage:"todo delete succefully"});

    }catch(error){
        console.log(error);
        res.status(400).json({massage:"error from todo delete"});

    }
}




