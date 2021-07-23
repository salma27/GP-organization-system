import { React, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AskToBeMySupervisor, getAllMyProjects_Student } from "requests";
import { useRequest } from "hooks";

function AskToJoinMyTeam(props) {
    const [selectedProject, setSelectedProject] = useState();
    const changeHandler = (e) => {
        setSelectedProject(e.target.value);
        console.log(e.target.value); ///return the index of the project not the project name itself
    };
    const [request, requesting] = useRequest(AskToBeMySupervisor);
    const sendRequest = (e) => {
        e.preventDefault();
        request({ ecomId: props.supervisorID })
            .then((r) => {
                toast.success("Request sent successfully");
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error sending request");
            });
    };
    const [allMyProjects, setAllMyProjects] = useState([]);
    const [requestMyProjects, requestingMyProjects] = useRequest(
        getAllMyProjects_Student
    );
    useEffect(() => {
        requestMyProjects({})
            .then((r) => {
                setAllMyProjects(r.data);
            })
            .catch(({ response }) => {
                setAllMyProjects([]);
                toast.error(response.data.message);
                toast.error("Couldn't load projects");
            });
    }, []);

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
                                onChange={changeHandler}
                            >
                                {allMyProjects &&
                                    allMyProjects.map((t) => (
                                        <option value={t.id} key={t.id}>
                                            {t.title}
                                        </option>
                                    ))}
                                {allMyProjects && !allMyProjects.length && (
                                    <option value="none">None</option>
                                )}
                            </Form.Control>
                            {/*<div
                                class="modal-body"
                                style={{ overflowY: "inherit !important" }}
                            ></div>*/}
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
                        disabled={
                            !allMyProjects || allMyProjects.length == 0
                                ? true
                                : false
                        }
                        onClick={sendRequest}
                    >
                        Send Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AskToJoinMyTeam;
