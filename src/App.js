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

// /v1/analyze?version=2019-07-12&url={articles url}&features=sentiment_
// curl -X GET -u "apikey:4b8GQCC_2SfoK2_EoaCMJr1AQd0eZi3hs-nbe26De7dO" "{url}/{method}"

//jased95816@bbsaili.com
//Password@123

// <!-- exclusion of hostsprofile file -->
//
// <build>
//     <plugins>
//         <plugin>
//             <groupId>org.apache.maven.plugins</groupId>
//             <artifactId>maven-jar-plugin</artifactId>
//             <version>3.2.0</version>
//             <configuration>
//                 <excludes>
//                     <exclude>install/config/defaultConfig/com.netcracker.billops.model.profiles.HostsProfile</exclude>
//                 </excludes>
//             </configuration>
//         </plugin>
//     </plugins>
// </build>

