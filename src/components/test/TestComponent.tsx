import {useRef} from "react";


function TestComponent() {
  const myInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    myInputRef.current?.focus(); 
  };

  return (
    <div>
      <input ref={myInputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}


export default TestComponent;