import React, { Component } from 'react'
import PT from 'prop-types';
let propTypes={
    leftCount:PT.number,
    showClearBtton:PT.bool,
    onClearCompleted:PT.func,
    changeView:PT.func,
    view:PT.oneOf(['all','active','completed'])
}
export default function Footer(props) {
   
        let {leftCount,showClearBtton,onClearCompleted,view,changeView}=props;

        let clearBtn=null;

        if(showClearBtton){
            clearBtn=(
                <button className="clear-completed" onClick={onClearCompleted}> 
                     clear all completed
                  </button>
            )
        }
        return (
            <footer className="footer">
                  <span className="todo-count">
                     <strong>{leftCount}</strong> <span>item left</span>
                  </span>
                  <ul className="filters">
                       <li >
                           <a 
                           href="#/all"
                           className={view==='all'? 'selected':''}
                           onClick={ev=>changeView('all')}
                           >all</a>
                       </li>
                       <li >
                           <a 
                           href="#/active"
                           className={view==='active'? 'selected':''}
                           onClick={ev=> changeView('active')}
                           >Active</a>
                       </li>
                       <li >
                           <a 
                           href="#/completed"
                           className={view==='completed'? 'selected':''}
                           onClick={ev=> changeView('completed')}
                           >Completed</a>
                       </li>
                  </ul> 
                  {clearBtn}            
            </footer>
        )
    }

Footer.propTypes=propTypes;