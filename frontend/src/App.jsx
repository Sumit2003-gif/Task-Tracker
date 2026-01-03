import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './store/taskSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast'; // For Success/Error messages
import TaskForm from './components/Taskform';
import TaskItem from './components/TaskItem';
import { HiLightningBolt, HiFilter, HiSortDescending, HiCheckCircle } from 'react-icons/hi';

const App = () => {
  const dispatch = useDispatch();
  const { items: tasks, status } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const processedTasks = useMemo(() => {
    let filtered = [...tasks];
    if (filter !== 'All') filtered = filtered.filter(t => t.status === filter);
    if (sortBy === 'Due Date') {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return filtered;
  }, [tasks, filter, sortBy]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] py-12 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-4xl mx-auto">
        {/* --- Header Section --- */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 rotate-3">
                <HiLightningBolt size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                Task<span className="text-indigo-600">Flow.</span>
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-[11px] tracking-[0.25em] uppercase ml-1">Master Your Productivity</p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="bg-white/80 px-6 py-3 rounded-2xl shadow-sm border border-white/50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>
              <p className="text-2xl font-black text-slate-800">{tasks.filter(t => t.status !== 'Completed').length}</p>
            </div>
            <div className="bg-indigo-600 px-6 py-3 rounded-2xl shadow-lg shadow-indigo-100">
              <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Done</p>
              <p className="text-2xl font-black text-white">{tasks.filter(t => t.status === 'Completed').length}</p>
            </div>
          </div>
        </motion.header>

        {/* --- Form Section --- */}
        <div className="relative z-10">
            <TaskForm />
        </div>

        {/* --- Controls (Filters & Sort) --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 px-2">
          <div className="flex p-1.5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-sm w-full sm:w-auto">
            {['All', 'Pending', 'Completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                  filter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-white/60 px-5 py-3 rounded-2xl border border-white shadow-sm w-full sm:w-auto">
            <HiSortDescending size={20} className="text-indigo-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-sm font-black text-slate-700 uppercase tracking-wider"
            >
              <option value="Newest">Created Date</option>
              <option value="Due Date">Due Date</option>
            </select>
          </div>
        </div>

        {/* --- Task List --- */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {processedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </AnimatePresence>
          
          {processedTasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 bg-white/30 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-white/60"
            >
              <div className="inline-block p-6 bg-white rounded-full shadow-sm mb-4">
                <HiCheckCircle size={40} className="text-indigo-100" />
              </div>
              <p className="text-slate-400 font-bold text-xl italic tracking-tight">Everything is clear for now!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;