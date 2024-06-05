document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector(".carousel"),
        firstImg = carousel.querySelectorAll("img")[0];
    arrowIcons = document.querySelectorAll(".wrapper i");

    let isDragstart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    let firstImgWidth = firstImg.clientWidth + 14;//Getting first image width and getting 14 margin value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //Getting more scrollable width

    const showHideIcons = () => {
        //Showing and hiding prev/next icon according to carousel scroll left value
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            //If clicked icon is left, reduce width value from carousel scroll left else add to it
            carousel.scrollLeft += icon.id == "left" ? - firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(), 60); //Calling showHideIcons() fof 60ms
        });
    });

    autoSlide = () => {
        //If there is no image left to scroll then return from here
        if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

        positionDiff = Math.abs(positionDiff); //making position value to positive
        let firstImgWidth = firstImg.clientWidth + 14;
        let valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            //If user is scrolling to the right
            return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        //If user is scrolling to the left
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    const dragStart = (e) => {
        isDragstart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragstart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragstart = false;
        carousel.classList.remove("dragging");

        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchend", dragStop);
});