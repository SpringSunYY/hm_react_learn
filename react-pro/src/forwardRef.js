import { forwardRef, useRef } from "react"

// 子组件
// function Son () {
//   return <input type="text" />
// }

const Son = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />
})


// 父组件
function ForwardRef () {
  const sonRef = useRef(null)
  const showRef = () => {
    console.log(sonRef)
    sonRef.current.focus()
  }
  return (
    <>
      <Son ref={sonRef} />
      <button onClick={showRef}>focus</button>
    </>
  )
}

export default ForwardRef
