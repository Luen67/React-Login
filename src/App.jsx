import LoginForm from "./components/LoginForm"
import clsx from 'clsx';

export default function App() {
  return (
   <main className={clsx('bg-black',
                        'flex flex-col justify-center items-center',
                        'min-h-screen')}>
    <LoginForm/>
   </main>
  )
}


