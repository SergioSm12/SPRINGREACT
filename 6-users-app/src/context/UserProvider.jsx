import React from 'react'
import { UserContext } from './UserContext'
import { useUsers } from '../hooks/useUsers';

export const Userprovider = ({children}) => {
    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
      } = useUsers();
  return (
 <UserContext.Provider value={
    {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    }
 }>
    {children}
     </UserContext.Provider>
  )
}
