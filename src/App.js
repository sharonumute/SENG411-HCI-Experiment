import { format } from 'd3-format';
import React, { useState } from 'react';
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

    componentDidUpdate() {
        if (this.state.curentIteration > this.iterationPerTrial) {
            this.advanceTrial();
        }
    }

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

    toggleInstructionScreen = () => {
        this.setState({
            showInstruction: !this.state.showInstruction,
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

        if (this.state.currentTrial == trialParameters.length) {
            return <div>done</div>;
        } else {
            return (
                <div className="App">
                    <Trials
                        format={trialParameters[this.state.currentTrial].format}
                        n={trialParameters[this.state.currentTrial].n}
                        showInstruction={this.state.showInstruction}
                        toggleInstructionScreen={this.toggleInstructionScreen}
                        instructType={
                            trialParameters[this.state.currentTrial]
                                .instructType
                        }
                        curentIteration={this.state.curentIteration}
                        advanceIteration={this.advanceIteration}
                    />
                </div>
            );
        }
    }
}

export class Trials extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            format,
            n,
            showInstruction,
            toggleInstructionScreen,
            instructType,
            curentIteration,
            advanceIteration,
        } = this.props;
        if (showInstruction) {
            const handleAdvance = (e) => {
                if (e.key === 'Spacebar' || e.key === ' ' || e.keyCode === 32) {
                    toggleInstructionScreen();
                }
            };

            return (
                <div tabIndex="0" onKeyDown={handleAdvance}>
                    <h1>{`${format} phase`}</h1>
                    <p>
                        {instructType === 1
                            ? `Perform the required task for a group of ${n} numbers`
                            : `Now do the same for a group of ${n} numbers`}
                    </p>
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
                />
            );
        }
    }
}
