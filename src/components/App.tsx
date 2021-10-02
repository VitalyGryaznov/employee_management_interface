import Header from "./Header";
import Content from "./Content";
import "antd/dist/antd.css";
import { DataState } from "../context/data/DataState";
import { FormState } from "../context/form/FormState";

function App() {
  return (
    <div>
      <DataState>
        <FormState>
          <Header />
          <Content />
        </FormState>
      </DataState>
    </div>
  );
}

export default App;
