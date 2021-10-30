import {createContext, useState} from "react";

export const TodoContext = createContext()
function GlobalContext({ children }) {
    const [ todo, setTodo ] = useState([])
    return (
        <TodoContext.Provider value={{ todo, setTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default GlobalContext