import { useState, useCallback, useEffect, useRef } from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
  

function App() {
  const [length, setLength]=useState(6);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const[charAllowed, setCharAllowed]=useState(false);
  const[password, setPassword]=useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str +="0123456789"
    if(charAllowed) str += "!@#$%^&*_+=[]{}~`"

    for(let i=1; i<=length; i++){
    let char = Math.floor(Math.random() * str.length+1)
    pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => { passwordRef.current?.select() 
    window.navigator.clipboard.writeText(password);
    toast.success("copied to clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      className: "bg-green-100 text-green-800 rounded-lg shadow-md",
      bodyClassName: "text-sm",
    });
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
<>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-center text-orange-500 bg-gray-800  py-1">
    <h1 className="text-white text-centre font-semibold text-xl py-2">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text"
      value ={password}
      className="outline-none w-full py-1 px-3 rounded-lg"
      placeholder="password"
      readOnly
      ref={passwordRef} 
      />
      <button
      onClick={copyPasswordToClipboard}
      className="text-white bg-blue-500 p-2 rounded-lg ml-1 ">copy
      </button>
      <ToastContainer />
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input
        type="range"
        min={6}
        max={20}
        value={length}
        className="cursor-pointer"
        onChange={(e)=> {setLength(e.target.value)}}
        />
        <label className="pr-2">Length({length})</label>
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        className="cursor-pointer"
        id="numberInput"
        onChange={()=>{setNumberAllowed((prev) => !prev)}}
        />
        <label htmlFor="numberInput" className="pr-2">Numbers</label>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        className="cursor-pointer"
        onChange={()=>{setCharAllowed((prevs) => !prevs)}}
        />
        <label className="pr-2">Characters</label>
      </div>
    </div>
  </div>
</>
  )
}

export default App
