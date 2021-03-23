import bootbox from "bootbox";

const confirmAction = ({
    title = "Confirm action",
    message = "?",
    onConfirm = () => {},
    onCancel = () => {},
    size = "",
}) => {
    bootbox.confirm({
        title: title,
        // size: size,
        message: message,
        callback: (userAccepted) => {
            if (userAccepted) {
                onConfirm();
                // bootbox.dialog({
                //     message:
                //         '<p class="text-center mb-0"> Please wait while we do something...</p>',
                //     closeButton: false,
                // });
            } else {
                onCancel();
                // bootbox.alert({
                //     title: "Title of alert",
                //     size: "small",
                //     message: "Alert body",
                //     callback: () => {
                //         console.log("Second alert ok");
                //     },
                // });
            }
        },
    });
};
export default confirmAction;
