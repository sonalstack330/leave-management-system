import EmployeeList from "./components/EmployeeList";
import LeaveApplicationForm from "./components/LeaveApplicationForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> 🏢 Leave Management System</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <LeaveApplicationForm />
      <EmployeeList />
    </div>
    </div>
  );
}

export default App;