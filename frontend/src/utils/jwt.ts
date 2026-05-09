export function getPayload():null|{
    id:string,
    role:'admin'|'user'
}
    {
    const token=localStorage.getItem('token')
    try{
        if(!token){
            return null
        }
        const payloadBase64=token.split('.')[1]
        const decodedPayload=atob(payloadBase64)
        return JSON.parse(decodedPayload)
    }catch(err){
        return null
    }
}