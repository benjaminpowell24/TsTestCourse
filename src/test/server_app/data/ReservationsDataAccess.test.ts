import { DataBase } from '../../../app/server_app/data/DataBase'
import { ReservationsDataAccess } from '../../../app/server_app/data/ReservationsDataAccess'

const insertMock = jest.fn()
const getByMock = jest.fn()
const updateMock = jest.fn()
const deleteMock = jest.fn()
const getAllElementsMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateMock,
        delete: deleteMock,
        getAllElements: getAllElementsMock,
      }
    }),
  }
})

describe('ReservationsDataAccess test suite', () => {
  let sut: ReservationsDataAccess

  const someReservation = {
    id: '1234',
    room: 'test',
    user: 'test',
    startDate: '2021-01-01',
    endDate: '2021-01-02',
  }

  beforeEach(() => {
    sut = new ReservationsDataAccess()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a reservation and return the id', async () => {
    insertMock.mockResolvedValueOnce(someReservation.id)

    const actual = await sut.createReservation(someReservation)

    expect(actual).toBe(someReservation.id)
    expect(insertMock).toHaveBeenCalledWith(someReservation)
  })

  it('should update a reservation', async () => {
    await sut.updateReservation(someReservation.id, 'room', 'newRoom')

    expect(updateMock).toHaveBeenCalledWith(
      someReservation.id,
      'room',
      'newRoom'
    )
  })

  it('should delete a reservation', async () => {
    await sut.deleteReservation(someReservation.id)

    expect(deleteMock).toHaveBeenCalledWith(someReservation.id)
  })
})
