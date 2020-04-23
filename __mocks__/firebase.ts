const firestore = jest.fn().mockReturnValue({
  collection: jest.fn().mockReturnValue({
    doc: jest
      .fn()
      .mockReturnValue({ id: "id", set: jest.fn(), get: jest.fn() }),
    withConverter: jest.fn().mockReturnThis(),
  }),
})

Object.defineProperty(firestore, "FieldValue", {
  value: { serverTimestamp: jest.fn().mockReturnValue(new Date()) },
})

export default {
  firestore,
}
