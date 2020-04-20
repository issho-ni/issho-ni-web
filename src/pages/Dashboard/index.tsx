import * as React from "react"
import { useForm } from "react-hook-form"
import { Task } from "../../components/Task"
import { useFirebase } from "../../containers/Firebase"
import { TaskModel, TaskModelProps } from "../../models/Task"

export const Dashboard = () => {
  const app = useFirebase()
  const [showCompleted, setShowCompleted] = React.useState(false)
  const [tasks, setTasks] = React.useState<TaskModel[]>([])
  const { handleSubmit, register, reset } = useForm()

  const uid = app.auth().currentUser.uid

  React.useEffect(
    () =>
      TaskModel.collection(app.firestore())
        .where("uid", "==", uid)
        .orderBy("completedAt")
        .orderBy("createdAt")
        .onSnapshot((snapshot) =>
          setTasks(snapshot.docs.map((doc) => doc.data()))
        ),
    []
  )

  const onSubmit = (data: TaskModelProps) => {
    reset()
    new TaskModel(app.firestore(), {
      uid,
      ...data,
    })
      .save()
      .catch(() => reset(data))
  }

  return (
    <>
      <h1>Dashboard</h1>
      <input
        type="checkbox"
        id="showCompleted"
        defaultChecked={showCompleted}
        onChange={(e) => setShowCompleted(e.target.checked)}
      />
      <label htmlFor="showCompleted">Show completed</label>
      <ul>
        {tasks
          .filter((task) => showCompleted || !task.completedAt)
          .map((task) => (
            <li key={task.id}>
              <Task {...{ task }} />
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="name" ref={register({ required: true })} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}
