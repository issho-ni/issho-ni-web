import { firestore } from "firebase"
import { Collection, Model, modelCollection, ModelProps } from "../_base"

export interface TaskModelProps extends ModelProps {
  uid: string
  name: string
  dueDate: Date
  completedAt: Date
}

export class TaskModel extends Model<TaskModelProps, TaskModel>
  implements TaskModelProps {
  static collectionName = "tasks"
  static collection: Collection<TaskModel> = modelCollection<
    TaskModelProps,
    TaskModel
  >(TaskModel)

  public readonly uid: string
  public name: string
  public dueDate: Date
  public completedAt: Date

  constructor(db: firestore.Firestore, props: Partial<TaskModelProps>) {
    super(TaskModel, db, {
      dueDate: null,
      completedAt: null,
      ...props,
    } as TaskModelProps)
  }

  get completed() {
    return !!this.completedAt
  }

  set completed(completed: boolean) {
    if (this.completed != completed) {
      this.completedAt = completed ? new Date() : null
    }
  }
}
