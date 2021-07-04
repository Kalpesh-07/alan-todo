import {useContext, useRef} from "react";
import {TodoContext} from "./GlobalContext";

function Todo() {
    const { todo, setTodo } = useContext(TodoContext);

    function handleChecked(e) {
        //    pass
    }

    function handleSubmit(e) {
            e.preventDefault()
            const { todoinput: { value:itemName } } = e.target
            e.target.reset()
            setTodo([ ...todo, { itemName, checked: false  }])
    }

    function removeItem(index) {
        setTodo([...todo.filter((t, i) => i !== index)])
    }

    const properties = {
        border: '1px solid red',
        color: 'red'
    }

    return (
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Todo List</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex mt-4">
                            <input name="todoinput" className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" required/>
                            <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal">Add</button>
                            </div>
                        </form>
                </div>
                <div>
                    {todo.map(({ itemName, checked }, index) => {
                        return (
                            <div className="flex mb-4 items-center" key={index}>
                                <label className="select-none container block relative cursor-pointer text-xl pl-8">
                                    <div className="flex mb-4 items-center">
                                    <input className="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox"
                                           checked={checked} onChange={handleChecked} />
                                            {!checked && <p className="ml-4 w-full text-grey-darkest">{itemName}</p>}
                                            {checked && <p className="ml-4 w-full line-through text-grey-darkest">{itemName}</p>}
                                        <span className="h-6 w-6 checkmark absolute top-3 left-0 bg-gray-400"/>
                                        <button style={properties} className="custom-button flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => removeItem(index)}>Remove</button>
                                    </div>
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Todo

