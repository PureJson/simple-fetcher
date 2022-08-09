import React, { useRef } from 'react'

function SideBar({setUrl}: any) {  

  const urlRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: any) {
    e.preventDefault();
    setUrl(urlRef.current?.value)
  }

  return (
    <div>
      SideBar
      <br />

      <div>
        <form>
          <input 
            ref={urlRef}
            type="text" 
            placeholder='Введите url...'
          />
          <button onClick={handleSubmit}>go</button>
        </form>
      </div>

    </div>
  )
}

export default SideBar