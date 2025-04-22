
import Task from '../models/taskModel.js';

export async function create(req, res) {
    const taskData = req.body
     console.log(taskData);
    if (!taskData.title) {
       return res.send({ message: "title is missing" })
    } 
    const taskPayload = new Task(taskData);
    await taskPayload.save();
    return res.status(201).send({message:"create newtask successfully"});


}

export async function getAssignedTask(req,res){
    try{
        const assignedTo_title=req.query.title || "";
        const assignedTo= req.params.assignedTo 
        if(!assignedTo){
            return res.status(400).send({message: "AssignedTo task  is missing"})
          }
        let filterObject= {}
        if(assignedTo_title){
          filterObject.title= assignedTo_title
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await Task.find({assignedTo}).skip(skip).limit(limit)
        console.log(result);

        if (result.length>0) {

            res.status(200).send({
              message: 'Task Data found',
              data: result,
              count: result.length,
              totalItems:await Task.countDocuments(),
              totalPages: Math.ceil(await Task.countDocuments() / limit),
              currentPage: page
            })
        }
            else{
            res.status(200).send({message:"data found",data:result})
        }
    }
    catch(err){
        res.status(500).send({message:"something went wrong",error:err.message})
    }

}



    