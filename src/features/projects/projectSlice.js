import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjectsContent = createAsyncThunk(
  '/projects/content',
  async () => {
    const response = await axios.get('/api/projects', {});
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

export const { addNewProject, deleteProject } = projectsSlice.actions;

export default projectsSlice.reducer;
