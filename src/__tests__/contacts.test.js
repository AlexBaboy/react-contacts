import React from "react";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react"
import {Contacts} from "../pages/Contacts"
import {rest} from "msw"
import {server} from "./server"
import userEvent from "@testing-library/user-event";

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

    test(`fail`, async() => {

        server.use(
            rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({
                        error: "server error!"
                    })
                )
            })
        )

        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        await waitForElementToBeRemoved(loader)

        expect(loader).not.toBeInTheDocument()
        expect(screen.getByTestId("contacts-error")).toBeInTheDocument()
    })
})

describe('data view mode', ()=> {

    test('equal table', async () => {
            render(<Contacts/>)
            const loader = screen.getByTestId("contacts-loader")
            await waitForElementToBeRemoved(loader)

            expect(screen.getByTestId("table-container")).toBeInTheDocument()
            expect(screen.getByTestId("toggle-view-mode-table")).toHaveClass('Mui-selected')
            expect(screen.queryByTestId('grid-container')).not.toBeInTheDocument()
            expect(screen.getByTestId('toggle-view-mode-grid')).not.toHaveClass('Mui-selected')
    })

    test('equal grid', async () => {
        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        await waitForElementToBeRemoved(loader)

        const toggleGrid = screen.getByTestId('toggle-view-mode-grid')
        userEvent.click(toggleGrid)

        expect(screen.getByTestId("grid-container")).toBeInTheDocument()
        expect(screen.getByTestId("toggle-view-mode-grid")).toHaveClass('Mui-selected')
        expect(screen.queryByTestId('table-container')).not.toBeInTheDocument()
        expect(screen.getByTestId('toggle-view-mode-table')).not.toHaveClass('Mui-selected')
        expect(window.localStorage.getItem("dataViewMode")).toEqual("grid")
    })

    test('switch from grid to table', async () => {
        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        await waitForElementToBeRemoved(loader)

        const toggleGrid = screen.getByTestId('toggle-view-mode-grid')
        const toggleTable = screen.getByTestId('toggle-view-mode-table')
        userEvent.click(toggleGrid)
        userEvent.click(toggleTable)

        expect(screen.getByTestId("table-container")).toBeInTheDocument()
        expect(screen.getByTestId("toggle-view-mode-table")).toHaveClass('Mui-selected')
        expect(screen.queryByTestId('grid-container')).not.toBeInTheDocument()
        expect(screen.getByTestId('toggle-view-mode-grid')).not.toHaveClass('Mui-selected')
        expect(window.localStorage.getItem("dataViewMode")).toEqual("table")
    })

    test('equal grid with reload page', async () => {
        window.localStorage.setItem("dataViewMode", "grid")
        render(<Contacts/>)
        const loader = screen.getByTestId("contacts-loader")
        await waitForElementToBeRemoved(loader)

        expect(screen.getByTestId("grid-container")).toBeInTheDocument()
        expect(screen.getByTestId("toggle-view-mode-grid")).toHaveClass('Mui-selected')
        expect(screen.queryByTestId('table-container')).not.toBeInTheDocument()
        expect(screen.getByTestId('toggle-view-mode-table')).not.toHaveClass('Mui-selected')

        window.localStorage.clear()
    })
})