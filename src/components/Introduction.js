import React from 'react';

export default class Introduction extends React.Component {
    render() {
        return (
            <div id={'Introduction'}>
                <h1>HCI UVic Course Experiment</h1>
                <p>By Paria Naghavi and Sharon Umute</p>
                <div>
                    <h3>
                        Effectiveness of text representations, of amounts,
                        versus graphical representations
                    </h3>
                    For this experiment, you will be shown a series of numbers
                    represented as either text or circles of corresponding
                    sizes.
                    <p>
                        <b>Your required task</b> is to{' '}
                        <b>click the largest number/circle</b> as fast as you
                        can.
                    </p>
                </div>
                <p>Click the button below to begin the experiment</p>
                <button type={'submit'} onClick={this.props.onBeginExperiment}>
                    Begin
                </button>
            </div>
        );
    }
}
