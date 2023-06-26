import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com/api',
  headers: { 'dev-email-address': 'pedrohalquimim@gmail.com' },
})
