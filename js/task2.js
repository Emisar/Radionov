window.onload = () => {
    var inputs = document.getElementsByClassName("task_2-input_box");
    var button = document.getElementById("submit_input_fields");
    var inputBlock = document.getElementsByClassName("task_2-input_wraper")[0];
    var matrixBlock = document.getElementsByClassName("task_2-input_matrix")[0];

    button.onclick = () => {
        var n = inputs[0].value;
        var m = inputs[1].value;

        console.log(n, m);

        if (!inputBlock.classList.contains("hide")) {
            inputBlock.classList.add("hide");
        }
        if (!matrixBlock.classList.contains("hide")) {
            matrixBlock.classList.remove("hide");
        }
    }
}