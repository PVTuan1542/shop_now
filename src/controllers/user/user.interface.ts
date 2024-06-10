
export interface UserRegister{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  userName: string,
  password: string,
  isWork: boolean
}

export interface UserLogin{
  userName: string,
  password: string,
}
