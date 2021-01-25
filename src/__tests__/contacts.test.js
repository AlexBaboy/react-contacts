import React from "react";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react"
import {Contacts} from "../pages/Contacts"
import {rest} from "msw"
import {setupServer} from "msw/node"

const users = [
    {"gender":"female","name":{"title":"Miss","first":"Josefina","last":"Ortiz"},"location":{"street":{"number":173,"name":"Calle del Barquillo"},"city":"Móstoles","state":"País Vasco","country":"Spain","postcode":78690,"coordinates":{"latitude":"-18.1278","longitude":"31.1576"},"timezone":{"offset":"+8:00","description":"Beijing, Perth, Singapore, Hong Kong"}},"email":"josefina.ortiz@example.com","login":{"uuid":"7a1d0c9e-cf67-4459-8478-6244bd4b8e6a","username":"orangegorilla232","password":"james","salt":"7ACruKap","md5":"bee03a09b267079ccffd1198957cc8a9","sha1":"bdb6ddb68f2ff54e4a58263386db34ebfa8aebc3","sha256":"87bbfff79a7abec5c17c1a7c5716f6d815a762bb62974ecb57b41d138de9e920"},"dob":{"date":"1959-01-27T15:04:55.306Z","age":62},"registered":{"date":"2006-09-22T05:44:34.538Z","age":15},"phone":"982-658-461","cell":"643-343-651","id":{"name":"DNI","value":"33053304-S"},"picture":{"large":"https://randomuser.me/api/portraits/women/69.jpg","medium":"https://randomuser.me/api/portraits/med/women/69.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/69.jpg"},"nat":"ES"},{"gender":"female","name":{"title":"Ms","first":"Gwendolyne","last":"Verouden"},"location":{"street":{"number":9159,"name":"Berliozrode"},"city":"Ommel","state":"Overijssel","country":"Netherlands","postcode":59618,"coordinates":{"latitude":"-57.2029","longitude":"-28.3871"},"timezone":{"offset":"-2:00","description":"Mid-Atlantic"}},"email":"gwendolyne.verouden@example.com","login":{"uuid":"45759826-5095-4506-bbc5-ef6e2ab8bef4","username":"ticklishelephant455","password":"starwars","salt":"T67rZCXq","md5":"b07a47732d328306af21a0ce0c1d49ff","sha1":"3b3035f3c4b246bbaa851d209c746419a056079f","sha256":"ce00689c3e954ded24c8ed1dfc3b8799715a0973d37d08d2e35b861d819e3c96"},"dob":{"date":"1996-03-27T08:50:45.820Z","age":25},"registered":{"date":"2008-02-23T11:14:23.004Z","age":13},"phone":"(632)-200-6292","cell":"(316)-307-8979","id":{"name":"BSN","value":"22633717"},"picture":{"large":"https://randomuser.me/api/portraits/women/36.jpg","medium":"https://randomuser.me/api/portraits/med/women/36.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/36.jpg"},"nat":"NL"}
]

const handlers = [
    rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                results: users
            })
        )
    })
]

const server = setupServer(...handlers)

beforeAll( ()=> server.listen())
afterEach( ()=> server.resetHandlers())
afterAll( ()=> server.close())

describe(`get data`, () => {

    test(`loading`, () => {
        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        expect(loader).toBeInTheDocument()
    })


    test(`success`, async() => {
        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        await waitForElementToBeRemoved(loader)

        expect(loader).not.toBeInTheDocument()
        expect(screen.getByTestId("table-container")).toBeInTheDocument()
    })
})