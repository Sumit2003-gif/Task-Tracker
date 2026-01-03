import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../store/taskSlice';
import { motion } from 'framer-motion';
import { HiPlus, HiOutlineDocumentText, HiOutlineCalendar, HiOutlineFlag } from 'react-icons/hi';
import toast from 'react-hot-toast';

const TaskForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(addNewTask(formData)).unwrap();
            toast.success('Action successful!');
            setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
        } catch (error) {
            // alert(error?.message || "Failed to add task");
            toast.error(error?.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-slate-200/60 mb-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <HiPlus size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Create New Task</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
                            <HiOutlineDocumentText className="text-blue-500" /> Task Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. Design System Update" 
                            className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                        />
                    </div>

                    {/* Date Input */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
                            <HiOutlineCalendar className="text-blue-500" /> Due Date
                        </label>
                        <input 
                            type="date" 
                            className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all cursor-pointer font-medium"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
                            <HiOutlineDocumentText className="text-blue-500" /> Description
                        </label>
                        <textarea 
                            placeholder="What are the specific steps or requirements?"
                            rows="3"
                            className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    {/* Priority Selector */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-500 ml-1">
                            <HiOutlineFlag className="text-blue-500" /> Priority Level
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-700"
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                            >
                                <option value="Low">Low Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="High">High Priority</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-end">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            type="submit" 
                            className={`w-full h-[60px] flex items-center justify-center gap-2 font-black rounded-2xl transition-all shadow-xl active:shadow-inner ${
                                loading 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-slate-900 text-white hover:bg-blue-600 shadow-blue-200/20'
                            }`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <HiPlus size={20} />
                                    <span>Create Task</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default TaskForm;