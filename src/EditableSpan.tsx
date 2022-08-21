import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditeMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/>
            : <span onDoubleClick={activateEditeMode}>{props.title} </span>
    )
}