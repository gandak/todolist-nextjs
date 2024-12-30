import Image from "next/image";
import styles from "./page.module.css";
import { ToDo } from "./components/Todo";

export default function Home() {
  return (
    <div className={styles.todoBackground}>
      <ToDo />
    </div>
  );
}
