export async function signup(userDetails) {
    try {
        const response = await fetch(`${process.env.REACT_APP_serverURL}/user/create`,  {
            headers:{
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                
            },
            method: "POST",
            body: JSON.stringify(userDetails),
        })
        if(response.status !== 200) {
            const json = response.json()
            return Promise.resolve(json)
        }else {
            const json = response.json()
            return Promise.resolve(json)
        }
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function linkToken(userDetails) {
    try {
        const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/link-token`,  {
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'    
            },
            method: "POST",
            body: JSON.stringify({
                "userId": "642eca73e504cb20a953eba6"
              }),
        })
        if(response.status !== 200) {
            throw Error('Failed Fetch')
        }else {
            const json = response.json()
            return Promise.resolve(json)
        }
       
       // localStorage.setItem("link_token", data.result.data.link_token);
      // console.log(response)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

