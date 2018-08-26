 import Ietm from './Ietm.jsx';
 import Footer from './Footer.jsx';
 require('../css/app.css');
 require('../css/index.css');

import React, { Component } from 'react'

export default class App extends Component {
    constructor(){
        super();
        this.state={
            todosDate:[],
            inputVal:''
        }
        this.keyDownPost=this.keyDownPost.bind(this);
        this.onClearCompleted=this.onClearCompleted.bind(this);
        this.onDestory=this.onDestory.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.toggleAll=this.toggleAll.bind(this);
        this.onToggle=this.onToggle.bind(this);
        this.itemEditDone=this.itemEditDone.bind(this)
    }
    itemEditDone(todo,value){

        let {todosDate}=this.state;

        todosDate=todosDate.map(elt=>{
            if(todo.id===elt.id){
                elt.value=value;
            }
            return elt;
        })

    }


    inputChange(ev){
        this.setState({
            inputVal:ev.target.value
        })
    }
    keyDownPost(ev){  //onkeyDown功能
        if(ev.keyCode !==13){return};

        let {inputVal} = this.state;
        
         let value=inputVal.trim();

        if(value ===''){return }

        let todo={};
        
        todo.id=new Date().getTime();

        todo.value=value;

        todo.hasCompleted=false;

        let {todosDate}=this.state;

        todosDate.push(todo);

        this.setState({
            todosDate,
            inputVal:''
        })
        
        

    }
    toggleAll(ev){  // 全部选中
      let {checked}=ev.target;

      let {todosDate}=this.state;
      
      todosDate=todosDate.map(elt=>{
          elt.hasCompleted=checked;
          return elt;
      })
      
      this.setState({todosDate})
    }
    onToggle(todo){
        let {todosDate}=this.state;

        todosDate=todosDate.map(elt=>{
            if(elt.id===todo.id){
                elt.hasCompleted=!elt.hasCompleted
            }
            return elt
        })
        this.setState({todosDate})
    }

    onDestory(todo){ //删除功能
        let {todosDate}=this.state;

        todosDate=todosDate.filter((elt)=>{
           return  elt.id!==todo.id
        })
        this.setState({todosDate})
    }
    onClearCompleted(){
     let {todosDate}=this.state;
     todosDate=todosDate.filter((elt)=>{
         return !elt.hasCompleted;
     })
     this.setState({todosDate})
    }
    render() {
        let {itemEditDone,onClearCompleted,onDestory,keyDownPost,inputChange,toggleAll,onToggle}=this;

        let {todosDate,inputVal}=this.state;

        let  items =null,
             footer=null,
             itemsBox=null;

        let letfCount=todosDate.length;

        items=todosDate.map((elt, i)=>{
            if(elt.hasCompleted){letfCount--};
             return  <Ietm 
              {...{
                  onDestory,
                  todo:elt,
                  onToggle,
                  itemEditDone
                  
              }
            } 
            key={i}
             />    
        })
        if(todosDate.length){
            itemsBox=(
                <section className="main">
                <input
                 type="checkbox" 
                 className="toggle-all"
                 onChange={toggleAll}
                 checked={letfCount===0}
                 />
                <ul className="todo-list">      
                {items}
                </ul>
               </section>
            )
           footer=(
           <Footer
              {...{
                 letfCount,
                 showClearBootn:letfCount<todosDate.length,
                 onClearCompleted
              }}
           
           />) 
        }
        
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input 
                     type="text"
                     className="new-todo"
                     placeholder="请编辑您的待办事项？"
                     value={inputVal}
                     onChange={inputChange}
                     onKeyDown={keyDownPost}
                     />
                </header>
                {itemsBox}
                {footer}
            </div>
        )
    }
}
