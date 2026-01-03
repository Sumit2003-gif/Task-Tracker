import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskThunk, toggleTaskStatusThunk } from '../store/taskSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle, HiOutlinePencilAlt } from 'react-icons/hi';
import { IoMdDoneAll } from 'react-icons/io';
import EditTaskModal from './EditTaskModel';
import toast from 'react-hot-toast';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const priorityMap = {
        High: "from-red-500 to-orange-500 text-red-600 border-red-100",
        Medium: "from-amber-400 to-yellow-500 text-amber-600 border-amber-100",
        Low: "from-emerald-400 to-teal-500 text-emerald-600 border-emerald-100"
    };
    const handleDelete = async () => {
        try {
            await dispatch(deleteTaskThunk(task._id)).unwrap();
            toast.success('Task deleted successfully!', {
                style: { borderRadius: '15px', background: '#333', color: '#fff' }
            });
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };
    return (
        <>
            <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="relative group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
            >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${priorityMap[task.priority].split(' ').slice(0,2).join(' ')}`} />

                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-xl font-bold tracking-tight ${task.status === 'Completed' ? 'text-slate-300 line-through' : 'text-slate-800'}`}>
                            {task.title}
                        </h3>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${priorityMap[task.priority].split(' ').at(-1)}`}>
                            {task.priority}
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs font-bold">
                        <HiOutlineClock /> {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                            task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white'
                        }`}
                    >
                        {task.status}
                    </button>

                    <button onClick={() => setIsEditOpen(true)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <HiOutlinePencilAlt size={20} />
                    </button>

                    <button onClick={handleDelete} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <HiOutlineTrash size={20} />
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isEditOpen && <EditTaskModal task={task} onClose={() => setIsEditOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default TaskItem;