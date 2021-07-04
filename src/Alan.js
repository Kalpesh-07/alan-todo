import {useCallback, useContext, useEffect, useState} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { TodoContext } from "./GlobalContext";

const COMMANDS = {
    ADD_TODO: "add-todo",
    REMOVE_TODO: 'remove-todo', 
    CHECK_TODO: 'check-todo',
    UNCHECK_TODO: 'uncheck-todo',
}

function Alan() {
    const [alanInstance, setAlanInstance] = useState()

    const { todo, setTodo } = useContext(TodoContext);

    const addTodo = useCallback(({ detail }) => {
        setTodo([ ...todo, detail ])
    }, [ todo, setTodo ])

    const removeTodo = useCallback(({ detail }) => {
        const item = todo.find(t => t.itemName === detail.itemName)
        if(item === undefined) {
            alanInstance.playText(`Sorry, item ${detail.itemName} does not exists in the list `)
            return
        }
        setTodo([ ...todo.filter(todo => todo.itemName !== detail.itemName) ])
    }, [ todo, setTodo, alanInstance ])

    const checkTodo = useCallback(({ detail }) => {
        const item = todo.find(t => t.itemName === detail.itemName)
        if(item === undefined) {
            alanInstance.playText(`Sorry, item ${detail.itemName} does not exists in the list `)
            return
        }
        item.checked = true
        setTodo([ ...todo ])
    }, [ todo, setTodo, alanInstance ])

    const uncheckTodo = useCallback(({ detail }) => {
        const item = todo.find(t => t.itemName === detail.itemName)
        if(item === undefined) {
            alanInstance.playText(`Sorry, item ${detail.itemName} does not exists in the list `)
            return
        }
        item.checked = false
        setTodo([ ...todo ])
    }, [ todo, setTodo, alanInstance ])

    useEffect(() => {
        window.addEventListener(COMMANDS.ADD_TODO, addTodo)
        window.addEventListener(COMMANDS.REMOVE_TODO, removeTodo)
        window.addEventListener(COMMANDS.CHECK_TODO, checkTodo)
        window.addEventListener(COMMANDS.UNCHECK_TODO, uncheckTodo)
        return () => {
            window.removeEventListener(COMMANDS.ADD_TODO, addTodo)
            window.removeEventListener(COMMANDS.REMOVE_TODO, removeTodo)
            window.removeEventListener(COMMANDS.CHECK_TODO, checkTodo)
            window.removeEventListener(COMMANDS.UNCHECK_TODO, uncheckTodo)
        }
    }, [addTodo, removeTodo, checkTodo, uncheckTodo])

    useEffect(() => {
        if (alanInstance != null) return

        setAlanInstance(
            alanBtn({
                top: "15px",
                left: "15px",
                key: 'bf85606732ccf341ad522b16740b98862e956eca572e1d8b807a3e2338fdd0dc/stage',
                onCommand: ({ command, itemName }) => {
                    window.dispatchEvent(new CustomEvent(command, { detail: { itemName, checked: false } }))
                }
            })
        )
    }, [])
    return null
}

export default Alan