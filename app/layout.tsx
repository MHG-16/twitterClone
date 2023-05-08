import { User } from '@prisma/client'
import Layout from './components/Layout'
import LoginModal from './components/modal/LoginModal'
import RegisterModal from './components/modal/RegisterModal'
import './globals.css'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import getUsers from './actions/getUsers'
import EditModal from './components/modal/EditModal'

export const metadata = {
  title: 'twitter Clone',
  description: 'Generated by create next app',
}

const RootLayout = async (
  {
  children
  } :  {children: React.ReactElement}) => {
  const currentUser = await getCurrentUser();
  const users = await getUsers({limit: 5}) || [];
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <EditModal user={currentUser}/>
        <Layout user={currentUser} users={users}>
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout;