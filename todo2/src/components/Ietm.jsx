let propType={
    todo:PT.object,
    onDestory:PT.func,
    onToggle:PT.func,
    itemEditDone:PT.func
}

export default class Ietm  extends React.Component{
    constructor(){
        super();
        this.state={
            inEnit:false,
            val:''
        }
        this.onEdit=this.onEdit.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onEnter=this.onEnter.bind(this);
        this.itemEditDone=this.itemEditDone.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.onkeyUp=this.onkeyUp.bind(this)
    }
      inputChange(ev){
          this.setState({
              val:ev.target.value
          })

      }

    itemEditDone(){
        this.setState({
            inEnit:false
        })
        let {itemEditDone,todo}=this.props;

        itemEditDone(todo,this.state.val)
    }

    onBlur(){
        this.itemEditDone()
      }
    onEnter(ev){
        if(ev.keyCode!==13){return};
        this.itemEditDone()


      }
      onkeyUp(ev){
        let {value}=this.props.todo;
          if(ev.keyCode !==27){
              return;
          }
          this.setState({
            inEnit:true,
            val:value
        })
      }
    onEdit(){
        let {value}=this.props.todo;
        this.setState({
            inEnit:true,
            val:value
        },()=>this.refs.editInput.focus())
        
    }

    render(){
          let  {onEdit,onBlur,onEnter,inputChange,onkeyUp}=this;

         let {todo,onDestory,onToggle}=this.props;
         
             let {inEnit,val}=this.state;

             let ietmClassName=todo.hasCompleted?"completed":"";
             
             if(inEnit){ietmClassName +='editing'}

        return (
            <li className={ietmClassName}>
                <div className="view">
                   <input 
                   type="checkbox" 
                   className="toggle"
                   checked={todo.hasCompleted}
                   onChange={ev=>onToggle(todo)}
                   />
                   <label
                    onDoubleClick ={onEdit}>
                       {todo.value}
                   </label>
                   <button
                    className="destroy"
                    onClick={ev=>onDestory(todo)}
                    
                    ></button>
                </div>
                <input 
                type="text" 
                className="edit"
                value={val}
                onBlur={onBlur}
                onKeyDown={onEnter}
                onChange={inputChange}
                ref="editInput"
                onkeyUp={onkeyUp}
                />
            </li>
        )
    }
}
Ietm.propType = propType;