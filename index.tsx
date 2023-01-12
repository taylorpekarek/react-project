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

class AntRace extends React.Component {
	render() {
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

  generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();
  
    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <AntRace />
);