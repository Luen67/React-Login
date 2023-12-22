
import clsx from 'clsx';
import { useState } from 'react';

export default function LoginForm (){

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser] = useState(null);

    const onSubmit = async (e)=>{
        e.preventDefault();
        if(userName.trim()!=""&&password.trim()!=""){
            try{
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({                  
                      username: userName,
                      password: password
                    })
                  });              
                  const parsed = await response.json();
    
                  if(response.status === 200){
                    console.log(parsed); 
                    setUser(parsed);
                  }else if(response.status === 400){
                    alert("Usuario incorrecto");
                    setUserName("");
                    setPassword("");
                    console.log(parsed.id);
                  }else{
                    alert("Se presento un error");
                    console.log(parsed);
                  }
            }catch (error) {
                alert("Se presento un error");
                console.error(error);
            }   
        }else{
            alert("El usuario y/o password son obligatorios");
        }     
    }

    return(
        <div className={clsx('border border-white/50','p-5','rounded','w-full max-w-[500px]')}>
            {user==null? 
            <form className={clsx('flex flex-col gap-4')}
                onSubmit={onSubmit}>
                <input className={clsx('p-2 rounded','bg-white/80')} type="text" onChange={(e) => setUserName(e.target.value)} value={userName} placeholder='Ingrese su usuario'/>
                <input className={clsx('p-2 rounded','bg-white/80')} type="password"  onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Ingrese su password'/>
                <input className={clsx('bg-white text-black','w-full p-2 font-bold','cursor-pointer', 'rounded')} type="submit" value="Ingresar" />
            </form>
            :
            <div className='text-white flex flex-col justify-center items-center'>
                    <h1 className={clsx('font-bold uppercase text-lg')}>¡Usuario Identificado Correctamente!</h1>
                    <p>Bienvenid{user.gender==="female"?<>a</>:<>o</>} {user.firstName+' '+user.lastName} </p>             
            </div>
            }
        </div>
        
    );
}