import * as React from "react"
import { useForm } from "react-hook-form"
import { Task } from "../../components/Task"
import { useFirebase } from "../../containers/Firebase"
import { TaskModel, TaskModelProps } from "../../models/Task"

export const Dashboard = () => {
  const app = useFirebase()
  const [tasks, setTasks] = React.useState<TaskModel[]>([])
  const { handleSubmit, register } = useForm()

  const uid = app.auth().currentUser.uid

  React.useEffect(
    () =>
      TaskModel.collection(app.firestore())
        .where("uid", "==", uid)
        .onSnapshot((snapshot) =>
          setTasks([...tasks, ...snapshot.docs.map((doc) => doc.data())])
        ),
    []
  )

  const onSubmit = (data: TaskModelProps) =>
    new TaskModel(app.firestore(), {
      uid,
      ...data,
    }).save()

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {tasks.map((task) => (
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
