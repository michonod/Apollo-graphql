import "./App.css";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { Button, Table } from "antd";
import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
const { Column, ColumnGroup } = Table;
const Query = gql`
  {
    Jobs {
      name
      scheduleExpression
      enabled
    }
  }
`;

const Mutation = gql`
  mutation addJob(
    $name: String!
    $scheduleExpression: String!
    $enabled: Boolean!
  ) {
    addJob(
      name: $name
      scheduleExpression: $scheduleExpression
      enabled: $enabled
    ) {
      name
      scheduleExpression
      enabled
    }
  }
`;

const App: React.FC = () => {
  const { data, error } = useQuery(Query);

  const [mutateFunction, { data: MutationData, loading }] =
    useMutation(Mutation);

  const [value, setValue] = useState("30 5 * * 1,6");
  const cronComponent = (
    <div className="cron-flex-container">
      <Cron value={value} setValue={setValue} />
      <Button type="primary" style={{ marginLeft: 10 }} danger>
        Save
      </Button>
    </div>
  );

  return (
    <>
      <Table
        dataSource={[{ job: "Job creation", action: cronComponent }]}
        title={() => <strong>Automatization</strong>}
      >
        <ColumnGroup>
          <Column title="Job" dataIndex="job" key="Job" />
          <Column title="Actions" dataIndex="action" key="Action" />
        </ColumnGroup>
      </Table>
    </>
  );
};

export default App;
