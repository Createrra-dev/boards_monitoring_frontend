import {configureStore} from '@reduxjs/toolkit'
import organizationsReducer from './features/organizationSlice'
import boardsReducer from './features/boardSlice'
import historyReducer from './features/boardHistorySlice'

export const store = configureStore({
    reducer: {
        organizations: organizationsReducer,
        boards: boardsReducer,
        history: historyReducer
    }
})