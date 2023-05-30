import config from '../../../configure'
import { IUser } from './user.interface'
import { User } from './user.modal'
import { genarateUserId } from './user.utlis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Incremantal Id
  const id = await genarateUserId()
  user.id = id
  //   Defualt Password
  if (!user.password) {
    user.password = config.D_USER_PASSWORD as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to  create a new User')
  }
  return createdUser
}

export default {
  createUser,
}
