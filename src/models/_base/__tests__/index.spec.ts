import { QueryDocumentSnapshot } from "@google-cloud/firestore"
import firebase, { firestore } from "firebase"
import {
  Collection,
  Model,
  modelCollection,
  modelConverter,
  ModelProps,
} from ".."

jest.mock("@google-cloud/firestore")

interface TestModelProps extends ModelProps {
  name: string
}

class TestModel extends Model<TestModelProps, TestModel>
  implements TestModelProps {
  static collectionName = "test"
  static collection: Collection<TestModel> = modelCollection<
    TestModelProps,
    TestModel
  >(TestModel)

  public name: string

  constructor(db: firestore.Firestore, props: Partial<TestModelProps>) {
    super(TestModel, db, props as TestModelProps)
  }
}

describe("Model", () => {
  describe("constructor", () => {
    it("creates property accessors", () => {
      const test = new TestModel(firebase.firestore(), { name: "some name" })
      expect(test.name).toBe("some name")

      test.name = "a different name"
      expect(test.data["name"]).toBe("a different name")
    })

    it("uses the id field value passed", () => {
      const test = new TestModel(firebase.firestore(), {
        id: "1234",
        name: "some name",
      })
      expect(test.id).toBe("1234")
    })
  })

  describe("save", () => {
    it("passes the document properties to set()", () => {
      const db = firebase.firestore()
      const collection = db.collection("test")
      const doc = collection.doc("id")

      doc.set = jest.fn()
      collection.doc = jest.fn().mockReturnValue(doc)
      db.collection = jest.fn().mockReturnValue(collection)

      const test = new TestModel(db, { name: "some name" })
      test.save()

      expect(doc.set).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        id: "id",
        name: "some name",
        updatedAt: expect.any(Date),
      })
    })
  })
})

describe("modelConverter", () => {
  const converter = modelConverter<TestModelProps, TestModel>(
    firebase.firestore(),
    TestModel
  )

  describe("toFirestore", () => {
    it("returns the data from an instance", () => {
      const test = new TestModel(firebase.firestore(), { name: "some name" })

      expect(converter.toFirestore(test)).toEqual({
        id: "id",
        name: "some name",
      })
    })
  })

  describe("fromFirestore", () => {
    const now = new Date()
    const snapshot = Object.create(QueryDocumentSnapshot.prototype)

    snapshot.data = jest.fn(() => ({
      createdAt: now,
      id: "1234",
      name: "some name",
      updatedAt: now,
    }))

    const test = converter.fromFirestore(snapshot, {})

    expect(test).toBeInstanceOf(TestModel)
    expect(test.createdAt).toEqual(now)
    expect(test.id).toBe("1234")
    expect(test.name).toBe("some name")
    expect(test.updatedAt).toEqual(now)
  })
})
