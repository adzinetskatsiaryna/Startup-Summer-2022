import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../api/api"
import { RootState } from "../store"

export type RepoTupe = {
    name: string
    html_url: string
    description: string
}
export type UserTupe = {
    login: string
    id: number,
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string,
    site_admin: boolean
    name: string
    company: null | string
    blog: string
    location: null | string
    email: null | string
    hireable: null | string
    bio: null | string
    twitter_username: null | string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}

type InitialStateType = {
    user?: UserTupe | null | undefined
    reposTotalCount: number
    page: number
    pageCount: number
    userRepos: Array<RepoTupe> 
    error: string
    isLoading: boolean
}

const initialState:InitialStateType = {
    user: null,
    reposTotalCount: 0,
    page: 1,
    pageCount: 4,
    userRepos: [],
    error:'',
    isLoading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setIsLoading(state, action) {
        state.isLoading = action.payload;
      },
      setUser(state, action) {
        state.user = action.payload.user;
      },
      setError(state, action) {
        state.error = action.payload;
      },
      setPage(state, action){
          state.page = action.payload.page;
      },
      setRepos(state, action){
        state.userRepos = action.payload.data
      },
      setTotalCount(state, action){
          state.reposTotalCount = action.payload.totalCount;
      }
    },
});
export const { setIsLoading, setUser, setError, setPage,  setTotalCount, setRepos} =
    userSlice.actions;


    export const getUser = (username: string) => (dispatch: Dispatch<any>) => {
        dispatch(setIsLoading(true))
        api.getUser(username)
            .then(res => {
                dispatch(setUser({user: res.data}));
                dispatch(setTotalCount({totalCount: res.data.public_repos}))
                dispatch(setIsLoading(false))
            })
            .catch(err => {
                dispatch(setError(err.response.data.message));
                dispatch(setUser('undefined'))
            })
            .finally(()=>{
                dispatch(setIsLoading(false))
            })
    };
    
    export const getRepos = (username: string, page: number) => (dispatch: Dispatch<any>, getState: any)=>{
        const {pageCount} = getState().user;
        dispatch(setIsLoading(true))
        api.getUserRepos(username, pageCount, page)
            .then((res)=>{
                dispatch(setRepos({data: res.data}))
                dispatch(setIsLoading(false))
            })
            .catch((err)=>{
                dispatch(setError(err.response.data.message));
            })
            .finally(()=>{
                dispatch(setIsLoading(false))
            })
    }

  
export default userSlice.reducer;