import React from 'react'

const Test = () => {
  return (
    <div className='navbar'>
        <a href='#home'>Home</a>
        <a href='#news'>News</a>
        <div className='dropdown'>
            <button className='dropbtn'>Dropdown</button>
            <div className='dropdown-content'>
                <a href='#'>Link 1</a>
                <a href='#'>Link 2</a>
                <a href='#'>Link 3</a>
            </div>
        </div>
    </div>
  )
}

export default Test
