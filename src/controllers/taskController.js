import task from '../models/taskModel.js';

export async function create(req, res) {
    const taskData = req.body
     console.log(taskData);
    if (!taskData.title) {
       return res.send({ message: "title is missing" })
    } 
    const taskPayload = new task(taskData);
    await taskPayload.save();
    return res.status(201).send({message:"create newtask successfully"});


}

export async function getAssignedTask(req,res){
    try{
        const assginedUserId= req.params.id
        if(!assginedUserId){
          return res.status(400).send({message: "AssignUserID is missing"})
        }
        const result = await User.findOne({_assignedTo: assginedUserId})
        console.log(result);
    }

}



    