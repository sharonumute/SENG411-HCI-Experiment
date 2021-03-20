import React from 'react';
import { Block, Format } from './blocks';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.iterationPerTrial = 3;
        this.state = {
            currentTrial: 0,
            showInstruction: true,
            curentIteration: 1,
        };
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
            return <div>done</div>;
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
                <Block
                    format={format}
                    n={n}
                    startTime={Date.now()}
                    curentIteration={curentIteration}
                    advanceIteration={advanceIteration}
                    experimentSeed={experimentSeed}
                />
            );
        }
    }
}
