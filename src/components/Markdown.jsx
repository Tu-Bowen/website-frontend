import { compile } from '../../untils/components/markdown'
import React, { useContext, useRef } from 'react'
const Markdown = ({ theContext }) => {
    const contextRef = useRef(null)
    const marktext = useContext(theContext)
    const article = compile(marktext)
    return (
        <div ref={contextRef} dangerouslySetInnerHTML={{__html:article}}></div>
    )
}
export default Markdown