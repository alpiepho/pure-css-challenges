
var mockData = [
  { name: "Chicken Soup",
    parts: ["Chicken", 
            "Water", 
            "Noodles"]
  },
  { name: "Pumpkin Pie",
    parts: ["Pumpkin Puree", 
            "Sweetened Condensed Milk", 
            "Eggs",
            "Pumpkin Pie Spice",
            "Pie Crust"
           ]
  }
];

class Footer extends React.Component {
	render() {
		return (
        <div className="footer">
          <hr/>
          <p>
           Page built by <a rel="nofollow" href="https://www.linkedin.com/in/al-piepho-fw-sw-engineer/"     target="_blank">Al Piepho</a> <em> (SW | FW | Embedded | Web) 2017</em></p>
          </div>
    );
  }
}

/*
class CamperRow extends React.Component {
	render() {
    var href = "https://freecodecamp.com/" + this.props.camper.username;
    var img  = this.props.camper.img;
    return (
       <tr>
        <td className="col-xs-2">{this.props.rank}</td>
        <td className="col-xs-6">
           <a href={href} target="_blank">
            <img src={img} />
           {this.props.camper.username}
          </a>
        </td>
        <td className="col-xs-2">{this.props.camper.recent}</td>
        <td className="col-xs-2">{this.props.camper.alltime}</td>
      </tr>
    );
  }
}

class CamperTable extends React.Component {
	render() {
    var rows = [];
    var lastCategory = null;
    this.props.campers.forEach((camper, i) => {
      rows.push(<CamperRow camper={camper} rank={i+1} key={camper.username}/>);
    });
    var recentClassName =  "col-xs-2 " + (this.props.recent ? "sorted" : "notsorted");
    var alltimeClassName = "col-xs-2 " + (this.props.recent ? "notsorted" : "sorted");
    return (
        <div className="container">
          <table className="table table-fixed ">
            <thead>
              <tr>
                <th className="col-xs-2">Rank</th>
                <th className="col-xs-6">FCC Camper</th>
                <th className={recentClassName}
                    onClick={this.props.handleToggleList}>
                      Recent Points
               </th>
                <th className={alltimeClassName}
                    onClick={this.props.handleToggleList}>
                      All-Time Points
               </th>
               </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
    );
  }
}

class Board extends React.Component {
  
	constructor() {
    super();
    this.state             = { campers: [], recent: true };  
    this.setStateRecent    = this.setStateRecent.bind(this);
    this.setStateAllTime   = this.setStateAllTime.bind(this);
    this.handleToggleList  = this.handleToggleList.bind(this);

    $.getJSON(URL_RECENT,  this.setStateRecent);
  }
  
  setStateRecent(data) {
    this.setState( { campers: data, recent: true } );
  }

  setStateAllTime(data) {
    this.setState( { campers: data, recent: false } );
  }

  handleToggleList(e) {
    if (this.state.recent)
      $.getJSON(URL_ALLTIME,  this.setStateAllTime);
    else
      $.getJSON(URL_RECENT,  this.setStateRecent)
    }
 
	render() {
		return (
      <div>
        <h1 className="board-header">freeCodeCamp DV - Recipe Box</h1>
        <CamperTable 
          campers={this.state.campers}
          recent={this.state.recent}
          handleToggleList={this.handleToggleList} 
        />
        <Footer />
      </div>
		);
	}
}


*/

class RecipePanel extends React.Component {
	render() {
    var id   = "collapse" + this.props.id;
    var href = "#" + id;
    var parts = [];
    this.props.recipe.parts.forEach((part, i) => {
      parts.push(<li className="list-group-item" key={i}>{part}</li>);
    });
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href={href}>
              {this.props.recipe.name}</a>
          </h4>
        </div>
        <div id={id} className="panel-collapse collapse">
          <ul className="list-group">
            {parts}
          </ul>
        </div>
      </div>
    );
  }
}

class RecipePanels extends React.Component {
	render() {
    var panels = [];
    this.props.recipes.forEach((recipe, i) => {
      panels.push(<RecipePanel recipe={recipe} id={i+1} key={i}/>);
    });
    return (

        <div className="panel-group" id="accordion">
           {panels}
        </div>
    );
  }
}

class RecipeBox extends React.Component {
	constructor() {
    super();
    this.state = { recipes: mockData };  
  }
   
	render() {
		return (
      <div>
        <h1 className="app-header">freeCodeCamp DV - Recipe Box</h1>
        <RecipePanels recipes={this.state.recipes} />
        <Footer />
      </div>
		);
	}
}

ReactDOM.render(<RecipeBox />, document.getElementById('recipebox'));
