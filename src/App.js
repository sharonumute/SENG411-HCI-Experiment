import React from 'react';
import { Block, Format } from './blocks';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.iterationPerTrial = 3;
        this.state = {
            currentTrial: 0,
            showInstruction: true,
            curentIteration: 1,
            results: [],
        };
        this.userID = Math.floor(Math.random() * 90000) + 10000;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentDidUpdate() {
        if (this.state.curentIteration > this.iterationPerTrial) {
            this.advanceTrial();
        }
    }
    handleKeyDown = (event) => {
        if (
            this.state.showInstruction &&
            (event.key === 'Spacebar' ||
                event.key === ' ' ||
                event.keyCode === 32)
        ) {
            this.setState({
                showInstruction: false,
            });
        }
    };

    advanceTrial = () => {
        this.setState({
            currentTrial: this.state.currentTrial + 1,
            curentIteration: 1,
            showInstruction: true,
        });
    };

    advanceIteration = () => {
        this.setState({
            curentIteration: this.state.curentIteration + 1,
        });
    };

    addResults = (newResult) => {
        this.setState({
            results: [...this.state.results, newResult],
        });
    };

    render() {
        console.log('CURRENT TRIAL', this.state.currentTrial);
        console.log('CURRENT ITERATION', this.state.curentIteration);

        const trialParameters = [
            { format: Format.TEXT, n: 3, instructType: 1 },
            { format: Format.TEXT, n: 5, instructType: 2 },
            { format: Format.TEXT, n: 9, instructType: 2 },
            { format: Format.TEXT, n: 25, instructType: 2 },
            { format: Format.BUBBLE, n: 3, instructType: 1 },
            { format: Format.BUBBLE, n: 5, instructType: 2 },
            { format: Format.BUBBLE, n: 9, instructType: 2 },
            { format: Format.BUBBLE, n: 25, instructType: 2 },
        ];

        if (this.state.currentTrial === trialParameters.length) {
            return (
                <div className="App">
                    <h2>{'Thank you for participating'}</h2>
                    <p>{'Your results are below'}</p>
                    <table>
                        <thead>
                            <tr key={'header'}>
                                {Object.keys(this.state.results[0]).map(
                                    (key, headerIndex) => (
                                        <th key={headerIndex}>{key}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map(
                                        (val, innerIndex) => (
                                            <td key={innerIndex}>{val}</td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Trials
                        format={trialParameters[this.state.currentTrial].format}
                        n={trialParameters[this.state.currentTrial].n}
                        showInstruction={this.state.showInstruction}
                        instructType={
                            trialParameters[this.state.currentTrial]
                                .instructType
                        }
                        curentIteration={this.state.curentIteration}
                        advanceIteration={this.advanceIteration}
                        experimentSeed={this.props.experimentSeed}
                        userID={this.userID}
                        addResults={this.addResults}
                    />
                </div>
            );
        }
    }
}

export class Trials extends React.Component {
    render() {
        const {
            format,
            n,
            showInstruction,
            instructType,
            curentIteration,
            advanceIteration,
            experimentSeed,
            userID,
            addResults,
        } = this.props;
        if (showInstruction) {
            return (
                <div>
                    <h1>{`${format} phase`}</h1>
                    <p>
                        {instructType === 1
                            ? `Perform the required task for a group of ${n} numbers`
                            : `Now do the same for a group of ${n} numbers`}
                    </p>
                    <p>{'Press Space to Continue'}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>{`Iteration ${curentIteration}`}</h1>
                    <Block
                        format={format}
                        n={n}
                        startTime={Date.now()}
                        curentIteration={curentIteration}
                        advanceIteration={advanceIteration}
                        experimentSeed={experimentSeed}
                        userID={userID}
                        addResults={addResults}
                    />
                </div>
            );
        }
    }
}
