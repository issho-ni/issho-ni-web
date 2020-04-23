export default {
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({ id: "id", set: jest.fn() })),
      withConverter: jest.fn().mockReturnThis(),
    })),
  })),
}
