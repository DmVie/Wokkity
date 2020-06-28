import React, { useEffect, useState } from 'react'

import './PictureBox.css';

const PictureBox = ({images = [], index}) => {

  const [ pointer, setPointer ] = useState(0);

  useEffect(() => {
    document.querySelector('.taper').style.width = images.length * 100 + 'vw';
    if(index) {
      setPointer(index);
      shift("right")
    }
  },[])

  const shift = (dir) => {

    // I need to update the state and then use this new state value right away however as i understand it the state value is not available till next render, this caused a lag in the value of my pointer always being one behind.  The only way I could think is just to create another variable internalPOinter which is incremeneted immediately and then used wherever in the function I need value.

    // Also need to find a way to refactor below as the duplicate code is annoying
  
    let internalPointer; 
    if(dir === "left") {
      if(pointer >= 1) {
        // we can go left
        setPointer(pointer - 1);
        internalPointer = pointer - 1;  
        let vw = `${internalPointer * - 100 + "vw"}`
        console.log('pointer:', internalPointer, vw)
        document.querySelector('.taper').style.transform = `translateX(${vw})`    
      }
    }else if(dir === 'right') { 
      if(pointer < images.length-1) {
        // we can still go right      
        setPointer(pointer + 1) 
        internalPointer = pointer + 1;
        let vw = `${internalPointer * - 100 + "vw"}`
        console.log('pointer:', internalPointer, vw)
        document.querySelector('.taper').style.transform = `translateX(${vw})`
      }
    }
  }


  return (
    <section className="picture-box"> 
      <div className="picture-window">
        <div className="left-nav-box" onClick={() => shift('left')}><div>&lt;</div></div>
        <div className="right-nav-box" onClick={() => shift('right')}><div>&gt;</div></div>
        <ul class="taper">
          {
            images.map((img) => {
              return (
                <li>  
                  <img src={img} alt="picture box image" />
                </li>
              )
            })
          }
        </ul>
      </div>      
    </section>
  )
}

export default PictureBox
