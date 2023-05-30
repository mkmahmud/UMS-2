import { User } from './user.modal'

const getDBLastUserId = async () => {
  const getId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return getId?.id
}

export const genarateUserId = async () => {
  const currentId = (await getDBLastUserId()) || (0).toString().padStart(5, '0')
  const updatedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return updatedId
}
