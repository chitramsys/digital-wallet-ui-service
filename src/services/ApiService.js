import UserService from "./UserService"
export async function signup(userDetails) {
    try {
        const response = await fetch(`http://3.232.225.73/digitalwallet/user/create`,  {
            headers:{
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
                
            },
            method: "POST",
            body: JSON.stringify(userDetails),
        })
       console.log(response)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function linkToken(userDetails) {
    try {
        const response = await fetch(`http://3.232.225.73/digital-wallet/digital-wallet/link-bank-account`,  {
            headers:{
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization' : `Bearer ${UserService.getToken()}`
                
            },
            method: "POST",
            body: JSON.stringify({
                "userId": "95925151-2962-4432-b0d0-b752c15a822d"
              }),
        })
       console.log(response)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}