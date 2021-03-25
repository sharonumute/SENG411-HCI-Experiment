import React from 'react';

export default class EndScreen extends React.Component {
    render() {
        const results = this.props.results;

        const uID = results[0]['User ID'];

        var data = results.map((result) => {
            return {
                Format: result.Format,
                'Number of values': result['Number of values'],
                Iteration: result.Iteration,
                'Reaction time (seconds)': result['Reaction time (seconds)'],
                'Error (0-1)': result['Error (0-1)'],
            };
        });

        const submitButton = (
            <div>
                <p>
                    Click the button below to submit your results for analysis
                </p>
                <button type={'submit'} onClick={this.props.onSubmit}>
                    Submit
                </button>
            </div>
        );

        return (
            <div className="App">
                <h2 id={'Thanks'}>Thank you for participating</h2>
                <p id={'UID'}>{`User ID: ${uID}`}</p>
                <p>Your results are below</p>
                {this.props.showSubmitButton
                    ? submitButton
                    : this.props.submissionStatusObject}

                <table>
                    <thead>
                        <tr key={'header'}>
                            {Object.keys(data[0]).map((key, headerIndex) => (
                                <th key={headerIndex}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((val, innerIndex) => (
                                    <td key={innerIndex}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
