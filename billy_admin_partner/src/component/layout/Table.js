import React from 'react'

const Table = ({ users,column,actions,deletefun,activefun,id }) => {
  return (
    <div>
      <div className="col-12">
              <div className="table-responsive">
                <table id="order-listing" className="table">
                  <thead>
                    <tr>
                        {column.map((item, index) => <TableHeadItem  item={item} /> )}
                    </tr>
                  </thead>
                  <tbody>
                  {
                    users.map((item, index) => <TableRow item={item} column={column} indexvalue={index} id={id} activefun={activefun} deletefun={deletefun} actions={actions} />)
                  }  
                  </tbody>
                </table>
              </div>
            </div>
    </div>
  );
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item,indexvalue,column,actions,activefun,deletefun,id }) => (
    <tr>
    {column.map((columnItem, index) => {
            return columnItem.value === "index" ? <td>{indexvalue + 1}</td>
            : columnItem.value === "action" ? 
            <td style={{ display: 'flex' }}> {actions.map((actions, index) => 
            {if(actions.value === "update") 
            return <a className='mr-1'><label class="badge badge-success hand_cursor">Edit</label></a>
            if(actions.value === "delete") 
            return <a onClick={()=>deletefun(item[`${id}`])}><label class="badge badge-danger delete_red hand_cursor">Delete</label></a>
            if(actions.value === "active") 
            return <div class="form-check form-switch ml-5 mt-0"><input class="form-check-input" checked={item[`${actions.colun}`] === true ? "true" : ""} onClick={() => activefun(item[`${id}`],item[`${actions.colun}`] )} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>}
            )}</td>
            
            :<td>{item[`${columnItem.value}`]}</td>
            
    })}
    </tr>   
);
        
export default Table;