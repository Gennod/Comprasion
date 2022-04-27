import "./hystmodal.min";
import Swiper from "swiper/bundle";


let goodsWrapper = document.querySelector(".comprasion__goods"),
    goodFix = document.querySelectorAll(".comprasion__good-fix"),
    goodDelete = document.querySelectorAll(".comprasion__good-delete"),
    goodCancel = document.querySelector(".hystmodal__btn-good--cancel"),
    modalDelete = document.querySelector(".hystmodal__btn--delete"),
    modalCancel = document.querySelector(".hystmodal__btn--cancel"),
    modalTitle = document.querySelector(".hystmodal__title");

function checkItemsCount() {
    const comprasion = document.querySelector('.comprasion');
    const table = comprasion.querySelector('.table');
    const filter = comprasion.querySelector('.comprasion__filter');
    const differences = comprasion.querySelector('.comprasion__differences');
    const items = comprasion.querySelectorAll('.item');

    switch (items.length) {
        case 0:
            comprasion.classList.add('empty-cart');
            break
        case 1:
            table.style.display = 'none';
            filter.style.display = 'none';
            differences.style.display = 'none';
            addLinkEmptyItem();
    }
}

function addLinkEmptyItem() {
    const emptyItemLink = `
                <article class="swiper-slide item item--empty">
                    <a href="#" class="item__wrapper">
                        <div class="item__decor"></div>
                        <p class="item__text">
                            Добавьте еще товаров для сравнения
                        </p>
                    </a>
                </article>
            `

    const itemsContainer = document.querySelector('.comprasion__items-wrapper');
    itemsContainer.insertAdjacentHTML('beforeend', emptyItemLink);
}

checkItemsCount();

localStorage.clear();

var tableScroll = new Swiper(".table__scroll", {
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    scrollbar: {
        el: ".comprasion__scrollbar",
        draggable: true,
    },
    allowTouchMove: false,
});

var comprasionSlider = new Swiper(".comprasion__items-container", {
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slidesPerView: 'auto',
    scrollbar: {
        el: ".comprasion__scrollbar",
        draggable: true,
    },
    allowTouchMove: false,
});

function blockLastItem() {
    const items = document.querySelectorAll('.item');
    const pinItems = document.querySelectorAll('.item.pin');
    if (items.length === pinItems.length + 1) {
        return true;
    }
    return false;
}

function calculatePositionPinItems(elWrap) {
    const itemsPin = elWrap.querySelectorAll('.pin');
    itemsPin.forEach((el, index) => {
        el.style.left = `${el.offsetWidth * index}px`;
    })
}

function calculatePositionItem(el, elWrap, slider) {
    const pinItem = el.querySelector('.item__btn--pin');

    if (el.classList.contains('pin')) {
        if (pinItem) pinItem.classList.remove('active');
        el.style.zIndex++;
        const itemLocalPos = localStorage.getItem(`${el.getAttribute('data-id')}`);
        el.style.left = `${itemLocalPos}px`;
        elWrap.style.paddingLeft = `${checkCountPinItems() - el.offsetWidth}px`;
        setTimeout(() => {
            el.classList.remove('pin');
            calculatePositionPinItems(elWrap);
            el.style.left = `auto`;
        }, 500)
        return
    }

    if (blockLastItem()) return;

    localStorage.setItem(`${el.getAttribute('data-id')}`, `${el.offsetLeft}`);
    if (pinItem) pinItem.classList.add('active');
    el.style.left = `${el.offsetLeft}px`;
    el.classList.add('pin');
    el.style.zIndex++;
    setTimeout(() => {
        el.style.left = `${checkCountPinItems() - el.offsetWidth}px`;
        elWrap.style.paddingLeft = `${checkCountPinItems()}px`;
        setTimeout(() => {
            slider.update();
        }, 500);
    }, 100);
}

function pinItem(slider, table) {
    event.preventDefault();
    const tableWrap = document.querySelector('.table__scroll-wrap');
    const sliderWrap = document.querySelector('.comprasion__items-wrapper');
    const item = event.target.closest('.item');
    const itemStats = document.querySelector(`.table__stats[data-id="${item.getAttribute('data-id')}"]`);

    calculatePositionItem(item, sliderWrap, slider);
    calculatePositionItem(itemStats, tableWrap, table);
}

function checkCountPinItems() {
    const itemsPin = document.querySelectorAll('.item.pin');
    const result = itemsPin[0].offsetWidth * itemsPin.length;
    return result;
}

const itemsPinBtn = document.querySelectorAll('.item__btn--pin');
if (itemsPinBtn) {
    itemsPinBtn.forEach((el) => {
        el.addEventListener('click', () => pinItem(comprasionSlider, tableScroll))
    })
}


goodDelete.forEach(btn => {
    btn.addEventListener("click", (evt) => {
        let good = evt.currentTarget.parentNode.parentNode.parentNode;

        document.querySelector(".hystmodal__btn-good--delete").addEventListener("click", () => {
            good.remove();
            myModalGood.close();

            if (!document.querySelectorAll(".comprasion__good-fix").length) {
                setTimeout(() => {
                    window.location.href = "/no-goods.html";
                }, 100)
            }
        })
    });
})

console.log(modalCancel);

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
});
const myModalGood = new HystModal({
    linkAttributeName: "data-hystmodal",
});

document.querySelector("[data-hystmodal='#myModal']").addEventListener("click", () => {
    let clientScroll = window.pageYOffset;
})

modalCancel.addEventListener("click", () => {
    myModal.close();
})

goodCancel.addEventListener("click", () => {
    myModalGood.close();
})

modalDelete.addEventListener("click", (e) => {
    goodFix.forEach(good => good.parentNode.parentNode.remove());
    setTimeout(() => {
        window.location.href = "/no-goods.html";
    }, 100)
    myModal.close();
})

function toggleSameStats() {
    const sameStats = document.querySelectorAll('.js-sameStats');
    sameStats.forEach((el) => {
        if (!el.classList.contains('hidden')) {
            el.classList.add('hidden');
            el.style.maxHeight = '0';
            return
        }

        el.style.maxHeight = `${el.scrollHeight}px`;
        el.classList.remove('hidden');
    })
}

const differencesCheckbox = document.querySelector('#differences');
differencesCheckbox.addEventListener('change', toggleSameStats)


