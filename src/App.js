import "./styles.css"
import {useEffect, useState} from 'react';
import todo from "./todo.png";
const getdata=()=>{
  const b=localStorage.getItem("mytodolist");
  if(b)
  return JSON.parse(b);
  else{
    return []
  }
}




function App() {
  const [inputdata,setinputdata]=useState("");
  const[items,setitems]=useState(getdata())
  const[edititem,setedititem]=useState("")
  const[toggle,settoggle]=useState(false);
   useEffect(()=>{
     localStorage.setItem("mytodolist",JSON.stringify(items));
  },[items])

const remove=(index)=>{
    const updateitems=items.filter((currentelement)=>{
             
            return currentelement.id !=index
    })
      setitems(updateitems)

}
const additem=()=>{
  if(!inputdata)
    alert("please fill the data")
    else if(inputdata&&toggle){
      setitems(items.map((currentelement)=>{
            if(currentelement.id==edititem)
            {
              return {...currentelement,name:inputdata}
            }
            else{
              return currentelement;
            }
            
      }))
      setedititem();
      setinputdata("");
      settoggle(false)
    }
      
    else{
     const obj={
        id:new Date().getTime().toString(),
        name:inputdata
     }
     setitems([...items,obj]);
     setinputdata("")
    }
}
 let p;
 
const edit=(index)=>{
  p=items.filter((currentelement)=>{
    settoggle(true);
    return currentelement.id==index;


  })
  
  setinputdata(p[0].name);
  setedititem(index);
  settoggle(true);
}

const removeall=()=>{
 const b= items.filter((currentelement,index)=>{
    return !currentelement.id;
  })
 setitems(b);

}
 return (
    <>
    <div className="main">

         <div className="first">
           <img src={todo} alt=""/>
            <p>Add your List here✌️</p>
          </div>
          <div className="second">
            <input type="text"  placeholder="🧾add items" value={inputdata} onChange={(e)=>{
                setinputdata(e.target.value);
            }}   />

            {toggle? (<i class="fa fa-edit add-btn" onClick={()=>{
                additem();
                }}></i>): (<i class="fa fa-plus " onClick={()=>{
                  additem();
                  }}></i>)
                }
        </div>
           {
              items.map((currentelement,index)=>{
                return(
                
            <div className="fourth" key={index}>
             <div className="heading">
               <h4>{currentelement.name}</h4>
             </div>
             <div className="img">
               <i class="fa fa-edit " onClick={()=>{
                edit(currentelement.id);
               }}></i>
               <i class="fa fa-trash-alt" onClick={()=>{
                   remove(currentelement.id);
               }}></i>
              </div>
         
             </div>
              )

          })
         }
          

        

          <div className="third">
            <button onClick={()=>{
              removeall();
            }}>remove all</button>
          </div>





    </div>
    
    
    
    
    
    </>
    
    )
}

export default App;
