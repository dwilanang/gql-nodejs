/* eslint-disable */

const db = require('../repository/db/mock')
const { PageRepo } = require('../repository')
const { Message } = require('../utils');

beforeAll(async () => {
    await db.connect()
    await new Promise((done) => done())
})

afterEach(async () => await db.clearDB())

afterAll(async () => {
    await new Promise((done) => done())
})

describe('repository pages when', () => {

    it('add', async () => {

        var res = await PageRepo.add({
            uid: 1,
            identity: 'test',
            name: 'test'
        })

        var pageItem = await PageRepo.findById(res._id)

        expect(pageItem.uid).toEqual(1)
        expect(pageItem.identity).toEqual("test")
        expect(pageItem.name).toEqual("test")
    })

    it('fetch', async () => {

        var res = await PageRepo.add({
            uid: 1,
            identity: 'test',
            name: 'test'
        })

        var pages = await PageRepo.fetch(res.uid)

        expect(pages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    uid: expect.any(Number),
                    identity: expect.any(String),
                    name: expect.any(String)
                })
            ])
        )
    })

    it('find by id', async () => {

        var res = await PageRepo.add({
            uid: 1,
            identity: 'test',
            name: 'test'
        })

        var page = await PageRepo.findById(res._id)
        
        expect(page).toEqual(
            expect.objectContaining({
                uid: expect.any(Number),
                identity: expect.any(String),
                name: expect.any(String)
            })
        )
    })
})

describe('errors throw when', () => {
    
    it('identity repeated', () => {
        expect(async() => {
            await PageRepo.add({
                uid: 1,
                identity: 'test-identity',
                name: 'test-name'
            })
            await PageRepo.add({
                uid: 1,
                identity: 'test-identity',
                name: 'test1'
            })
        }).rejects.toThrow()
    })

    it('name repeated', async() => {

        expect( async () => {
            await PageRepo.add({
                uid: 1,
                identity: 'test-identity',
                name: 'test-name'
            })
            await PageRepo.add({
                uid: 1,
                identity: 'test2',
                name: 'test-name'
            })
        }).rejects.toThrow()

    })

})