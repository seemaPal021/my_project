
import Task from '../models/taskModel.js';
import {taskValidationSchema} from '../validations/taskValidation.js'
export async function create(req, res) {
    try{
    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const taskData= req.body
    const taskPayload = new Task(taskData);
    await taskPayload.save();
    return res.status(201).send({ message: "create newtask successfully" });
    }
    catch(err){
        res.status(500).send({message: "Something Went Wrong"})
    }

}

export async function getAssignedTask(req, res) {
    try {
        const taskTitle = req.query.title || "";
        const assignedTo = req.params.assignedTo
        const statusTask = req.query.status
        
        
        if (!assignedTo) {
            return res.status(400).send({ message: "AssignedTo task  is missing" })
        }
        let filterObject = {}
        if (taskTitle) {
            filterObject.title = taskTitle
        }
        if(assignedTo){
            filterObject.assignedTo = assignedTo
        }
       
        if (statusTask) {
            filterObject.status = statusTask;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await Task.find(filterObject).skip(skip).limit(limit)
        console.log(result);

        if (result.length > 0) {

            res.status(200).send({
                message: 'Task Data found',
                data: result,
                count: result.length,
                totalItems: await Task.countDocuments(),
                totalPages: Math.ceil(await Task.countDocuments() / limit),
                currentPage: page
            })
        }
        else {
            res.status(200).send({ message: "data found", data: result })
        }
    }
    catch (err) {
        res.status(500).send({ message: "something went wrong", error: err.message })
    }

}


export async function deleteTask(req, res) {

    const taskId = req.params.id
    if (!taskId) {
        return res.status(400).send({ message: "TaskID is missing" })
    }
    const result = await Task.deleteOne({ _id: taskId })
    console.log(result);

    if (result.deletedCount == 0) {
        res.status(500).send({ message: "Something went wrong unable to delete" })
    } else {
        res.status(200).send({ message: "task is  deleted sucessfully" })
    }

}

export async function updateTask(req, res) {
    const taskId = req.params.id
    if (!taskId) {
        return res.status(400).send({ message: "TaskID is missing" })
    }
    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const result = await Task.updateOne({ _id: taskId }, {$set: req.body})
        console.log(result);
        res.status(200).send({message: "Updated Sucessfuly"}, result)
        
    }
    catch(err){
        res.send(500).send({message:"Error", error: err.message})
    }

}
