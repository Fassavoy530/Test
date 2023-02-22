import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./styles.css";

function InstructionBox() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div >
      <Button variant="secondary" onClick={handleShow} >
        Need instructions?
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>Welcome! In this webpage, there are mainly three views: a Symmetric Bar Chart, a Heatmap and a Pie Chart. <br></br>
            1. <b>Please check the bar chart for COVID Case Fatality Rate and Obesity Rate</b><br></br>
            2. <b>Please check the heatmap to see the protein intake structure of each country</b><br></br>
            3. <b>You can select certain continent</b> <br></br>
            4. <b>You can sort the charts based on Obesity Rate/ Case Fality Rate in a descending order</b><br></br>
            5. <b>Scroll down to see discover some insight!</b> <br></br>
            6. <b>Play around to the webpage to know more information!</b></p>

         <p>**Plese Notes: <br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Case Fatality Rate: the number of deaths divided by the number of confirmed cases<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Percentage in the protein intake does not mean the absolute percentage of all the protein sources.<br></br>
            **Detailed protein intake categories can be found in <a href='https://gist.github.com/Fassavoy530/ff27b64812f64daa3a65f709491f09eb'>this link</a><br></br>
            </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export {InstructionBox}