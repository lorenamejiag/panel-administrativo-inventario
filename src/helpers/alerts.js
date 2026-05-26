import Swal from "sweetalert2";

export function redirectAlert(title, message, url, icon) {
    let timerInterval;
    Swal.fire({
        title,
        html: message + "<b></b>",
        timer: 2000,
        timerProgressBar: true,
        icon,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            window.location.href = url
        }
    })
}
export function generalAlert() {

}