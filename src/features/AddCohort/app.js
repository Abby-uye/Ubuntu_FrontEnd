import React from 'react';
import GridTable from './GridTable';

const App = () => {
    const data = React.useMemo(
        () => [
            { name: 'John Doe', age: 28, job: 'Software Engineer' },
            { name: 'Jane Smith', age: 34, job: 'Project Manager' },
            { name: 'Sam Johnson', age: 45, job: 'Product Owner' },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Job',
                accessor: 'job',
            },
        ],
        []
    );

    return (
        <div>
            <h1>My Grid Table</h1>
            <GridTable columns={columns} data={data} />
        </div>
    );
};

export default App;
