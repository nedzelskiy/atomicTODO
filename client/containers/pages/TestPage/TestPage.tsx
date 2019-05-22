import * as React from 'react';
import TestContainer from '../../TestContainer';

class TestPage extends React.Component<{}, {}> {
  render() {
    return <TestContainer />;
  }
}

export default TestPage;

// export const serverDataFetchJobs = [
//   async () => {
//     const data = await new Promise((res) => {
//       setTimeout(
//         () => {
//           res(3);
//         },
//         2000);
//     });
//     return data;
//   },
// ];
