import { UserCredentialsDataAccess } from '../../../app/server_app/data/UserCredentialsDataAccess'

//Mocking the DataBase class to have control over class methods
const insertMock = jest.fn()
const getByMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      }
    }),
  }
})

describe('UserCredentialsDataAccess test suite', () => {
  let sut: UserCredentialsDataAccess
  //dummy data
  const someAccount = {
    id: '',
    userName: 'test',
    password: 'test',
  }

  const someId = '1234'

  beforeEach(() => {
    //create instance of UserCredentialsDataAccess
    sut = new UserCredentialsDataAccess()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dd a user and return the id', async () => {
    insertMock.mockResolvedValueOnce(someId)

    const actual = await sut.addUser(someAccount)

    expect(actual).toBe(someId)
    expect(insertMock).toHaveBeenCalledWith(someAccount)
  })

  it('should get user by id', async () => {
    getByMock.mockResolvedValueOnce(someAccount)

    const actual = await sut.getUserById(someId)

    expect(actual).toEqual(someAccount)
    expect(getByMock).toHaveBeenCalledWith('id', someId)
  })

  it('should get user by name', async () => {
    getByMock.mockResolvedValueOnce(someAccount)

    const actual = await sut.getUserByUserName(someAccount.userName)

    expect(actual).toEqual(someAccount)
    expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName)
  })
})
