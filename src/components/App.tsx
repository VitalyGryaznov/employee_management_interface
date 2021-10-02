import AppContent from "./Content";
import AppHeader from "./Header";
import "antd/dist/antd.css";
import { DataState } from "../context/data/DataState";
import { FormState } from "../context/form/FormState";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <DataState>
        <FormState>
          <Layout style={{minHeight:"100vh"}}>
            <Header>
              <AppHeader />
            </Header>
            <Content>
              <AppContent />
            </Content>
          </Layout>
        </FormState>
      </DataState>
    </div>
  );
}

export default App;
