import * as React from "react"
import { TaskModel } from "../../models/Task"

interface TaskProps {
  task: TaskModel
}

export const Task = ({ task }: TaskProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    task.completed = event.target.checked
    task.save()
  }

  return (
    <>
      <input
        id={`task-${task.id}`}
        type="checkbox"
        defaultChecked={task.completed}
        onChange={onChange}
      />
      <label htmlFor={`task-${task.id}`}>{task.name}</label>
    </>
  )
}
