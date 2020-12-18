// const openModalButtons = document.querySelectorAll('[data-modal-target]')
// const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
document.getElementById("add-device").addEventListener('click', () => {
    document.getElementById("add-device-modal").classList.add("active");
    overlay.classList.add("active");
})
document.getElementById("close-add-device").addEventListener('click', ()=>{
    document.getElementById("add-device-modal").classList.remove("active");
    overlay.classList.remove("active");
})
document.getElementById("remove-device").addEventListener('click', () => {
    document.getElementById("remove-device-modal").classList.add("active");
    overlay.classList.add("active");
})
document.getElementById("close-remove-device").addEventListener('click', ()=>{
    document.getElementById("remove-device-modal").classList.remove("active");
    overlay.classList.remove("active");
})
document.getElementById("view-device").addEventListener('click', () => {
    document.getElementById("view-device-modal").classList.add("active");
    overlay.classList.add("active");
})
document.getElementById("close-view-device").addEventListener('click', ()=>{
    document.getElementById("view-device-modal").classList.remove("active");
    overlay.classList.remove("active");
})

// console.log("invoked");
// console.log(openModalButtons);
// console.log(closeModalButtons);
// openModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalTarget)
//         console.log(modal);
//         openModal(modal)
//     })
// })

// closeModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = button.closest('.modal')
//         console.log(modal);
//         closeModal(modal)
//     })
// })

// function openModal(modal) {
//     if(modal == null) return
//     modal.classList.add('active')
//     overlay.classList.add('active')
// }

// function closeModal(modal) {
//     if(modal == null) return
//     modal.classList.remove('active')
//     overlay.classList.remove('active')
// }