import styles from "./App.module.css";
import { Button } from "antd";
import "./App.less";

function App() {
  return (
    <div className={styles["App"]}>
      <header className={styles["App-header"]}>
        <Button type="primary">按钮</Button>
      </header>
    </div>
  );
}

export default App;
