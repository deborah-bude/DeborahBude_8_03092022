/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the file is in .png or .jpg format and the form can be send", () => {
      const bill = NewBillUI(document)
      document.body.innerHTML = bill
      const filePNG = {
        name: "file.png",
        size: 483938,
        type: "image/png",
      };
      document.querySelector(`input[data-testid="file"]`).files[0] = filePNG;
      bill.handleChangeFile()
      expect(bill.formIsValid).toBe(true)
    })
    
    test("Then the file isn't in .png or .jpg format and the form can't be send", () => {
      const bill = NewBillUI()
      document.body.innerHTML = bill
      //to-do write assertion
      const filePDF = {
        name: "file.pdf",
        size: 483938,
        type: "document/pdf",
      };
      document.querySelector(`input[data-testid="file"]`).files[0] = filePDF;
      bill.handleChangeFile()
      expect(bill.formIsValid).toBe(false)
    })
  })
})
