import { SessionTokenDataAccess } from '../../../app/server_app/data/SessionTokenDataAccess'

const insertMock = jest.fn()
const getByMock = jest.fn()
const updateMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateMock,
      }
    }),
  }
})

describe('SessionTokenDataAccess test suite', () => {
  let sut: SessionTokenDataAccess

  const someAccount = {
    id: '1234',
    userName: 'test',
    password: 'test',
  }

  const someToken = {
    id: '45678',
    userName: 'test',
    valid: true,
    expirationDate: new Date(Date.now() + 60 * 60 * 1000),
  }

  const someTokenId = '45678'

  beforeEach(() => {
    sut = new SessionTokenDataAccess()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert a session token and return the id', async () => {
    insertMock.mockResolvedValueOnce(someTokenId)

    const actual = await sut.generateToken(someAccount)

    expect(actual).toBe(someTokenId)
  })

  it('should invalidate a token', async () => {
    await sut.invalidateToken(someTokenId)

    expect(updateMock).toHaveBeenCalledWith(someTokenId, 'valid', false)
  })

  it('should return true if a token is valid', async () => {
    getByMock.mockResolvedValueOnce(someToken)

    const actual = await sut.isValidToken(someTokenId)

    expect(actual).toBe(true)
    expect(getByMock).toHaveBeenCalledWith('id', someTokenId)
  })

  it('should return false if a token is invalid', async () => {
    getByMock.mockResolvedValueOnce({
      ...someToken,
      valid: false,
    })

    const actual = await sut.isValidToken(someTokenId)

    expect(actual).toBe(false)
  })
})
