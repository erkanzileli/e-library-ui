import axios from 'axios'

export async function login (data) {
  return axios.post({
    url: 'http://192.168.1.7:8080/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

// logout should be write
export async function logout () {
  return null
}
