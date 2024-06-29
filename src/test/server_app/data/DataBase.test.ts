import { DataBase } from '../../../app/server_app/data/DataBase'
import * as IdGenerator from '../../../app/server_app/data/IdGenerator'

type SomeTypeWithId = {
  id: string
  name: string
  color: string
}

describe('DataBase test suite', () => {
  let sut: DataBase<SomeTypeWithId>

  const fakeId = '1234'

  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>()
    //Spy on function outside object
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return id after insert into DataBase', async () => {
    const actual = await sut.insert({ id: '', name: 'test', color: 'red' })

    expect(actual).toBe(fakeId)
  })

  it('should get items with value from DataBase', async () => {
    const expected = { id: fakeId, name: 'test', color: 'red' }

    await sut.insert(expected)

    const actual = await sut.getBy('name', 'test')

    expect(actual).toEqual(expected)
  })

  it('should find all items by value from DataBase', async () => {
    const expected = [
      { id: fakeId, name: 'test', color: 'red' },
      { id: '4321', name: 'test', color: 'blue' },
    ]

    expected.forEach(async (item) => {
      await sut.insert(item)
    })

    const actual = await sut.findAllBy('name', 'test')

    expect(actual).toEqual(expected)
  })

  it('should update value in DataBase', async () => {
    const expected = { id: fakeId, name: 'newName', color: 'red' }

    await sut.insert({ id: fakeId, name: 'test', color: 'red' })

    await sut.update(fakeId, 'name', 'newName')

    const actual = await sut.getBy('name', 'newName')

    expect(actual).toEqual(expected)
  })

  it('should delete item from DataBase', async () => {
    await sut.insert({ id: fakeId, name: 'test', color: 'red' })

    await sut.delete(fakeId)

    const actual = await sut.getBy('name', 'test')

    expect(actual).toBeUndefined()
  })

  it('should return all elements from DataBase', async () => {
    const expected = [
      { id: fakeId, name: 'test', color: 'red' },
      { id: '4321', name: 'test', color: 'blue' },
    ]

    await sut.insert(expected[0])
    await sut.insert(expected[1])

    const actual = await sut.getAllElements()

    expect(actual).toEqual(expected)
  })
})
