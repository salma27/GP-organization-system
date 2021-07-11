import { React } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function AskToJoinMyTeam(props) {
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="joinRequest">
                        <Form.Group>
                            <label>
                                Which project do you want to be supervised?
                            </label>
                            <Form.Control
                                as="select"
                                custom
                                className="border border-info"
                            >
                                {props.projects.map((t, i) => (
                                    <option value={i} key={i}>
                                        {t}
                                    </option>
                                ))}
                                {!props.projects.length && (
                                    <option value="none">None</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        form="joinRequest"
                        className="w-100"
                        size="sm"
                        type="submit"
                        style={{
                            backgroundColor: "#00BFA6",
                            color: "white",
                        }}
                        disabled={!props.projects.length ? true : false}
                    >
                        Send Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AskToJoinMyTeam;
