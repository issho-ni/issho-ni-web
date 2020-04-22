import firebase from "firebase"
import { TaskModel } from ".."

describe("TaskModel", () => {
  describe("constructor", () => {
    it("sets dueDate and completedAt fields to null when absent", () => {
      const task = new TaskModel(firebase.firestore(), {
        uid: "some_uid",
        name: "some task",
      })

      expect(task.dueDate).toBeNull()
      expect(task.completedAt).toBeNull()
    })

    it("sets dueDate and completedAt from props", () => {
      const now = new Date()
      const task = new TaskModel(firebase.firestore(), {
        uid: "some_uid",
        name: "some name",
        dueDate: now,
        completedAt: now,
      })

      expect(task.dueDate).toEqual(now)
      expect(task.completedAt).toEqual(now)
    })
  })

  describe("completed", () => {
    describe("get", () => {
      it("is false when completedAt is null", () => {
        const task = new TaskModel(firebase.firestore(), {
          uid: "some_uid",
          name: "some name",
        })

        expect(task.completed).toBe(false)
      })

      it("is true when completedAt is not null", () => {
        const task = new TaskModel(firebase.firestore(), {
          uid: "some_uid",
          name: "some name",
          completedAt: new Date(),
        })

        expect(task.completed).toBe(true)
      })
    })

    describe("set", () => {
      it("sets completedAt to the current date when setting to true", () => {
        const task = new TaskModel(firebase.firestore(), {
          uid: "some_uid",
          name: "some name",
        })

        task.completed = true
        expect(task.completedAt).toBeInstanceOf(Date)
      })

      it("sets completedAt to null when setting to false", () => {
        const task = new TaskModel(firebase.firestore(), {
          uid: "some_uid",
          name: "some name",
          completedAt: new Date(),
        })

        task.completed = false
        expect(task.completedAt).toBeNull()
      })

      it("does nothing when setting to true on a completed task", () => {
        const completedAt = new Date("2019-01-01T00:00Z")
        const task = new TaskModel(firebase.firestore(), {
          uid: "some_uid",
          name: "some name",
          completedAt,
        })

        task.completed = true
        expect(task.completedAt).toEqual(completedAt)
      })
    })
  })
})
