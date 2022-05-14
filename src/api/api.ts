import axios from 'axios';

export const baseURL='https://api.github.com';

export const instance = axios.create({
    baseURL
});

export const api = {
    getUser(username: string){
       return instance.get(`/users/${username}`) 
    },
    getUserRepos(username: string, pageCount: number, page: number){      
        return instance.get(`/users/${username}/repos?per_page=${pageCount}&page=${page}`)
    }
}