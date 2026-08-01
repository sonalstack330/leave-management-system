import EmployeeList from "./components/EmployeeList";
import LeaveApplicationForm from "./components/LeaveApplicationForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Leave Management System</h1>
        <p className="tagline">Apply for leave and track your team's requests</p>
      </header>
      <main className="app-main">
        <LeaveApplicationForm />
        <EmployeeList />
      </main>
    </div>
  );
}

export default App;