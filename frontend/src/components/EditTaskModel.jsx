import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskThunk } from '../store/taskSlice';
import { motion } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import toast from 'react-hot-toast';
const EditTaskModal = ({ task, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ ...task });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateTaskThunk({ id: task._id, updatedData: formData }));
        toast.success('updated successful!');
        
        onClose();
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative"
            >
                <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors">
                    <HiOutlineX size={24} />
                </button>

                <h2 className="text-2xl font-black text-slate-800 mb-6">Update Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500"
                        value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <textarea 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 resize-none"
                        rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <select 
                            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                            value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <input 
                            type="date" className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                            value={formData.dueDate ? formData.dueDate.split('T')[0] : ''}
                            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
                        Save Changes
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditTaskModal;