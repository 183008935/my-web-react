import Ietm from './componts/Ietm.jsx';
import Footer from './componts/Footer.jsx';
require('../css/index.css');
require('../css/app.css');
class App extends React.Component{
  constructor(){
    super();
    this.state={
      todosData:[],
      inputVal:'',
      view:'all'
    }
    this.keyDownPost=this.keyDownPost.bind(this);
    this.onDestroy=this.onDestroy.bind(this);
    this.onclearCompleted=this.onclearCompleted.bind(this);
    this.inputChange=this.inputChange.bind(this);
    this.toggleAll=this.toggleAll.bind(this);
    this.onToggle=this.onToggle.bind(this);
    this.changeView=this.changeView.bind(this);
    this.itemEditDone=this.itemEditDone.bind(this);
    // this.handleClick=this.handleClick.bind(this)
  }
  // handleClick(){
  //   this.setState({
  //     inputVal:''
  //   })
  // }
  itemEditDone(todo,value){
         let {todosData}=this.state;
         todosData=todosData.map(elt=>{
              if(todo.id===elt.id){
                elt.value=value;
              }
              return elt;
         })
  }
  changeView(view){
    this.setState({view})
  }
  inputChange(ev){
    this.setState({
      inputVal:ev.target.value
    })
  }
  toggleAll(ev){
    let {checked}=ev.target;
    let {todosData}=this.state;
    todosData = todosData.map(elt=>{
      elt.hasCompleted=checked;
      return elt;
    });
    this.setState({todosData})
  }
  onToggle(todo){
    let {todosData}=this.state;
    todosData=todosData.map(elt=>{
          if(elt.id===todo.id){
            elt.hasCompleted=!elt.hasCompleted;
          }  
          return elt;
    });
   this.setState({todosData})
  }
  keyDownPost(ev){
     if(ev.keyCode!==13){return };
     let {inputVal}=this.state;
     let value=inputVal.trim();
     if(value===''){return};
     let todo={};
     todo.id = new Date().getTime();
     todo.value=value;
     todo.hasCompleted=false;
     let {todosData}=this.state;
     todosData.push(todo);
     this.setState({
       todosData,
       inputVal:''
     })
     
  }
  onDestroy(todo){
    let {todosData}=this.state;
    todosData=todosData.filter((elt)=>{
        return  elt.id!==todo.id
    })
    this.setState({todosData})
  }
  onclearCompleted(){
    let {todosData}=this.state;
    todosData=todosData.filter((elt)=>{
        return  !elt.hasCompleted;
    })
    this.setState({todosData}) 
  }
  render(){
   
    let {keyDownPost,onDestroy,onclearCompleted,inputChange,toggleAll,onToggle,changeView,itemEditDone,handleClick}=this;
   
    let {todosData,inputVal,view}=this.state;
   
    let items=null,footer=null,itemsBox=null;

    let leftCount=todosData.length;

    items=todosData.filter(elt=>{
      if(elt.hasCompleted){leftCount--};
      switch(view){
        case 'active':
        return !elt.hasCompleted;
        case 'completed':
        return  elt.hasCompleted;
        default:return true;
      }
    })
    
    items=items.map((elt,i)=>{
   
      return <Ietm {
        ...{
          onDestroy,
          todo:elt,
          onToggle,
          itemEditDone
        }}
        key={i}
      />
    });
     if(todosData.length){
       itemsBox = (
        <section className="main">
        <input type="checkbox"
         className="toggle-all"
         onChange={toggleAll}
         checked={leftCount===0}
        
        />
        <ul className="todo-list">
          {items}
        </ul>
        </section>

       )
      footer =(<Footer 
           {...{
             leftCount,
             showClearBtton:leftCount<todosData.length,
             onclearCompleted,
             changeView,
             view
           }}
        />)
     }
      
    return(
       <div>
         <header className="header">
           <h1>钟声-todos</h1> 
           <input type="text"  
            className="new-todo"
            placeholder="您需要做什么？"
            value={inputVal}
            onChange={inputChange}
            onKeyDown={keyDownPost}
            // onClick={handleClick}
            
            />
         </header>
          {itemsBox}
          {footer}
       </div>
    )
  }
}
export default App;
