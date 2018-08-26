let propType={
    letfCount:PT.number,
    showClearBootn:PT.bool,
    onClearCompleted:PT.func
}

export default class Footer extends React.Component{
    constructor(){
        super();
    }
  render(){
           
    let {letfCount,showClearBootn,onClearCompleted}=this.props;

    let clearBtn=null;

       if(showClearBootn){
           clearBtn=(
          <button className="clear-completed" onClick={onClearCompleted}>
               清除已完成
          </button>
           )
       }
      return(
          <footer className="footer">
            <span className="todo-count">
              <strong>{letfCount}</strong> <span>item left</span>
            </span>
          <ul className="filters">
             <li>
                 <a href="#/all">所有内容</a>
             </li>
             <li>
                 <a href="#/activer">未完成</a>
             </li>
             <li>
                 <a href="#/completed">已完成</a>
             </li>
          </ul>
          {clearBtn}
          </footer>
      )
  }
}
Footer.propType = propType;