import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    console.log("password generator");
    let pass = ""; //in which randomly generated password
    let str = "ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstuvwxyz"; //from which we generate random password

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "{}[];';:,./|?><=-_+`~!@#$%^&*()\"";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  },[length,numberAllowed, characterAllowed,setPassword])

//for copy text from password input
  const copyPasswordToClipboard = useCallback (()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <div className="h-screen w-auto flex justify-center bg-black text-white">
      <div className="flex flex-col gap-7 flex-wrap fixed top-10 bg-gray-800 rounded-xl p-3 max-w-2xl">
        <div className="flex justify-between mt-2">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Password"
            className="rounded-l-xl w-4/5 h-10 cursor-pointer p-2 text-pink-600"
            ref={passwordRef}
          />
          <button className="bg-blue-800 pl-10 pr-9 rounded-r-xl "onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="flex gap-6 text-orange-600 pl-4">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev); //previous value change to true if false
              }}
            />
            <label className="ml-1">Add Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label className="ml-1">Add Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
