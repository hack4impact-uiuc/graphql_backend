import { commitMutation, graphql } from 'react-relay';
import type { Environment } from 'relay-runtime';

const mutation = graphql`
    mutation deleteStudentMutation($input: DeleteStudentInput!) {
      deleteStudent(input: $input){
        student {
          name
        }
      }
    }
`;

function deleteStudent(environment: Environment, id: string) {
const variables = {
  input: {
    id
  },
};
console.log(variables)
commitMutation(
  environment,
  {
    mutation,
    variables,
    onCompleted: (response) => {
      console.log('Response received from server.')
      console.log(response)
    },
    onError: err => console.error(err),
  },
);
}

export default deleteStudent;
