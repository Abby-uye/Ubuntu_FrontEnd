import Cohort from "./components/Cohort";
const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(); // Reload the page to reflect the changes
};

return (
    <div className={styles.appContainer}>
        <button onClick={clearLocalStorage} className={styles.clearButton}>
            Clear Local Storage
        </button>
        <Cohort setCohorts={() => {}} />
    </div>
);