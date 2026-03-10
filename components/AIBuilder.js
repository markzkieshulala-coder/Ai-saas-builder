"use client"

import {useState} from "react"

export default function AIBuilder(){

const [name,setName]=useState("")
const [desc,setDesc]=useState("")
const [type,setType]=useState("Business")
const [prompt,setPrompt]=useState("")
const [html,setHtml]=useState("")

async function generate(){

const res=await fetch("/api/generate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
desc,
type
})
})

const data=await res.json()

setHtml(data.html)

}

async function editWithAI(){

const res=await fetch("/api/edit",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
prompt,
currentHtml:html
})
})

const data=await res.json()

setHtml(data.html)

}

function downloadSite(){

const blob=new Blob([html],{type:"text/html"})

const link=document.createElement("a")

link.href=URL.createObjectURL(blob)

link.download="website.html"

link.click()

}

return(

<div>

<h2>AI Website Builder</h2>

<select onChange={(e)=>setType(e.target.value)}>
<option>Business</option>
<option>Blog</option>
<option>Portfolio</option>
</select>

<input
placeholder="Business Name"
onChange={(e)=>setName(e.target.value)}
/>

<textarea
placeholder="Description"
onChange={(e)=>setDesc(e.target.value)}
/>

<button onClick={generate}>
Generate Website
</button>

<hr/>

<h3>Edit Website With AI</h3>

<input
placeholder="Example: Add pricing section"
onChange={(e)=>setPrompt(e.target.value)}
/>

<button onClick={editWithAI}>
Apply AI Change
</button>

<hr/>

<button onClick={downloadSite}>
Download Website
</button>

<hr/>

<h3>Preview</h3>

<div
style={{
border:"1px solid #ccc",
padding:"15px",
marginTop:"20px"
}}
dangerouslySetInnerHTML={{__html:html}}
/>

</div>

)

}
