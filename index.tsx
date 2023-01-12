import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

interface AntStats {
  name: string;
  length: number;
  color: string;
  weight: number;
  chance?: number;
}

const ants: AntStats[] = [
  {
    name: 'Marie ‘Ant’oinette',
    length: 12,
    color: 'BLACK',
    weight: 2,
  },
  { 
    name: 'Flamin’ Pincers', 
    length: 11, 
    color: 'RED', 
    weight: 2 
  },
  { 
    name: 'AuNT Sarathi', 
    length: 20, 
    color: 'BLACK', 
    weight: 5 
  },
  {
    name: 'The Unbeareable Lightness of Being',
    length: 5,
    color: 'SILVER',
    weight: 1,
  },
  { 
    name: '‘The Duke’', 
    length: 17, 
    color: 'RED', 
    weight: 3 
  },
];

class AntRace extends React.Component<{}, {data: AntStats[]}> {
  constructor(props) {
      super(props);
      this.state = {
          data: null
      };
  }

	render() {
    if (!this.state.data) {
      return (
      <button className="race-button" onClick={this.loadData}>Load Ant Racers!</button>
      )
    }
    
		return(
			<div className="page">
				<h1>DraftAnts</h1>
				<div className="content">
					<DataTable />
				</div>
        <button className="race-button">Race Ants!</button>
			</div>
		);
	}

  calcPromise = new Promise<number>((resolve, reject
      ) => {
        const calculation = generateAntWinLikelihoodCalculator();
        calculation(c => {
          if(c) {
            resolve(c);
          } else {
            reject('No Number');
          }
        })
      }
    );

  loadData() {
    const p = this.calcPromise;
    p
    .then(val => {
      console.log(val);
    })
    .catch(err => {
      console.log(err);
    });

  
  }

  async loadAntData(): Promise<number> {
    let c = 0;
    const calculation = generateAntWinLikelihoodCalculator();
    await calculation(calc => {
      c = calc * 100;
    });

    return c;

    // ants.forEach(ant => {
    //   calculation(calc => {
    //     ant.chance = calc * 100;
    //   });
    // });
  };

  setData() {
    ants.forEach(ant => {
      this.loadAntData().then(val => {
        ant.chance = val;
      });
    });

    this.setState({
      data: ants
    })
  }
}

class DataTable extends React.Component {
 
	render() {
    const AntDataRows = ants.map(ant => {
      return (
        <tr className="ant">
          <td className="name">{ant.name}</td>
          <td className="length">{ant.length}</td>
          <td className="color">{ant.color}</td>
          <td className="weight">{ant.weight}</td>
          <td className="chance">{ant.chance}</td>
        </tr>
      );
    });


		return (
			<div className="ant-stat-table">
				<table>
          <tr>
            <th>Name</th>
            <th>Length</th>
            <th>Color</th>
            <th>Weight</th>
            <th>Winning Chance</th>
          </tr>
          {AntDataRows}
        </table>
			</div>
		);
	}
}

function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
      console.log('Calculated');
    }, delay);
  };
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <AntRace />
);