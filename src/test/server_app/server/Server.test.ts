import { Server } from '../../../app/server_app/server/Server'
import { Authorizer } from '../../../app/server_app/auth/Authorizer'
import { ReservationsDataAccess } from '../../../app/server_app/data/ReservationsDataAccess'
import { RegisterHandler } from '../../../app/server_app/handlers/RegisterHandler'
import { LoginHandler } from '../../../app/server_app/handlers/LoginHandler'
import { ReservationsHandler } from '../../../app/server_app/handlers/ReservationsHandler'

jest.mock('../../../app/server_app/auth/Authorizer')
jest.mock('../../../app/server_app/data/ReservationsDataAccess')
jest.mock('../../../app/server_app/handlers/RegisterHandler')
jest.mock('../../../app/server_app/handlers/LoginHandler')
jest.mock('../../../app/server_app/handlers/ReservationsHandler')

const requestMock = {
  headers: {
    'user-agent': 'test',
  },
  url: 'test',
}

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
}

const serverMock = {
  listen: jest.fn(),
  close: jest.fn()
}

jest.mock('http', () => {
  return {
    createServer: (cb: Function) => {cb(requestMock, responseMock)
      return serverMock
    },
  }
})

describe('Server test suite', () => {
  let sut: Server

  beforeEach(() => {
    sut = new Server()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should start server now', async() => {
    await sut.startServer();
    expect(serverMock.listen).toHaveBeenCalledWith(8080)
    expect(responseMock.end).toHaveBeenCalled()
  })
})
