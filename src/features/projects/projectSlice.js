import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjectsContent = createAsyncThunk(
  '/projects/content',
  async () => {
    const response = await axios.get('/api/projects', {});
    console.log('response.data');
    console.log(response.data);
    return response.data;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    isLoading: false,
    projects: [],
  },
  reducers: {
    addNewProject: (state, action) => {
      let { newProjectObj } = action.payload;
      state.projects = [...state.projects, newProjectObj];
    },

    deleteProject: (state, action) => {
      let { index } = action.payload;
      state.projects.splice(index, 1);
      axios.delete(`/api/projects/${index}/delete`);
    },

    editProject: (state, action) => {
      let { index, updatedProjectObj } = action.payload;
      state.projects[index] = updatedProjectObj;
    },
  },

  extraReducers: {
    [getProjectsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getProjectsContent.fulfilled]: (state, action) => {
      state.projects = action.payload.data;
      state.isLoading = false;
    },
    [getProjectsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewProject, deleteProject, editProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
