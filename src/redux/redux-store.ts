import {combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {DialogsActionsType, dialogsReducer} from "./dialogs-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    sidebar: sidebarReducer ,
    dialogsPage: dialogsReducer
})

export let store = createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>
export type DispatchStoreType = typeof store.dispatch

export type ActionsType = DialogsActionsType | ProfileActionsType

