import { Server } from '../../../app/server_app/server/Server'
import { Authorizer } from '../../../app/server_app/auth/Authorizer'
import { ReservationsDataAccess } from '../../../app/server_app/data/ReservationsDataAccess'
import { RegisterHandler } from '../../../app/server_app/handlers/RegisterHandler'
import { LoginHandler } from '../../../app/server_app/handlers/LoginHandler'
import { ReservationsHandler } from '../../../app/server_app/handlers/ReservationsHandler'
import { HTTP_CODES } from '../../../app/server_app/model/ServerModel'

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

  it('should start server on port 8080 and end the request', async() => {
    await sut.startServer();
    expect(serverMock.listen).toHaveBeenCalledWith(8080)
    expect(responseMock.end).toHaveBeenCalled()
  })

  it('should handle register requests', async() => {
    requestMock.url = 'localhost:8080/register'

    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest')

    await sut.startServer()

    expect(handleRequestSpy).toHaveBeenCalledTimes(1)
    //expect Register Handler to be called with right type of args
    expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer))

  })

  it('should handle login requests', async() => {
    requestMock.url = 'localhost:8080/login'

    const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest')

    await sut.startServer()

    expect(handleRequestSpy).toHaveBeenCalledTimes(1)
    expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer))

  })

  it('should handle reservations requests', async() => {
    requestMock.url = 'localhost:8080/reservation'

    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')

    await sut.startServer()

    expect(handleRequestSpy).toHaveBeenCalledTimes(1)
    expect(ReservationsHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer), expect.any(ReservationsDataAccess))

  })

  it('should handle unknown requests', async() => {
    requestMock.url = 'localhost:8080/unknown'
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken')

    await sut.startServer()

    expect(validateTokenSpy).not.toHaveBeenCalled()
  })

  it('should handle errors', async () => {
    requestMock.url = 'localhost:8080/reservation'

    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')

    handleRequestSpy.mockRejectedValueOnce(new Error('test error'))

    await sut.startServer()

    expect(handleRequestSpy).toHaveBeenCalledTimes(1)
    expect(ReservationsHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer), expect.any(ReservationsDataAccess))

    expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify(`Internal server error: test error`))
  })

  it('should stop the server', async () => {
    serverMock.close.mockImplementationOnce((cb: Function)=>{
            cb();
        })

    await sut.startServer()

    await sut.stopServer()

    expect(serverMock.close).toHaveBeenCalled()
  })
})
