import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../api/taskAPI";

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
    const response = await API.fetchTasks();
    return response.data;
});

export const addNewTask = createAsyncThunk('tasks/add', async (taskData) => {
    const response = await API.createTask(taskData);
    return response.data;
});

export const deleteTaskThunk = createAsyncThunk('tasks/delete', async (id) => {
    await API.deleteTask(id);
    return id;
});

export const updateTaskThunk = createAsyncThunk('tasks/update', async ({ id, updatedData }) => {
    const response = await API.updateTask(id, updatedData);
    return response.data;
});

export const toggleTaskStatusThunk = createAsyncThunk('tasks/toggleStatus', async ({ id, status }) => {
    const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
    const response = await API.updateTask(id, { status: newStatus });
    return response.data;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { items: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.items = state.items.filter(task => task._id !== action.payload);
            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(toggleTaskStatusThunk.fulfilled, (state, action) => {
                const index = state.items.findIndex(t => t._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            });
    }
});

export default taskSlice.reducer;