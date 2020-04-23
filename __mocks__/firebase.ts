const firebase = {
  firestore: jest.fn(() => ({
    collection: jest.fn(() => {
      const collection = {
        doc: jest.fn(() => ({ id: "id", set: jest.fn() })),
        withConverter: jest.fn(() => collection),
      }

      return collection
    }),
  })),
}

export default firebase
