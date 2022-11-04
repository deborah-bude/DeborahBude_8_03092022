/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes";
import BillsUI from "../views/BillsUI.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import mockStore from "../__mocks__/store";

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the file is in .png or .jpg format", () => {
      // création du dom nécessaire (le formulaire avec l'input file)
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: 'test@test.com'
      }))

      const bill = new NewBill({ document, store: mockStore, onNavigate, localStorage: window.localStorage })
      const filePNG = {
        name: "file.png",
        size: 483938,
        type: "image/png",
      };
      const input = document.querySelector(`input[data-testid="file"]`);

      Object.defineProperty(input, 'files', { get: jest.fn().mockReturnValue([filePNG]) })

      const e = {
        preventDefault: jest.fn(),
        target: {
          value: filePNG.name
        }
      }
      bill.handleChangeFile(e)
      expect(bill.formIsValid).toBe(true)
    })

    test("Then the file isn't in .png or .jpg format", () => {
      // création du dom nécessaire (le formulaire avec l'input file)
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: 'test@test.com'
      }))


      const bill = new NewBill({ document, store: mockStore, onNavigate, localStorage: window.localStorage })
      const filePDF = {
        name: "file.pdf",
        size: 483938,
        type: "document/pdf",
      };
      const input = document.querySelector(`input[data-testid="file"]`);

      Object.defineProperty(input, 'files', { get: jest.fn().mockReturnValue([filePDF]) })

      const e = {
        preventDefault: jest.fn(),
        target: {
          value: filePDF.name
        }
      }
      bill.handleChangeFile(e)
      expect(bill.formIsValid).toBe(false)
    })

    test("The form can be submit", () => {
      // création du dom nécessaire (le formulaire avec l'input file)
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: 'test@test.com'
      }))

      const bill = new NewBill({ document, store: mockStore, onNavigate, localStorage: window.localStorage });
      bill.formIsValid = true;
      bill.fileName = "file.png";
      bill.fileUrl = undefined;
      const e = {
        preventDefault: jest.fn(),
        target: document.querySelector('[data-testid="form-new-bill"]'),
      }
      jest.spyOn(bill, 'updateBill')
      jest.spyOn(bill, 'onNavigate')

      console.log(e.target.querySelector(`input[data-testid="datepicker"]`).value)
      bill.handleSubmit(e);
      expect(bill.updateBill).toHaveBeenCalled();
      expect(bill.onNavigate).toHaveBeenCalled();
    })

    // test("The form can't be submit", () => {
    //   document.body.innerHTML = NewBillUI()

    //   const onNavigate = (pathname) => {
    //     document.body.innerHTML = ROUTES({ pathname })
    //   }

    //   Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    //   window.localStorage.setItem('user', JSON.stringify({
    //     type: 'Employee',
    //     email: 'test@test.com'
    //   }))

    //   const bill = new NewBill({ document, store: mockStore, onNavigate, localStorage: window.localStorage });
    //   const e = {
    //     preventDefault: jest.fn(),
    //   }
    //   bill.handleSubmit(e);
    //   expect(bill.updateBill).not.toHaveBeenCalled();
    //   expect(bill.onNavigate).not.toHaveBeenCalled();
    // })
  })
})
