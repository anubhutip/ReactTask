import axios from 'axios';
import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,

} from 'react-router-dom';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';


class Message extends Component {

columns: ['Pincode', 'Location']
  constructor(props) {
    super(props);
    this.state = {
      searchField:'',
      myData: [],
      isLoading: false,
      items: [],
      size: 3,
       selected: {},
    };

  }

handleInputChange=(event)=>{
  this.setState({searchField:event.target.value})
}
    handleSelect = (e) => {
    const selected = this.state.selected;
    selected[e.target.name] = e.target.checked;
    this.setState({ selected });
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getData();
  }

  getData(){
    this.setState({ isLoading: true });

    axios
      .get(`http://localhost:5555?pageNo=${this.props.match.params.id}`)
      .then(result => {
          this.setState({
          myData: result.data,
          isLoading: false
        })
      })
      .catch(error => console.log("error logged",error));
  }



fun = e => {

	console.log("ohh");
	e.preventDefault();
}

filterList=(event)=> {
	event.preventDefault();
	let searchVal = this.state.searchField
	var updatedList = this.state.myData;
   var filteredList = updatedList.filter(item=>
    	    item.officename.toLowerCase().includes(searchVal.toLowerCase())
    	);
   console.log(filteredList)
    this.setState({items: filteredList}); 
}


  render() {


  	  let rows = [];
    for (var i = 0; i < this.state.size; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.state.size; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td key={cellID} id={cellID}></td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return (
    	<div>
    	<div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input onChange={this.handleInputChange} value={this.state.searchField} type="text" className="form-control form-control-lg" placeholder="Search" />
        <button onClick = {this.filterList}>CLICK</button>
        </fieldset>
        </form>


      </div> 

            <div>
    
    <li>Searched data</li>
        <ul>
        {
          this.state.items.map(function(data){
            return <li key={data.id}>{data.pincode} - {data.officename}</li>;
          })
        }
        </ul>
      </div>






      <div>
	  
	  <li> <Link to="/messages/:id"> Please click here to select a another page and select a page from the above list</Link> </li>
          <div>
        <BootstrapTable data={this.state.myData}>
          <TableHeaderColumn isKey dataField='pincode'>
            Pincode
          </TableHeaderColumn>
          <TableHeaderColumn dataField='officename'>
            officename
          </TableHeaderColumn>
        </BootstrapTable>
      </div>

      </div>


     

      
      </div>
    );
  }
}

export default Message;