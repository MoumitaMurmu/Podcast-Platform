import { configureStore } from "@reduxjs/toolkit";

import useReducer from './slices/userSlice';
import podcastReducer from './slices/podcastSlice';
import episodeReducer from './slices/episodeSlice';

export default configureStore({
    reducer: {
        user: useReducer,
        podcasts: podcastReducer,
        episode: episodeReducer,

    },
});