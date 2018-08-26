import React, { Component } from 'react';
import PT from 'prop-types';
let propTypes={  //数据验证
    todo:PT.object,//对象
    onDestroy:PT.func,//函数
    onToggle:PT.func,
    itemEditDone:PT.func
   

}
export default class Ietm extends Component {
    constructor(){
        super();
        this.state={   //是不是编辑状态。
            inEdit:false ,  //初始值是false
            val:'',//让值可以控制
        }
        this.onEdit=this.onEdit.bind(this);//改变状态的事件;
        this.onBlur=this.onBlur.bind(this);//失去焦点事件 会把编辑的内容保存
        this.onEnter=this.onEnter.bind(this);//修改后的事件;
        this.itemEditDone=this.itemEditDone.bind(this);
        this.inputChange=this.inputChange.bind(this);//编辑value的值得方法
        this.onKeyUp=this.onKeyUp.bind(this)
        
    }
    inputChange(ev){ //改变value的方法;
        
         this.setState({
             val:ev.target.value
         })

    }
    itemEditDone(){//为了方便下面的内容   不嫌麻烦就不用写.
        
        this.setState({
            inEdit:false
        })
        let {itemEditDone,todo}=this.props;
        itemEditDone(todo,this.state.val)//这些都是为了修改内容
    }
    onBlur(){  //失去焦点的动作
        this.itemEditDone()
    }
    onEnter(ev){
        if(ev.keyCode !==13 ){return }
        this.itemEditDone();
    }
    onKeyUp(ev){
        let {value}=this.props.todo;
        if(ev.keyCode !==27){return}
        this.setState({
            inEdit:false,
            val:value 
        });
        
    }
    onEdit(){
        
        let {value}=this.props.todo;//从他的属性提出内容
        this.setState({
            inEdit:true,
            val:value 
        },()=>this.refs.editInput.focus())//改变初始值可以编辑的状态       
    }


    render() {
         
        let {onEdit,onBlur,onEnter,inputChange,onKeyUp}=this; 
 

        let {todo,onDestroy,onToggle}=this.props;

        let {inEdit,val} = this.state;

        let  itemClassName=todo.hasCompleted?'completed':'';  //用变量来控制什么时候编辑  

         if(inEdit){itemClassName+='editing'}   //通过状态来控制什么时候可以编辑
        return (
             <li className={itemClassName}> 
                 <div className="view">
                 <input 
                 type="checkbox" 
                 className="toggle"
                 checked={todo.hasCompleted}
                 onChange={ev=>onToggle(todo)} // 传参数todo
                 />
                 <label 
                 onDoubleClick={onEdit}//双击可以编辑
                 ref="label"
                 >
                     {todo.value}  
                 </label>
                    <button className="destroy"
                      onClick={
                          ev=>onDestroy(todo)
                      }
                      ref="btn"
                    ></button>
                 </div>
                 <input 
                 value={val}  //让input的值可以控制，方便编辑
                 type="text" 
                 className="edit"
                 onBlur={onBlur}//失去焦点的时候的事件
                 onKeyDown={onEnter}//按下去的时候的事件
                 onChange={inputChange}
                 ref="editInput"
                 onKeyUp={onKeyUp}

                 />
             </li>
        )
    }
}
Ietm.propTypes=propTypes;