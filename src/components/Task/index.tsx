import * as React from "react"
import { TaskModel } from "../../models/TaskModel"

interface TaskProps {
  task: TaskModel
}

export const Task = ({ task }: TaskProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    task.completed = event.target.checked
    task.save()
  }

  const id = `task-${task.id}`

  return (
    <>
      <input
        id={id}
        type="checkbox"
        defaultChecked={task.completed}
        onChange={onChange}
      />
      <label htmlFor={id}>{task.name}</label>
    </>
  )
}
