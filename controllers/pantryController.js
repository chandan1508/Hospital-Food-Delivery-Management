import Pantry from '../models/Pantry.js';

export const assignTask = async (req, res) => {
  try {
    const newTask = new Pantry(req.body);
    await newTask.save();
    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning task', error: err.message });
  }
};

export const updatePreparationStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const updatedTask = await Pantry.findByIdAndUpdate(
      taskId,
      { preparationStatus: status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Preparation status updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error updating preparation status', error: err.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const updatedTask = await Pantry.findByIdAndUpdate(
      taskId,
      { deliveryStatus: status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Delivery status updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error updating delivery status', error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Pantry.find().populate('dietChartId');

    if (!tasks || tasks.length === 0)
      return res.status(404).json({ message: 'No tasks found' });

    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};
