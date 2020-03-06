describe('testing add visitor', () => {
    const axios = require('axios')
    let server
    const {
        addNewVisitor,
        listAllVisitors,
        deleteVisitor,
        deleteVisitors,
        viewVisitor,
        updateVisitor
    } = require('../src/app')


    beforeEach(() => {
        server = require('../src/index')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/addVisitor/")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

})

describe('testing delete visitor', () => {
    const axios = require('axios')
    let server
    const {
        addNewVisitor,
        listAllVisitors,
        deleteVisitor,
        deleteVisitors,
        viewVisitor,
        updateVisitor
    } = require('../src/app')


    beforeEach(() => {
        server = require('../src/index')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/deleteVisitor/50")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty array after deleting visitor', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/deleteVisitor/50")
            expect(route.outputData).toEqual([])
        } catch (err) {
            console.log(err)
        }
        done()
    })


})

describe('testing update visitor', () => {
    const axios = require('axios')
    let server
    const {
        addNewVisitor,
        listAllVisitors,
        deleteVisitor,
        deleteVisitors,
        viewVisitor,
        updateVisitor
    } = require('../src/app')


    beforeEach(() => {
        server = require('../src/index')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/updateVisitor/50")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

})

describe('testing delete all visitor', () => {
    const axios = require('axios')
    let server
    const {
        addNewVisitor,
        listAllVisitors,
        deleteVisitor,
        deleteVisitors,
        viewVisitor,
        updateVisitor
    } = require('../src/app')


    beforeEach(() => {
        server = require('../src/index')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/deleteVisitors")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty array after deleting all visitors', async(done) => {
        try {
            const route = await axios.get("http://127.0.0.1:3000/deleteVisitors")
            expect(route.outputData).toEqual([])
        } catch (err) {
            console.log(err)
        }
        done()
    })


})
