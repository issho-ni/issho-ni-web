import { firestore } from "firebase"

type BaseModel<P extends ModelProps> = Model<P, BaseModel<P>> & P

export type Collection<T extends BaseModel<ModelProps>> = (
  db: firestore.Firestore
) => firestore.CollectionReference<T>

interface ModelClass<P extends ModelProps, T extends BaseModel<P>> {
  collection: Collection<T>
  collectionName: string
  new (db: firestore.Firestore, props: P): T
}

export interface ModelProps {
  id: string
  updatedAt: Date
  createdAt: Date
}

export abstract class Model<P extends ModelProps, T extends BaseModel<P>>
  implements ModelProps {
  public readonly id: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(
    private readonly klass: ModelClass<P, T>,
    protected readonly db: firestore.Firestore,
    private readonly _data: P
  ) {
    _data.id || (_data.id = this.collection.doc().id)

    Object.keys(this._data).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this._data[key],
        set: (value: any) => (this._data[key] = value),
      })
    )
  }

  get collection() {
    return this.klass.collection(this.db)
  }

  get data() {
    return this._data
  }

  save() {
    const now = new Date()
    return this.rawCollection()
      .doc(this.id)
      .set({ createdAt: now, ...this.data, updatedAt: now })
  }

  private rawCollection() {
    return this.db.collection(this.klass.collectionName)
  }
}

export const modelConverter = <P extends ModelProps, T extends BaseModel<P>>(
  db: firestore.Firestore,
  t: ModelClass<P, T>
): firestore.FirestoreDataConverter<T> => ({
  toFirestore: (m: T) => m.data,
  fromFirestore: (snapshot, options) => new t(db, snapshot.data(options) as P),
})

export const modelCollection = <P extends ModelProps, T extends BaseModel<P>>(
  t: ModelClass<P, T>
): Collection<T> => (db: firestore.Firestore) =>
  db.collection(t.collectionName).withConverter(modelConverter<P, T>(db, t))
