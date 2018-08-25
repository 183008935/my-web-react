import PT from 'prop-types';
let propTtype ={
    leftCount:PT.number,
    showClearBtton:PT.bool,
    onclearCompleted:PT.func,
    changeView:PT.func,
    view:PT.oneOf(['all','active','completed'])
             

}

export default class Footer extends React.Component{
    constructor(){
        super();
    }
    render(){
        let {leftCount,
            showClearBtton,
            onclearCompleted,
            view,
            changeView 
        }=this.props;
        let clearBtn=null;
        if(showClearBtton){
            clearBtn=(
                <button className="clear-completed" onClick={onclearCompleted}>
                 清除选中内容
                </button>
            )
        }
        return(
            <footer className="footer">
                <span className="todo-count">
                  <strong>{leftCount}</strong> <span>item left</span>
                </span>
                <ul className="filters">
                <li>
                    <a 
                    href="#/all" 
                    className={view==='all'?'selected':''}
                    onClick={ev=>changeView('all')}
                    >所有内容</a>
                </li>
                <li>
                    <a href="#/active" className={view==='active'?'selected':''}
                    onClick={ev=>changeView('active')}
                    
                    >未完成</a>
                </li>
                <li>
                    <a href="#/completed"
                    className={view==='completed'?'selected':''}
                    onClick={ev=>changeView('completed')}
                    >已完成</a>
                </li>
                </ul>
                {clearBtn}
            </footer>
        )
    }
}
Footer.propTtype=propTtype;