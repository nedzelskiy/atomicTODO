import * as React from 'react';
import TestContainer from '../../containers/TestContainer';

class Test extends React.Component<{}, {}> {
  render() {
    return <TestContainer />;
  }
}

export default Test;

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
