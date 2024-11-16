
import styles from "./pagination.module.scss";

const Pagination = ({ currentpage, totalpage, onprev, onnext }) => {
  return (
    <div className={styles.paginationContainer}>
      <button onClick={onprev} disabled={currentpage === 1}>
        Previous
      </button>
      <span>
        Page {currentpage} of {totalpage}
      </span>
      <button onClick={onnext} disabled={currentpage === totalpage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
