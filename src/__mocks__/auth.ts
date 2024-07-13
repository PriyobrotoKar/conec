import { Session } from 'next-auth'

const mockedSession: Session = {
  expires: '1',
  user: {
    email: 'johnDoe@gmail.com',
    name: 'John Doe',
    image: 'https://res.cloudinary.com/2343f23fwvaae/aeewefwg33'
  }
}

export const auth = () => mockedSession
