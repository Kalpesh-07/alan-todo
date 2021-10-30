import './App.css';
import Alan from './Alan'
import Todo from "./Todo";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", function() {
            let elements = document.getElementsByTagName("INPUT");
            for (let i = 0; i < elements.length; i++) {
                elements[i].oninvalid = function(e) {
                    e.target.setCustomValidity("");
                    if (!e.target.validity.valid) {
                        e.target.setCustomValidity("Please enter todo");
                    }
                };
                elements[i].oninput = function(e) {
                    e.target.setCustomValidity("");
                };
            }
        })

        return () => {
             document.removeEventListener("DOMContentLoaded")
        }
    }, [])

  return (
    <div className="App">
        <Alan/>
        <Todo/>
    </div>
  );
}

export default App;


