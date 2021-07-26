import { React, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { AskToBeMySupervisor, getAllMyProjects_Student, 
        doctorRequestToBeSuberVisorProject, TARequestToBeSuberVisor, 
        staffGetTeamProjects, staffgetProfile,
        askTeamToAskTaToSupervise } from "requests";
import { useRequest, useAuthContext } from "hooks";

function AskToJoinMyTeam(props) {
    const {isStaff} = useAuthContext();
    const [selectedProject, setSelectedProject] = useState();
    const [allMyProjects, setAllMyProjects] = useState([]);
    const [doctorRequest,doctorRequesting] = useRequest(doctorRequestToBeSuberVisorProject);
    const [taRequest,taRequestin] = useRequest(TARequestToBeSuberVisor);
    const [requestMyProjects, requestingMyProjects] = useRequest(getAllMyProjects_Student);
    const [teamProjectsRequest,loading] = useRequest(staffGetTeamProjects);
    const [requestStaffProfile,profileLoding] = useRequest(staffgetProfile);
    const [requestAskTeamToAskTaToSupervise,askTeamToAskTaToSuperviseLoading]=useRequest(askTeamToAskTaToSupervise);

    const changeHandler = (e) => {
        setSelectedProject(e.target.value);
        // console.log(e.target.value); ///return the index of the project not the project name itself
    };
    const [request, requesting] = useRequest(AskToBeMySupervisor);
    const sendRequest = (e) => {
        e.preventDefault();
        if(isStaff){
            requestStaffProfile({})
                .then(res=>{
                    if(res.data.type===0){
                        doctorRequest({ projectId: selectedProject })
                            .then((r) => {
                                toast.success("Request sent successfully");
                            })
                            .catch((e) => {
                                toast.error(e.response.data.message);
                            });
                    }else{
                        taRequest({ projectId: selectedProject })
                            .then((r) => {
                                toast.success("Request sent successfully");
                            })
                            .catch((e) => {
                                toast.error(e.response.data.message);
                            });
                    }
                })
                .catch((e) => {

                })
        }else{
            if(props.isDr){
                console.log({ supervisorId: props, projectId: selectedProject});
                request({ supervisorId: props.supervisorID, projectId: selectedProject})
                .then((r) => {
                    toast.success("Request sent successfully");
                })
                .catch(({ response }) => {
                    toast.error(response.data.message);
                    toast.error("Error sending request");
                });
            }else{
                requestAskTeamToAskTaToSupervise({ supervisorId: props.supervisorID, projectId: selectedProject})
                .then((r) => {
                    toast.success("Request sent successfully");
                })
                .catch(({ response }) => {
                    toast.error(response.data.message);
                    toast.error("Error sending request");
                });
            }
            
        }
        
    };
    useEffect(() => {
        if(isStaff){
            console.log(props.teamId);
            teamProjectsRequest({teamId:props.teamId})
                .then(r=>{
                    if(r.data.projects.length){
                        console.log(r.data.projects[0].id);
                        setSelectedProject(r.data.projects[0].id)
                    }
                    setAllMyProjects(r.data.projects);
                })
                .catch((e) => {
                    setAllMyProjects([]);
                    toast.error("Failed To Get Team's Projects")
                })
        }else{
            requestMyProjects({})
            .then((r) => {
                if(r.data.length){
                    console.log(r.data[0].id);
                    setSelectedProject(r.data[0].id)
                }
                setAllMyProjects(r.data);
            })
            .catch(({ response }) => {
                setAllMyProjects([]);
                toast.error(response.data.message);
                toast.error("Couldn't load projects");
            });
        }
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
