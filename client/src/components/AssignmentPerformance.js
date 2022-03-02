function AssignmentPerformance(attributes){
    function formatDate(string){
        let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options) ;
    }

    return (
            <tr>
                <td>{attributes.courseName} </td>
                <td>{formatDate(attributes.assignmentDate)}</td>
                <td>{formatDate(attributes.deadline)}</td>
                <td>{attributes.status}</td>
                <td>{attributes.performance.toFixed(0)}%</td>

            </tr>      
    )
}


export default AssignmentPerformance