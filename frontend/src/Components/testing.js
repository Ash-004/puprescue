import React,{useEffect} from "react";

function Testing(){
    useEffect(()=>{console.log("useeffect")},[])
    return <div>Test</div>
}

export default Testing;