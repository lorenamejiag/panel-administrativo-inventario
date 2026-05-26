export function generateToken(){
    let token = "t"
    for (let index = 0; index < 30; index++) {
        token += Math.random().toString(36).substring(1)        
    }
    return token
}