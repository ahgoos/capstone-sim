///////////////////////////////////////////
///////////  Drag and Drop  ///////////////
///////////////////////////////////////////

document.addEventListener('DOMContentLoaded', (event) => {
    let offset = [0, 0];
    let isDown = false;
    let cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {

        card.addEventListener('dragstart', function (e) {
            e.dataTransfer.setDragImage(card, -9999, -9999);
            e.target.classList.add('dragging');
            isDown = true;
            card.style.position = "absolute";
            offset = [
                card.offsetLeft - e.clientX,
                card.offsetTop - e.clientY
            ];
            // console.log("start:", offset);

        }, true);
        card.addEventListener('drag', function (e) {
            e.preventDefault();
            if (isDown) {
                card.style.left = (e.clientX + offset[0]) + 'px';
                card.style.top = (e.clientY + offset[1]) + 'px';
            }

        }, true);
        card.addEventListener('dragend', function (e) {
            isDown = false;
            // console.log(offset,
            //     [e.clientX + offset[0], e.clientY + offset[1]],
            //     [e.clientX, e.clientY]);
            card.style.left = (e.clientX + offset[0]) + 'px';
            card.style.top = (e.clientY + offset[1]) + 'px';
            card.classList.remove('dragging');
        }, true);
    });

    // let toggles = document.querySelectorAll('.toggle-card');
    // toggles.forEach(function (toggle) {

    //     toggle.addEventListener('click', toggleCard, true);

    // });
});

// function activate(card, x, y) {
//     let content = card.querySelector('.card-content');
//     content.style.maxHeight = "fit-content";
//     content.dataset.status = "active";
// };

// function toggleCard(e) {
//     let card = e.target.parent;
//     console.log(card);
//     activate(card, e.clientX, e.clientY);
//     if (e.target.dataset.status == "active") tail.dataset.status = "inactive";
// }

var $slider = document.getElementById('slider');
var $toggle = document.getElementById('toggle');

$toggle.addEventListener('click', function () {
    var isOpen = $slider.classList.contains('slide-in');

    $slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
});