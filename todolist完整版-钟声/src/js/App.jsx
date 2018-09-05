import Ietm from './componts/Ietm';
import Footer from './componts/Footer';
require('../css/index.css');
require('../css/app.css');
class App extends React.Component{
  constructor(){
    super();
    this.state={
      todosData:[],
      inputval:'',//设置控制
      view:'all'   //显示视图
    }
    this.keyDownPost=this.keyDownPost.bind(this);
    this.onDestroy=this.onDestroy.bind(this);
    this.onClearCompleted=this.onClearCompleted.bind(this);
    this.inputChange=this.inputChange.bind(this);
    this.toggleAll=this.toggleAll.bind(this);
    this.onToggle=this.onToggle.bind(this);
    this.changeView=this.changeView.bind(this);
    this.itemEditDone=this.itemEditDone.bind(this);
    }
   //修改totosData的方法，设置一个方法;给Item的属性
   itemEditDone(todo,value){
         let {todosData}=this.state;
         todosData=todosData.map(elt=>{ //遍历这个数组
           if(todo.id===elt.id){ //如果数组的id相同 说明就是编辑的这个todo
             elt.value=value          //todosDate的值就是编辑的值
           }
           return elt;  //返回值；
         })
         if(todo.value==""){   //如果值为空。
          todosData=todosData.filter(elt=>{
              return elt.id!==todo.id
          })
      }
    this.setState({todosData})
   }


    changeView(view){
      this.setState({view})
    }
    toggleAll(ev){ //是input 改变事件 全选勾
        let {checked} = ev.target; //勾选和未勾选的状态

        let {todosData}=this.state; // 状态;

        todosData = todosData.map(elt=>{
          elt.hasCompleted=checked;//全选后checked会变成true 反之false
          return elt;
        });

        this.setState({todosData}) //更新状态；
    }


     onToggle(todo){ //改变的是哪一个todo  识别

        let {todosData}=this.state; 

        todosData=todosData.map(elt=>{ //elt 代表每一个todo
            
          if(elt.id===todo.id){  //如果id相等 说明操作的就是这个todo

            elt.hasCompleted=!elt.hasCompleted //勾选上就是反向的状态
          }  
          return elt;
        });
        this.setState({todosData})
     }
    inputChange(ev){  //改变事件,让value受控制
      this.setState({
        inputval:ev.target.value   //让input受到控制
      })
    }
    keyDownPost(ev){
      
      if(ev.keyCode !== 13 ){return };//不是回车就退出去是回车就进行

      let {inputval}= this.state;//前后面的空格切掉

      let value=inputval.trim();

      if(value===''){return};   //如果值是空的就不让添加

      let todo={};  //声明一个数据 (添加的动作)，是一个对象。

      todo.id=new Date().getTime();    //给一个ID说明其身份

      todo.value=value;  // 他的内容

      todo.hasCompleted=false;   //他的初始状态是未完成的。

      let {todosData}=this.state;  //把他的状态拿出来

      todosData.push(todo);  //新添加的对象todo添加到数组里

      this.setState({
        todosData,
        inputval:'',
      })// 更新状态

      ev.target.value=''; //回车后清空
    
    }
   onDestroy(todo){   //删除的是那一个参数 设置一个todo

     let {todosData}=this.state;     //先把所有的todo拿出来

     todosData = todosData.filter((elt)=>{  //过滤这个todo 

       return  elt.id !== todo.id;  // id不相匹配删除掉 

     })
     this.setState({todosData})//更新状态
   }
   onClearCompleted(){ // 删除
    let {todosData}=this.state; // 拿出所有的todo
    todosData = todosData.filter((elt)=>{ //过滤
      return  !elt.hasCompleted;  //true 的时候删除 ，false的时候保留下来  所以取反
    })
    this.setState({todosData})//更新状态
   }

  render() {
    let {keyDownPost,onDestroy,toggleAll,onToggle,itemEditDone,onClearCompleted,changeView,inputChange}=this
   
    let {todosData,inputval,view}=this.state;

    let items=null,
        footer=null,
        itemsBox=null;

    let leftCount=todosData.length; //数组的长度;

   items = todosData.filter(elt=>{
     if(elt.hasCompleted) leftCount--;
     switch(view){
       case 'active':return !elt.hasCompleted;
       case 'completed':return elt.hasCompleted;
       default:return true
     }
   })
    
   items=items.map((elt,i)=>{ //改变这个数组
   
    return <Ietm {//接收一些props
      ...{
        onDestroy,//每个todo都有小xx
        todo:elt, // 内容
        onToggle,//事件绑定 
        itemEditDone
       
      }}
      key={i}
    />
  });
    

    if(todosData.length){ //如果数组的长度
         itemsBox =(
             <section className="main">
          <input 
          type="checkbox"
           className="toggle-all"
           checked={leftCount===0}
           onChange={toggleAll}
           />
          <ul className="todo-list">
           {items}
          </ul>
        </section>

         );
         footer=(
         <Footer
             {...{
               leftCount,
               showClearBtton:leftCount<todosData.length,
               onClearCompleted,
               changeView,
               view 
             }}
             //footer 组件的 this.props
         />)
    }
    return(
      <div>
        <header className="header">
          <h1>todos</h1> 
          <input type="text"  
           className="new-todo"
           placeholder="What needs to be done?"
           value={inputval} //受控制
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
export default App;